import { hasPerReactionIngredients } from './hasPerReactionIngredients';
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

/** Ordered from the inside out, so that every total follows what it sums up. */
export function mixRows({
  ingredients,
  perReactionIngredients,
}: ReactionMix): Array<MasterMixTableRow> {
  const masterMixRows: Array<MasterMixTableRow> = [
    ...ingredients.map(
      (ingredient): MasterMixTableRow => ({
        ...ingredient,
        key: ingredientRowKey('masterMixIngredient', ingredient),
        rowKind: 'masterMixIngredient',
      }),
    ),
    {
      key: 'masterMixTotal',
      /** Within a reaction mix the total doubles as the amount of master mix per reaction. */
      title: hasPerReactionIngredients(perReactionIngredients)
        ? MASTER_MIX_LABEL
        : 'Gesamtvolumen',
      volume: sumVolume(ingredients),
      rowKind: 'masterMixTotal',
    },
  ];

  if (!hasPerReactionIngredients(perReactionIngredients)) {
    return masterMixRows;
  }

  return [
    ...masterMixRows,
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
