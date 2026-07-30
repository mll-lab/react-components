import { MasterMixIngredient, ReactionMix } from './types';

/** Without them, the reaction mix consists of nothing but the master mix. */
export function hasPerReactionIngredients(
  perReactionIngredients: ReactionMix['perReactionIngredients'],
): perReactionIngredients is Array<MasterMixIngredient> {
  return Boolean(perReactionIngredients?.length);
}
