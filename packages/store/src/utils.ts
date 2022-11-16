import { SafeAny, StoreMetaInfo } from './inner-types';
import { META_KEY } from './types';

export function findAndCreateStoreMetadata(target: Object): StoreMetaInfo {
    if (!target.hasOwnProperty(META_KEY)) {
        const defaultMetadata: StoreMetaInfo = {
            actions: {},
            path: null,
            children: [],
            instance: null
        };
        target[META_KEY] = defaultMetadata;
    }
    return target[META_KEY];
}

export function keyBy<T>(array: T[], key: T extends object ? keyof T : never): { [key: string]: T } {
    const result: { [key: string]: T } = {};
    array.forEach((item) => {
        const keyValue = item[key];
        (result as any)[keyValue] = item;
    });
    return result;
}

export function indexKeyBy<T>(array: T[], key: T extends object ? keyof T : never): { [key: string]: number } {
    const result: { [key: string]: number } = {};
    array.forEach((item, index) => {
        const keyValue = item[key];
        (result as any)[keyValue] = index;
    });
    return result;
}

export function coerceArray<T>(value: T | T[]): T[] {
    return Array.isArray(value) ? value : [value];
}

export type StateFn = (...args: SafeAny[]) => SafeAny;

export const compose =
    (funcs: StateFn[]) =>
    (...args: SafeAny[]) => {
        const current = funcs.shift()!;
        return current(...args, (...nextArgs: SafeAny[]) => compose(funcs)(...nextArgs));
    };

// generate a unique id
export function generateIdWithTime(): string {
    return `${new Date().getTime()}-${Math.random().toString(36).substring(2)}`;
}
