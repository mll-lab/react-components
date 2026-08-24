import { CSSProperties } from 'react';

import { PALETTE } from '../theme';

import { GwlField, GwlFieldRole } from './parseGwl';

/** Only pipetting commands get a color, the rest merely keeps the robot going. */
const COMMAND_COLOR: Record<string, string> = {
  A: PALETTE.red, // Aspirate
  D: PALETTE.gold, // Dispense
  R: PALETTE.blue, // ReagentDistribution
};

const FIELD_STYLE: Record<GwlFieldRole, CSSProperties> = {
  command: { fontWeight: 'bold' },
  plain: { color: PALETTE.gray6 },
  position: { color: PALETTE.tableHeaderBackgroundColor, fontWeight: 'bold' },
  tubeID: { color: PALETTE.gray9, fontWeight: 'bold' },
  volume: { color: PALETTE.green, fontWeight: 'bold' },
};

export function fieldStyle({ role, text }: GwlField): CSSProperties {
  if (role !== 'command') {
    return FIELD_STYLE[role];
  }

  return {
    ...FIELD_STYLE.command,
    color: COMMAND_COLOR[text] ?? PALETTE.gray7,
  };
}
