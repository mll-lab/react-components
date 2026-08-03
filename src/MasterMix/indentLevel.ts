import { MasterMixTableRow } from './types';

/**
 * Every row is indented one step further than the total it is a summand of, so the master
 * mix and the ingredients added per reaction meet on the level of the reaction volume.
 */
export function indentLevel(
  record: MasterMixTableRow,
  withinReactionMix: boolean,
): number {
  switch (record.rowKind) {
    case 'masterMixIngredient':
      return withinReactionMix ? 2 : 1;
    case 'masterMixTotal':
      return withinReactionMix ? 1 : 0;
    case 'perReactionIngredient':
      return 1;
    case 'reactionTotal':
      return 0;
  }
}
