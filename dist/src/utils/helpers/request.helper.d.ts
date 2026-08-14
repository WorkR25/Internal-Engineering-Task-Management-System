import { AsyncLocalStorage } from 'async_hooks';
type AsyncLocalStorageType = {
    correlationId: string;
};
export declare const asyncLocalStorage: AsyncLocalStorage<AsyncLocalStorageType>;
export declare const getCorrelationId: () => string;
export {};
//# sourceMappingURL=request.helper.d.ts.map