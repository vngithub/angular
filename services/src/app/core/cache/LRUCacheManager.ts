import {ICacheManager} from '../cache/ICacheManager';
/**
 * LRU Cache will maintain recently used cache
 */
//FIXME: Probably app level cache???
export class LRUCacheManager<T> implements ICacheManager<T> {
    private values: Map<string, T> = new Map<string, T>();
    private maxEntries: number = 1000;
    private static _instance:LRUCacheManager<any> = null;
    constructor() {
        
    }

    /**
     * Returns instance of MessagingCenter
     * @returns MessagingCenter
     */
    public static getInstance<T>():LRUCacheManager<T> {
        if(!LRUCacheManager._instance) {
            LRUCacheManager._instance = new LRUCacheManager<T>();
        }
        return this._instance;
    }

    public setMaxEntries(maxEntries: number): void {
        this.maxEntries = maxEntries;
    }
    /**
     * It would return the key and update the head of the cache
     * @param key 
     * @returns returns entry
     */
    public get(key: string): T {
        const hasKey = this.values.has(key);
        let entry: T;
        if(hasKey) {
            entry = this.values.get(key);
            this.values.delete(key);
            this.values.set(key, entry);
        }

        return entry;
    }
    /**
     * It would put the key. 
     * If the entries reaches to max limit then least recently used cache entry will be deleted.
     * @param key
     * @param value 
     */
    public put(key: string, value: T) {
        if(this.values.size >= this.maxEntries) {
            //Least recently used cache eviction 
            const keysToDelete = this.values.keys().next().value;

            this.values.delete(keysToDelete);
        }
        this.values.set(key, value);
    }
}