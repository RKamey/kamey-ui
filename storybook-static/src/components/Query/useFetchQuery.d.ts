import { QueryKey } from '@tanstack/react-query';
type QueryConfig<TData, TError> = {
    enabled?: boolean;
    retry?: boolean | number;
    staleTime?: number;
    cacheTime?: number;
    onSuccess?: (data: TData) => void;
    onError?: (error: TError) => void;
};
type MutationConfig<TData, TError, TVariables> = {
    onSuccess?: (data: TData) => void;
    onError?: (error: TError) => void;
    onMutate?: (variables: TVariables) => void;
    onSettled?: (data: TData | undefined, error: TError | null) => void;
};
export declare const useQueryFetch: <TData, TError = Error>({ queryKey, queryFn, config }: {
    queryKey: QueryKey;
    queryFn: () => Promise<TData>;
    config?: QueryConfig<TData, TError>;
}) => import('@tanstack/react-query').UseQueryResult<import('@tanstack/query-core').NoInfer<TData>, TError>;
/**
 * Use Mutation Fetch Hook
 * @param queryKey - The query key.
 * @param mutationFn - The mutation function.
 * @param config - The mutation configuration.
 * @returns The mutation result.
 * @template TData - The mutation data type.
 * @template TError - The mutation error type.
 * @template TVariables - The mutation variables type.
 * @example
 * const { mutateAsync: createItemAsync } = useMutationFetch<T, Error, CreateT>({
 * queryKey: KEY,
 * mutationFn: async (item: CreateT) => {
 * const response = await create(item);
 * return response.data;
 * },
 * config: getMutationConfig('creado'),
 * });
 * @see https://tanstack.com/query/latest/docs/framework/react/mutations
 */
export declare const useMutationFetch: <TData, TError = Error, TVariables = unknown>({ queryKey, mutationFn, config }: {
    queryKey: QueryKey;
    mutationFn: (variables: TVariables) => Promise<TData>;
    config?: MutationConfig<TData, TError, TVariables>;
}) => import('@tanstack/react-query').UseMutationResult<TData, TError, TVariables, unknown>;
export {};
