import { MasterMixIngredient, MasterMixProps } from './types';

export function sumVolume(ingredients: Array<MasterMixIngredient>): number {
  return ingredients.reduce(
    (volumeAccumulator, ingredient) => volumeAccumulator + ingredient.volume,
    0,
  );
}

/**
 * Volume of a single reaction: the master mix plus everything added per reaction.
 * Concentrations of the ingredients are relative to this volume.
 */
export function reactionVolume(
  mix: Pick<MasterMixProps, 'ingredients' | 'perReactionIngredients'>,
): number {
  return sumVolume([...mix.ingredients, ...(mix.perReactionIngredients ?? [])]);
}
