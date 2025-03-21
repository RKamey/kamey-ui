export type SortFunction<T> = (a: T, b: T) => number;
/**
 * Función para ordenar un arreglo de objetos por una propiedad específica.
 * @param key Propiedad por la que se va a ordenar.
 * @returns Función de comparación para usar en el método `sort` de un arreglo.
 */
export declare const sortOrder: <T extends object>(key: keyof T) => SortFunction<T>;
