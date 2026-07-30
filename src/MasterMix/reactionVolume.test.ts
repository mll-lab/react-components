import { reactionVolume } from './reactionVolume';

describe('reactionVolume', () => {
  it('sums master mix and per reaction ingredients', () => {
    expect(
      reactionVolume({
        ingredients: [{ key: 1, title: 'Water', volume: 13 }],
        perReactionIngredients: [{ key: 2, title: 'cDNA', volume: 5 }],
      }),
    ).toBe(18);
  });

  it('sums master mix ingredients without per reaction ingredients', () => {
    expect(
      reactionVolume({
        ingredients: [{ key: 1, title: 'Water', volume: 13 }],
      }),
    ).toBe(13);
  });
});
