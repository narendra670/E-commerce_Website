/** Coerce API / Redux values to a real array so .map never throws. */
export const ensureArray = (value) => (Array.isArray(value) ? value : [])
