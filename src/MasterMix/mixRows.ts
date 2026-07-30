import { reactionVolume, sumVolume } from './reactionVolume';
import { MasterMixIngredient, MasterMixTableRow, ReactionMix } from './types';

// Free of the separator, so they can never collide with an ingredient row key.
const MASTER_MIX_TOTAL_KEY = 'masterMixTotal';
const REACTION_TOTAL_KEY = 'reactionTotal';

export const MASTER_MIX_LABEL = 'MasterMix';

/**
 * Both ingredient lists are keyed by the consumer and typically start at 1,
 * so the row kind namespaces otherwise colliding keys apart.
 */
function ingredientRowKey(
  rowKind: 'masterMixIngredient' | 'perReactionIngredient',
  ingredient: MasterMixIngredient,
): string {
  return `${rowKind}-${ingredient.key}`;
}

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
    /** Within a reaction mix the total doubles as the amount of master mix per reaction. */
    title: perReactionIngredients?.length ? MASTER_MIX_LABEL : 'Gesamtvolumen',
    volume: sumVolume(ingredients),
    rowKind: 'masterMixTotal',
  };
  const masterMixIngredients: Array<MasterMixTableRow> = ingredients.map(
    (ingredient) => ({
      ...ingredient,
      key: ingredientRowKey('masterMixIngredient', ingredient),
      rowKind: 'masterMixIngredient',
    }),
  );

  if (!perReactionIngredients?.length) {
    return [...masterMixIngredients, masterMixTotal];
  }

  return [
    ...masterMixIngredients,
    masterMixTotal,
    ...perReactionIngredients.map(
      (ingredient): MasterMixTableRow => ({
        ...ingredient,
        key: ingredientRowKey('perReactionIngredient', ingredient),
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
