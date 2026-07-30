import { sumBy } from 'lodash';

import { MasterMixIngredient, ReactionMix } from './types';

export function sumVolume(ingredients: Array<MasterMixIngredient>): number {
  return sumBy(ingredients, (ingredient) => ingredient.volume);
}

/**
 * Volume of a single reaction: the master mix plus everything added per reaction.
 * Concentrations of the ingredients are relative to this volume.
 */
export function reactionVolume(mix: ReactionMix): number {
  return sumVolume([...mix.ingredients, ...(mix.perReactionIngredients ?? [])]);
}
