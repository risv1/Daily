import type { User } from "~~/server/database/schema";

type Cache = {
    users: Map<string, User>;
    cacheDuration: number;
}

class CacheService {
    private cache: Cache = {
        users: new Map<string, User>(),
        cacheDuration: 1000 * 60 * 60 * 24
    }

    public set(key: string, value: User) {
        this.cache.users.set(key, value);
        setTimeout(() => {
            this.cache.users.delete(key);
        }, this.cache.cacheDuration);
    }

    public get(key: string) {
        return this.cache.users.get(key);
    }

    public delete(key: string) {
        this.cache.users.delete(key);
    }
}

export const cacheService = new CacheService();