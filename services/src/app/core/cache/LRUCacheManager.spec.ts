import { LRUCacheManager } from './LRUCacheManager';
import { ICacheManager } from './ICacheManager';
import { BaseRequestOptions, Http, Response, ResponseOptions, HttpModule, RequestOptionsArgs } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TestBed, inject } from '@angular/core/testing';

describe('LRUCacheManager Test', () => {
    it('LRUCacheManager put test', () => {
        const cache: ICacheManager<string> = LRUCacheManager.getInstance();

        cache.put("testKey", "Test Value");
        const value: string = cache.get("testKey");
        expect(value).toBe("Test Value");
    });

    it('LRUCacheManager put test with recent entries', () => {
        const cache: LRUCacheManager<string> = LRUCacheManager.getInstance();
        cache.setMaxEntries(1);
        cache.put("testKey", "Test Value");
        cache.put("testKey1", "Test Value1");
        const value: string = cache.get("testKey");
        expect(value).toBeUndefined();
    });
})