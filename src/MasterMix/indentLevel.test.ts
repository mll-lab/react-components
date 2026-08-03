import { indentLevel } from './indentLevel';
import { MasterMixTableRow } from './types';

const MASTER_MIX_INGREDIENT_ROW: MasterMixTableRow = {
  key: 'masterMixIngredient-1',
  title: 'Water',
  volume: 13,
  rowKind: 'masterMixIngredient',
};
const MASTER_MIX_TOTAL_ROW: MasterMixTableRow = {
  key: 'masterMixTotal',
  title: 'MasterMix',
  volume: 13,
  rowKind: 'masterMixTotal',
};
const PER_REACTION_INGREDIENT_ROW: MasterMixTableRow = {
  key: 'perReactionIngredient-1',
  title: 'cDNA',
  volume: 5,
  rowKind: 'perReactionIngredient',
};
const REACTION_TOTAL_ROW: MasterMixTableRow = {
  key: 'reactionTotal',
  title: 'Reaktionsvolumen',
  volume: 18,
  rowKind: 'reactionTotal',
};

describe('indentLevel', () => {
  it('indents the ingredients one step below the total they sum up to', () => {
    expect(indentLevel(MASTER_MIX_INGREDIENT_ROW, false)).toBe(1);
    expect(indentLevel(MASTER_MIX_TOTAL_ROW, false)).toBe(0);
  });

  it('sinks the master mix one step deeper within a reaction mix', () => {
    expect(indentLevel(MASTER_MIX_INGREDIENT_ROW, true)).toBe(2);
    expect(indentLevel(MASTER_MIX_TOTAL_ROW, true)).toBe(1);
  });

  it('meets the master mix and the per reaction ingredients on one level', () => {
    expect(indentLevel(MASTER_MIX_TOTAL_ROW, true)).toBe(1);
    expect(indentLevel(PER_REACTION_INGREDIENT_ROW, true)).toBe(1);
  });

  it('leaves the reaction volume flush with the table', () => {
    expect(indentLevel(REACTION_TOTAL_ROW, true)).toBe(0);
  });
});
