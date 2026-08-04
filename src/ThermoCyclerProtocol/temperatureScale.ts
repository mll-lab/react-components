/** So the hottest and the coldest step do not sit exactly on the frame. */
const PADDING_DEGREES = 4;

export type TemperatureScale = (temperature: number) => number;

/**
 * Scaled to the protocol's own temperatures rather than to a fixed window: there is nothing
 * to clamp, so no step can be drawn at a height that contradicts its printed value.
 *
 * Returns 0 at the coldest drawn temperature and 1 at the hottest.
 */
export function temperatureScale(
  temperatures: Array<number>,
): TemperatureScale {
  if (temperatures.length === 0) {
    throw new Error('Temperaturskala ohne Temperaturen.');
  }

  const min = Math.min(...temperatures) - PADDING_DEGREES;
  const max = Math.max(...temperatures) + PADDING_DEGREES;

  return (temperature) => (temperature - min) / (max - min);
}
