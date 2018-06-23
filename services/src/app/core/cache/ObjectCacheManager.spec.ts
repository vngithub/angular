import { ObjectCacheManager } from './ObjectCacheManager';
import { ICacheManager } from './ICacheManager';
import { BaseRequestOptions, Http, Response, ResponseOptions, HttpModule, RequestOptionsArgs } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TestBed, inject } from '@angular/core/testing';

describe('ObjectCacheManager Test', () => {
    it('ObjectCacheManager put test', () => {
        const cache: ICacheManager<string> = ObjectCacheManager.getInstance();

        cache.put("testKey", "Test Value");
        const value: string = cache.get("testKey");
        expect(value).toBe("Test Value");
    });

    it('ObjectCacheManager put test with recent entries', () => {
        const cache: ICacheManager<string> = ObjectCacheManager.getInstance();
        cache.put("testKey", "Test Value");
        cache.put("testKey1", "Test Value1");
        const value: string = cache.get("testKey");
        expect(value).toBe('Test Value');
        const value1: string = cache.get("testKey1");
        expect(value1).toBe('Test Value1');
    });
})