import { mixRows } from './mixRows';

describe('mixRows', () => {
  it('appends the total to the ingredients it sums up', () => {
    expect(
      mixRows({
        ingredients: [
          { key: 1, title: 'Water', volume: 13 },
          { key: 2, title: 'Primer', volume: 2 },
        ],
      }),
    ).toStrictEqual([
      {
        key: 'masterMixIngredient-1',
        title: 'Water',
        volume: 13,
        rowKind: 'masterMixIngredient',
      },
      {
        key: 'masterMixIngredient-2',
        title: 'Primer',
        volume: 2,
        rowKind: 'masterMixIngredient',
      },
      {
        key: 'masterMixTotal',
        title: 'Gesamtvolumen',
        volume: 15,
        rowKind: 'masterMixTotal',
      },
    ]);
  });

  it('closes a reaction mix with the volume of a single reaction', () => {
    expect(
      mixRows({
        ingredients: [{ key: 1, title: 'Water', volume: 13 }],
        perReactionIngredients: [{ key: 2, title: 'cDNA', volume: 5 }],
      }),
    ).toStrictEqual([
      {
        key: 'masterMixIngredient-1',
        title: 'Water',
        volume: 13,
        rowKind: 'masterMixIngredient',
      },
      {
        key: 'masterMixTotal',
        title: 'MasterMix',
        volume: 13,
        rowKind: 'masterMixTotal',
      },
      {
        key: 'perReactionIngredient-2',
        title: 'cDNA',
        volume: 5,
        rowKind: 'perReactionIngredient',
      },
      {
        key: 'reactionTotal',
        title: 'Reaktionsvolumen',
        volume: 18,
        rowKind: 'reactionTotal',
      },
    ]);
  });

  it('keeps the rows apart when both ingredient lists start at the same key', () => {
    expect(
      mixRows({
        ingredients: [{ key: 1, title: 'Water', volume: 13 }],
        perReactionIngredients: [{ key: 1, title: 'cDNA', volume: 5 }],
      }).map((row) => row.key),
    ).toStrictEqual([
      'masterMixIngredient-1',
      'masterMixTotal',
      'perReactionIngredient-1',
      'reactionTotal',
    ]);
  });
});
