export interface ICacheManager<T> {
    /**
     * It would return the key from the cache object
     * @param  key 
     * @returns returns entry
     */
    get(key: string): T;
    /**
     * It would put new cache entry
     * @param key 
     * @param value
     */
    put(key: string, value: T);
    
}
