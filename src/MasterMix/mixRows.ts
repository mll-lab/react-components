import { reactionVolume, sumVolume } from './reactionVolume';
import { MasterMixIngredient, MasterMixTableRow, ReactionMix } from './types';

export const MASTER_MIX_LABEL = 'MasterMix';

/**
 * Both ingredient lists are keyed by the consumer and typically start at 1,
 * so the row kind namespaces otherwise colliding keys apart. The keys of the
 * total rows below carry no separator and can therefore never collide with these.
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
    key: 'masterMixTotal',
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
      key: 'reactionTotal',
      title: 'Reaktionsvolumen',
      volume: reactionVolume({ ingredients, perReactionIngredients }),
      rowKind: 'reactionTotal',
    },
  ];
}
