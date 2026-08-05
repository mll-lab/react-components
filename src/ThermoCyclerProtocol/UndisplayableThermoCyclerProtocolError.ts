/**
 * Lets a boundary tell "this protocol cannot be shown" apart from a rendering bug: the source
 * column also holds protocols this library deliberately does not model, so a refusal is expected
 * input handling rather than a failure of the library.
 */
export class UndisplayableThermoCyclerProtocolError extends Error {}
