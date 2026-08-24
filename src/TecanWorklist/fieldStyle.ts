import { CSSProperties } from 'react';

import { PALETTE } from '../theme';

import { COMMAND, GwlField, GwlFieldRole } from './parseGwl';

const PIPETTING_COMMAND_COLOR: Record<string, string> = {
  [COMMAND.ASPIRATE]: PALETTE.red,
  [COMMAND.DISPENSE]: PALETTE.gold,
  [COMMAND.REAGENT_DISTRIBUTION]: PALETTE.blue,
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
    color: PIPETTING_COMMAND_COLOR[text] ?? PALETTE.gray7,
  };
}
