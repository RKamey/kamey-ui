/**
 * Custom hook to handle asynchronous operations.
 *
 * @template T - The type of the data returned by the async function.
 * @param {() => Promise<T>} asyncFunction - The asynchronous function to execute.
 * @param {unknown[]} [dependencies] - Optional array of dependencies for the useEffect hook.
 * @returns {{ data: T | undefined, error: Error | null, loading: boolean }} - An object containing the data, error, and loading state.
 */
export declare const useAsync: <T>(asyncFunction: () => Promise<T>, dependencies?: unknown[]) => {
    data: T | undefined;
    error: Error | null;
    loading: boolean;
};
