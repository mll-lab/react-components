/**
 * `findAnnealing` throws `UndisplayableProtocolError` when cycle count or annealing step cannot be
 * determined, rather than returning a guess. It is the caller's job to catch that before
 * rendering — `ThermoCyclerProtocolProfile` draws what it is handed.
 */
export { parseThermoCyclerProtocol } from './parseThermoCyclerProtocol';
export { findAnnealing, UndisplayableProtocolError } from './findAnnealing';
export { formatHold } from './formatHold';

export { ThermoCyclerProtocolProfile } from './ThermoCyclerProtocolProfile';

export {
  Annealing,
  ThermoCyclerProtocol,
  ThermoCyclerProtocolProps,
  ThermoCyclerStage,
  ThermoCyclerStep,
  ThermoCyclerHold,
} from './types';
