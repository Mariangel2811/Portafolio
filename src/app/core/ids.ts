let counter = 0;

/** Id corto y único para elementos nuevos del editor. */
export function newId(prefix: string): string {
  counter++;
  return `${prefix}-${Date.now().toString(36)}${counter}`;
}
