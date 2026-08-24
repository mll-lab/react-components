import { Maybe } from '@mll-lab/js-utils';

/** Roles a command field can play, each highlighted differently. */
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
  /** 1-based line in the source worklist, so the gutter stays truthful. */
  lineNumber: number;
  fields: Array<GwlField>;
};

/**
 * A comment and the commands following it.
 * `comment` is null only for commands preceding the first comment.
 */
export type GwlStep = {
  lineNumber: number;
  comment: Maybe<string>;
  commands: Array<GwlCommandLine>;
};

const FIELD_SEPARATOR = ';';

const COMMENT_PREFIX = `C${FIELD_SEPARATOR}`;

/**
 * Field index of the pipetted volume per command letter.
 * Mirrors the serialization in MLL\Utils\Tecan\BasicCommands.
 */
const VOLUME_FIELD: Record<string, number> = {
  A: 6, // Aspirate
  D: 6, // Dispense
  R: 11, // ReagentDistribution
};

/** Field indexes holding a rack position per command letter. */
const POSITION_FIELDS: Record<string, Array<number>> = {
  A: [4],
  D: [4],
  R: [4, 5, 9, 10], // source start and end, then target start and end
};

/**
 * Field index of the tube barcode per command letter.
 * A barcode location carries no position, so this is the only
 * identification of the tube being pipetted from or into.
 */
const TUBE_ID_FIELD: Record<string, number> = {
  A: 5,
  D: 5,
};

/**
 * Fields a command letter serializes into, so a line of an unexpected shape
 * gets no highlighting rather than highlighting the wrong values.
 */
const HAS_EXPECTED_FIELD_COUNT: Record<string, (count: number) => boolean> = {
  A: (count) => count === 10,
  D: (count) => count === 10,
  R: (count) => count >= 16, // excluded target wells are appended
};

function fieldRole(
  commandLetter: string,
  index: number,
  fieldCount: number,
): GwlFieldRole {
  if (index === 0) {
    return 'command';
  }

  const hasExpectedFieldCount = HAS_EXPECTED_FIELD_COUNT[commandLetter];
  if (hasExpectedFieldCount && !hasExpectedFieldCount(fieldCount)) {
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
  const texts = line.split(FIELD_SEPARATOR);
  const commandLetter = texts[0] ?? '';

  return {
    lineNumber,
    fields: texts.map((text, index) => ({
      text,
      role: fieldRole(commandLetter, index, texts.length),
    })),
  };
}

/**
 * Groups a Gemini worklist into the steps it documents.
 *
 * A worklist documents itself: each `C;` comment describes what the commands
 * following it do, so the comment reads as the step and the commands as its detail.
 * Blank lines are dropped, the retained line numbers still show where they were.
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
