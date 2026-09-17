import { scaleHasTickLabels, ticksOfScale } from './scale';

describe('ticksOfScale', () => {
  it('subdivides the decades of a logarithmic scale', () => {
    expect(
      ticksOfScale({
        bufferedMin: 1,
        bufferedMax: 100,
        scale: 'logarithmic',
      }),
    ).toEqual([1, 2, 3, 5, 7, 10, 20, 30, 50, 70, 100]);
  });

  it('subdivides a logarithmic scale spanning less than a decade more densely', () => {
    expect(
      ticksOfScale({
        bufferedMin: 0.033,
        bufferedMax: 0.176,
        scale: 'logarithmic',
      }),
    ).toEqual([0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1]);
  });

  it('drops the subdivisions of a scale spanning many decades', () => {
    expect(
      ticksOfScale({
        bufferedMin: 0.001,
        bufferedMax: 100,
        scale: 'logarithmic',
      }),
    ).toEqual([0.001, 0.01, 0.1, 1, 10, 100]);
  });

  it('spaces a linear scale evenly', () => {
    expect(
      ticksOfScale({ bufferedMin: 1, bufferedMax: 20, scale: 'linear' }),
    ).toEqual([5, 10, 15, 20]);
  });

  it('rounds the step of a linear scale to a readable number', () => {
    expect(
      ticksOfScale({
        bufferedMin: 0.027,
        bufferedMax: 0.164,
        scale: 'linear',
      }),
    ).toEqual([0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16]);
  });
});

describe('scaleHasTickLabels', () => {
  it('labels a linear scale of any width', () => {
    expect(
      scaleHasTickLabels({
        bufferedMin: 0.012,
        bufferedMax: 0.048,
        scale: 'linear',
      }),
    ).toBe(true);
  });

  it('labels a logarithmic scale spanning a decade', () => {
    expect(
      scaleHasTickLabels({
        bufferedMin: 0.01,
        bufferedMax: 0.1,
        scale: 'logarithmic',
      }),
    ).toBe(true);
  });

  it('leaves a logarithmic scale spanning less than a decade unlabelled', () => {
    expect(
      scaleHasTickLabels({
        bufferedMin: 0.012,
        bufferedMax: 0.048,
        scale: 'logarithmic',
      }),
    ).toBe(false);
  });
});
