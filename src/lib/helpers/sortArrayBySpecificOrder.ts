export function sortArrayBySpecificOrder<T extends { [k: string]: any }>(
  array: T[],
  order: { [k: string]: number },
  key: string
): T[] {
  return array.sort((a: T, b: T) => order[a[key]] - order[b[key]]);
}
