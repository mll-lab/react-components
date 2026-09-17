import { ticksOfScale } from './scale';

describe('ticksOfScale', () => {
  it('labels the first, second and fifth subdivision of a logarithmic decade', () => {
    expect(
      ticksOfScale({ bufferedMin: 1, bufferedMax: 20, scale: 'logarithmic' }),
    ).toEqual([
      { value: 1, isLabelled: true },
      { value: 2, isLabelled: true },
      { value: 3, isLabelled: false },
      { value: 4, isLabelled: false },
      { value: 5, isLabelled: true },
      { value: 6, isLabelled: false },
      { value: 7, isLabelled: false },
      { value: 8, isLabelled: false },
      { value: 9, isLabelled: false },
      { value: 10, isLabelled: true },
      { value: 20, isLabelled: true },
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
