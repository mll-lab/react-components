import { Maybe } from '@mll-lab/js-utils';

export type GwlFieldRole =
  | 'command'
  | 'plain'
  | 'position'
  | 'tubeID'
  | 'volume';

export type GwlField = {
  role: GwlFieldRole;
  text: string;
};

export type GwlCommandLine = {
  /** 1-based line in the source worklist. */
  lineNumber: number;
  fields: Array<GwlField>;
};

/** `comment` is null only for commands preceding the first comment. */
export type GwlStep = {
  lineNumber: number;
  comment: Maybe<string>;
  commands: Array<GwlCommandLine>;
};

const FIELD_SEPARATOR = ';';

export const COMMAND = {
  ASPIRATE: 'A',
  COMMENT: 'C',
  DISPENSE: 'D',
  REAGENT_DISTRIBUTION: 'R',
} as const;

const COMMENT_PREFIX = `${COMMAND.COMMENT}${FIELD_SEPARATOR}`;

/** All field indexes below mirror the serialization in MLL\Utils\Tecan\BasicCommands. */
const VOLUME_FIELD: Record<string, number> = {
  [COMMAND.ASPIRATE]: 6,
  [COMMAND.DISPENSE]: 6,
  [COMMAND.REAGENT_DISTRIBUTION]: 11,
};

const POSITION_FIELDS: Record<string, Array<number>> = {
  [COMMAND.ASPIRATE]: [4],
  [COMMAND.DISPENSE]: [4],
  // source start and end, then target start and end
  [COMMAND.REAGENT_DISTRIBUTION]: [4, 5, 9, 10],
};

/** A barcode location carries no position, the barcode identifies the tube. */
const TUBE_ID_FIELD: Record<string, number> = {
  [COMMAND.ASPIRATE]: 5,
  [COMMAND.DISPENSE]: 5,
};

const SERIALIZES_INTO_FIELD_COUNT: Record<string, (count: number) => boolean> =
  {
    [COMMAND.ASPIRATE]: (count) => count === 10,
    [COMMAND.DISPENSE]: (count) => count === 10,
    // excluded target wells are appended
    [COMMAND.REAGENT_DISTRIBUTION]: (count) => count >= 16,
  };

function fieldRole({
  commandLetter,
  index,
  fieldCount,
}: {
  commandLetter: string;
  index: number;
  fieldCount: number;
}): GwlFieldRole {
  if (index === 0) {
    return 'command';
  }

  // A line of an unexpected shape gets no highlighting rather than a wrong one.
  const serializesIntoFieldCount = SERIALIZES_INTO_FIELD_COUNT[commandLetter];
  if (serializesIntoFieldCount && !serializesIntoFieldCount(fieldCount)) {
    return 'plain';
  }

  if (index === VOLUME_FIELD[commandLetter]) {
    return 'volume';
  }

  if (index === TUBE_ID_FIELD[commandLetter]) {
    return 'tubeID';
  }

  if (POSITION_FIELDS[commandLetter]?.includes(index)) {
    return 'position';
  }

  return 'plain';
}

function parseCommand(line: string, lineNumber: number): GwlCommandLine {
  const fieldTexts = line.split(FIELD_SEPARATOR);
  const commandLetter = fieldTexts[0] ?? '';

  return {
    lineNumber,
    fields: fieldTexts.map((text, index) => ({
      text,
      role: fieldRole({ commandLetter, index, fieldCount: fieldTexts.length }),
    })),
  };
}

/**
 * A worklist documents itself: each `C;` comment describes what the commands
 * following it do, which makes the comment a step and the commands its detail.
 */
export function parseGwl(gwl: string): Array<GwlStep> {
  const steps: Array<GwlStep> = [];

  // MLL\Utils\Tecan writes CRLF, so a lone \n split would leave \r in the last field.
  gwl.split(/\r?\n/).forEach((line, index) => {
    const lineNumber = index + 1;

    if (line.trim() === '') {
      return;
    }

    if (line.startsWith(COMMENT_PREFIX)) {
      steps.push({
        lineNumber,
        comment: line.slice(COMMENT_PREFIX.length),
        commands: [],
      });

      return;
    }

    const openStep = steps.at(-1);
    const command = parseCommand(line, lineNumber);

    if (openStep) {
      openStep.commands.push(command);
    } else {
      steps.push({ lineNumber, comment: null, commands: [command] });
    }
  });

  return steps;
}
