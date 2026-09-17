import { ticksOfScale } from './scale';

describe('ticksOfScale', () => {
  it('labels the subdivisions spread across a logarithmic decade', () => {
    const ticks = ticksOfScale({
      bufferedMin: 1,
      bufferedMax: 100,
      scale: 'logarithmic',
    });

    expect(ticks.filter(({ isLabelled }) => isLabelled)).toEqual([
      { value: 1, isLabelled: true },
      { value: 2, isLabelled: true },
      { value: 3, isLabelled: true },
      { value: 5, isLabelled: true },
      { value: 7, isLabelled: true },
      { value: 10, isLabelled: true },
      { value: 20, isLabelled: true },
      { value: 30, isLabelled: true },
      { value: 50, isLabelled: true },
      { value: 70, isLabelled: true },
      { value: 100, isLabelled: true },
    ]);
    expect(ticks).toHaveLength(19);
  });

  it('labels more subdivisions of a decade stretched over the whole scale', () => {
    expect(
      ticksOfScale({
        bufferedMin: 0.033,
        bufferedMax: 0.176,
        scale: 'logarithmic',
      }),
    ).toEqual([
      { value: 0.04, isLabelled: true },
      { value: 0.05, isLabelled: true },
      { value: 0.06, isLabelled: true },
      { value: 0.07, isLabelled: true },
      { value: 0.08, isLabelled: false },
      { value: 0.09, isLabelled: false },
      { value: 0.1, isLabelled: true },
    ]);
  });

  it('drops the subdivisions of a scale spanning many decades', () => {
    expect(
      ticksOfScale({
        bufferedMin: 0.001,
        bufferedMax: 100,
        scale: 'logarithmic',
      }),
    ).toEqual([
      { value: 0.001, isLabelled: true },
      { value: 0.01, isLabelled: true },
      { value: 0.1, isLabelled: true },
      { value: 1, isLabelled: true },
      { value: 10, isLabelled: true },
      { value: 100, isLabelled: true },
    ]);
  });

  it('spaces a linear scale evenly', () => {
    expect(
      ticksOfScale({ bufferedMin: 1, bufferedMax: 20, scale: 'linear' }),
    ).toEqual([
      { value: 5, isLabelled: true },
      { value: 10, isLabelled: true },
      { value: 15, isLabelled: true },
      { value: 20, isLabelled: true },
    ]);
  });

  it('rounds the step of a linear scale to a readable number', () => {
    expect(
      ticksOfScale({
        bufferedMin: 0.027,
        bufferedMax: 0.164,
        scale: 'linear',
      }).map(({ value }) => value),
    ).toEqual([0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16]);
  });
});
