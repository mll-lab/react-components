import { meanOfScale, ticksOfScale } from './scale';

describe('ticksOfScale', () => {
  it('subdivides the decades of a logarithmic scale', () => {
    expect(
      ticksOfScale({
        bufferedMin: 1,
        bufferedMax: 100,
        scale: 'logarithmic',
      }),
    ).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
    ]);
  });

  it('subdivides a logarithmic scale spanning less than a decade', () => {
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

describe('meanOfScale', () => {
  it('keeps the decimals an arithmetic mean needs beyond its bounds', () => {
    expect(
      meanOfScale({ expectedMin: 0.04, expectedMax: 0.15, scale: 'linear' }),
    ).toBe(0.095);
  });

  it('follows the decimals of its bounds on a logarithmic scale', () => {
    expect(
      meanOfScale({
        expectedMin: 0.038,
        expectedMax: 0.153,
        scale: 'logarithmic',
      }),
    ).toBe(0.076);
  });

  it('keeps a geometric mean of bounds written in exponential notation', () => {
    expect(
      meanOfScale({
        expectedMin: 1e-7,
        expectedMax: 1e-5,
        scale: 'logarithmic',
      }),
    ).toBe(0.000001);
  });
});
