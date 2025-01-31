/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

/**
 * Custom hook to handle asynchronous operations.
 *
 * @template T - The type of the data returned by the async function.
 * @param {() => Promise<T>} asyncFunction - The asynchronous function to execute.
 * @param {unknown[]} [dependencies] - Optional array of dependencies for the useEffect hook.
 * @returns {{ data: T | undefined, error: Error | null, loading: boolean }} - An object containing the data, error, and loading state.
 */
export const useAsync = <T,>(asyncFunction: () => Promise<T>, dependencies?: unknown[]) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const executeAsyncFunction = async () => {
      try {
        setLoading(true);
        const result = await asyncFunction();
        //Si tiene .data, devolver solo eso
        if (result && typeof result === 'object' && 'data' in result) {
          setData((result as { data: T }).data);
        } else {
          setData(result);
        }
      } catch (error) {
        setError(error instanceof Error ? error : new Error("An error occurred"));
      } finally {
        setLoading(false);
      }
    };

    executeAsyncFunction();
  }, dependencies || []);

  return { data, error, loading };
};