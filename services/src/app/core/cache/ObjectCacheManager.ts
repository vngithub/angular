import {ICacheManager} from '../cache/ICacheManager';
/**
 * Object Cache will maintain object cache
 */
//FIXME: probably Application level cache
export class ObjectCacheManager<T> implements ICacheManager<T>{
    private values: Map<string, T> = new Map<string, T>();
    private static _instance:ObjectCacheManager<any> = null;
    constructor() {
        
    }

    /**
     * Returns instance of MessagingCenter
     * @returns MessagingCenter
     */
    public static getInstance<T>():ObjectCacheManager<T> {
        if(!ObjectCacheManager._instance) {
            ObjectCacheManager._instance = new ObjectCacheManager<T>();
        }
        return this._instance;
    }

    /**
     * It would return the key and update the cache
     * @param key 
     * @returns returns entry
     */
    public get(key: string): T {
        const hasKey = this.values.has(key);
        let entry: T;
        if(hasKey) {
            entry = this.values.get(key);
        }

        return entry;
    }

    /**
     * It would put the key in the cache. 
     * @param key
     * @param value 
     */
    public put(key: string, value: T) {
        this.values.set(key, value);
    }
}