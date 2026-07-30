import { reactionVolume, sumVolume } from './reactionVolume';
import { MasterMixTableRow, ReactionMix } from './types';

// Non-numeric strings, guaranteed to be unique since ingredient keys must be of type number.
const MASTER_MIX_SECTION_KEY = 'masterMixSection';
const MASTER_MIX_TOTAL_KEY = 'masterMixTotal';
const REACTION_TOTAL_KEY = 'reactionTotal';

export const MASTER_MIX_LABEL = 'MasterMix';

/**
 * Lists what to pipette, from the inside out: the ingredients of the master mix,
 * their total as the amount that goes into each reaction, and what is added per reaction.
 */
export function mixRows({
  ingredients,
  perReactionIngredients,
}: ReactionMix): Array<MasterMixTableRow> {
  const masterMixTotal: MasterMixTableRow = {
    key: MASTER_MIX_TOTAL_KEY,
    title: 'Gesamtvolumen',
    volume: sumVolume(ingredients),
    rowKind: 'masterMixTotal',
  };
  const masterMixIngredients: Array<MasterMixTableRow> = ingredients.map(
    (ingredient) => ({
      ...ingredient,
      key: ingredient.key.toString(),
      rowKind: 'masterMixIngredient',
    }),
  );

  if (!perReactionIngredients?.length) {
    return [...masterMixIngredients, masterMixTotal];
  }

  return [
    {
      key: MASTER_MIX_SECTION_KEY,
      title: MASTER_MIX_LABEL,
      rowKind: 'masterMixSection',
    },
    ...masterMixIngredients,
    masterMixTotal,
    ...perReactionIngredients.map(
      (ingredient): MasterMixTableRow => ({
        ...ingredient,
        key: ingredient.key.toString(),
        rowKind: 'perReactionIngredient',
      }),
    ),
    {
      key: REACTION_TOTAL_KEY,
      title: 'Reaktionsvolumen',
      volume: reactionVolume({ ingredients, perReactionIngredients }),
      rowKind: 'reactionTotal',
    },
  ];
}
