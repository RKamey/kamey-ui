type CrudOperations<T, CreateT = T> = {
    getAll: () => Promise<{
        data: T[];
        error?: boolean;
        message?: string;
    }>;
    create?: (item: CreateT) => Promise<{
        data: T;
        error?: boolean;
        message?: string;
    }>;
    update?: (item: T) => Promise<{
        data: T;
        error?: boolean;
        message?: string;
    }>;
    delete?: (item: T | {
        [key: string]: any;
    }) => Promise<{
        data: T;
        error?: boolean;
        message?: string;
    }>;
    idField?: string;
    entityName?: string;
};
export declare function useCrudOperations<T extends {
    [key: string]: any;
}, CreateT = Omit<T, 'id'>>({ getAll, create, update, delete: deleteItem, idField, entityName, }: CrudOperations<T, CreateT>): {
    data: T[];
    isLoading: boolean;
    refetch: (options?: import('@tanstack/query-core').RefetchOptions) => Promise<import('@tanstack/query-core').QueryObserverResult<T[], Error>>;
    handleCreate: (values: Record<string, unknown>) => Promise<T>;
    handleUpdate: (record: unknown) => Promise<T>;
    handleDelete: (record: unknown) => Promise<T>;
    createItemAsync: import('@tanstack/react-query').UseMutateAsyncFunction<T, Error, CreateT, unknown>;
    updateItemAsync: import('@tanstack/react-query').UseMutateAsyncFunction<T, Error, T, unknown>;
    deleteItemAsync: import('@tanstack/react-query').UseMutateAsyncFunction<T, Error, T, unknown>;
};
export {};
