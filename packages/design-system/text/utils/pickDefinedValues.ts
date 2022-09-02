/**
 * A utility for filtering undefined entries from a Record.
 * @param obj - A record of [string, unknown] pairs in which the second value is potentially undefined.
 * @returns The input record, filtered to remove any entries which are undefined.
 */
export const pickDefinedValues = <T extends Record<string, unknown>>(obj: T): T => {
  return Object.fromEntries(Object.entries(obj).filter(pair => pair[1] !== undefined)) as T
}
