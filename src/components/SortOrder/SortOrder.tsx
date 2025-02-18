// sortOrder.ts
export type SortFunction<T> = (a: T, b: T) => number;

/**
 * Función para ordenar un arreglo de objetos por una propiedad específica.
 * @param key Propiedad por la que se va a ordenar.
 * @returns Función de comparación para usar en el método `sort` de un arreglo.
 */
export const sortOrder = <T extends object>(key: keyof T): SortFunction<T> => {
  return (a: T, b: T): number => {
    const valueA = a[key];
    const valueB = b[key];

    // Manejo de nulos y undefined
    if (valueA === null || valueA === undefined) return -1;
    if (valueB === null || valueB === undefined) return 1;

    // Fechas
    if (valueA instanceof Date && valueB instanceof Date) {
      return valueA.getTime() - valueB.getTime();
    }

    // Números
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return valueA - valueB;
    }

    // Strings
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      const numA = Number(valueA);
      const numB = Number(valueB);
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
      }
      return valueA.localeCompare(valueB);
    }

    // Booleanos
    if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
      return valueA === valueB ? 0 : valueA ? -1 : 1;
    }

    // Objetos
    if (typeof valueA === 'object' && typeof valueB === 'object') {
      return JSON.stringify(valueA).localeCompare(JSON.stringify(valueB));
    }

    // Fallback para otros tipos
    return String(valueA).localeCompare(String(valueB));
  };
};
