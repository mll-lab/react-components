import { ThermoCyclerHold } from './types';
import { INDEFINITE_HOLD_SIGN } from './units';

const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 3600;

/** `hh:mm:ss` as the device shows a hold time. */
export function formatHold(hold: ThermoCyclerHold): string {
  if ('indefinite' in hold) {
    return INDEFINITE_HOLD_SIGN;
  }

  const hours = Math.floor(hold.seconds / SECONDS_PER_HOUR);
  const minutes = Math.floor(
    (hold.seconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE,
  );
  const seconds = hold.seconds % SECONDS_PER_MINUTE;

  return [hours, minutes, seconds]
    .map((value) => `${value}`.padStart(2, '0'))
    .join(':');
}
