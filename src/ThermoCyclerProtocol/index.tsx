/**
 * Renders a thermal cycler protocol read from NeMo's protocol table as a schematic staircase.
 *
 * The view is an excerpt of the device program — the source holds no acquisition mode and no
 * detection format.
 *
 * A protocol whose cycle count or annealing step cannot be determined is not renderable, and the
 * component throws `UndisplayableProtocolError` from its render rather than showing a guess.
 * Consumers that cannot rule this out beforehand should call `protocolSummary` first or wrap the
 * component in an error boundary — an uncaught throw unmounts the surrounding tree.
 */
export { parseThermoCyclerProtocol } from './parseThermoCyclerProtocol';
export { protocolSummary, UndisplayableProtocolError } from './protocolSummary';
export { formatHold } from './formatHold';

export { ThermoCyclerProtocolProfile } from './ThermoCyclerProtocolProfile';

export {
  ThermoCyclerProtocol,
  ThermoCyclerProtocolProps,
  ThermoCyclerStage,
  ThermoCyclerStep,
  ThermoCyclerHold,
} from './types';
export { ProtocolSummary, AnnealingPosition } from './protocolSummary';
