export const DEGREES_CELSIUS = '°C';
export const DEGREES_CELSIUS_PER_SECOND = '°C/s';

/** Multiplier for the cycle count, as the protocol editors of commercial cyclers write it. */
export const REPEATS_SIGN = '×';

/**
 * An indefinite hold is its own concept, not a very long one — the RDML exchange format
 * gives it a dedicated element rather than a large duration.
 */
export const INDEFINITE_HOLD_SIGN = '∞';

/** The step a ramp rate belongs to is the one it leads into. */
export const TRANSITION_SIGN = '→';

/**
 * Next to a plateau there is no room to qualify the label, so the drawing names the step and
 * the note underneath states where the name comes from.
 */
export const ANNEALING_LABEL = 'Annealing';

/**
 * The source names no step roles, so the annealing step is derived from the temperatures.
 * Saying so keeps a reader from taking it for a stored fact.
 */
export const ANNEALING_DERIVATION_NOTE =
  'Annealing aus den Temperaturen abgeleitet, die Quelle nennt keine Schrittrollen.';

/** What the protocol editor of the LightCycler 480 software calls a stage. */
export const STAGE_LABEL = 'Programm';

export const UNKNOWN_RAMP_LABEL = 'Anfahrt unbekannt';
