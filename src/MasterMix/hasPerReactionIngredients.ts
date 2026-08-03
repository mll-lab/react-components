import { MasterMixIngredient, ReactionMix } from './types';

export function hasPerReactionIngredients(
  perReactionIngredients: ReactionMix['perReactionIngredients'],
): perReactionIngredients is Array<MasterMixIngredient> {
  return Boolean(perReactionIngredients?.length);
}
