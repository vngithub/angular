import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
type ResponseInterceptor = (response: any) => any;
type RequestInterceptor = (request: any) => any;
type ErrorInterceptor = (error: any) => any;
const absoluteURLPattern = /^((?:https:\/\/)|(?:http:\/\/)|(?:www))/;
/**
 * HttpManager is a wrapper on top http. 
 * It will allow you to make crud operations,
 * add request/response/error interceptors, add/remove headers
 */
@Injectable()
export class HttpManager {
   /**
    * Headers used in all requests.
    */
    private headers: any = {};

    /**
     * Base url used in all requests.
     */
    public baseUrl = '';
  
    /**
     * Response interceptors which are fired on every response
     * 
     */
    private responseInterceptors: Array<ResponseInterceptor> = [];
    /**
    * Response interceptors which are fired on every response
    * 
    */
    private requestInterceptors: Array<RequestInterceptor> = [];
    /**
    * Response interceptors which are fired on every response
    * 
    */
    private errorInterceptors: Array<ErrorInterceptor> = [];

   /**
    * @param http Angular Http service.
    */
    constructor(public http: Http) {
        this.addResponseInterceptor(this.defaultResponseInterceptor);
        this.addRequestInterceptor(this.defaultRequestInterceptor);
        this.addErrorInterceptor(this.defaultErrorInterceptor);
    }
    /**
     * default response interceptor
     * @param resp Response
     * @returns any
     */
    public defaultResponseInterceptor(resp: Response): any {
        if (typeof resp.json === 'function') {
            return resp.json();
        }

        /* istanbul ignore next */
        if (typeof resp.text === 'function') {
            return resp.text();
        }

        return resp;
    }

    /**
     * default request interceptor
     * @param req any
     * @returns any
     */
    public defaultRequestInterceptor(req: any): string {
        return JSON.stringify(req);
    }

    /**
     * default error interceptor
     * @param res Response
     * @returns any
     */
    public defaultErrorInterceptor(resp: Response): any {
        let data;
        /* istanbul ignore else */
        if (typeof resp.json === 'function') {
            data = resp.json();
        } else {
            data = resp.statusText;
        }

        return { status: resp.status, data };
    }

    /**
     * Sets header for all requests.
     * @param key A header key.
     * @param value A value for the key.
     */
    public setHeader(key: string, value: string) {
        this.headers[key] = value;
    }

    /**
     * Gets header by key for all requests.
     * @param key      A header key.
     * @returns value
     */
    public getHeaderByKey(key: string) {
        return this.headers[key];
    }

    /**
     * Sets base url for all requests.
     * @param url A base url
     */
    public setBaseUrl(url: string) {
        this.baseUrl = url;
    }

    /**
     * Add response interceptor to all responses
     * @param interceptor A ResponseInterceptor
     */
    public addResponseInterceptor<T, S>(interceptor: (arg: T) => S): void {
        this.responseInterceptors = [...this.responseInterceptors, interceptor];
    }

    /**
     * Add error interceptor to all responses
     * @param interceptor A ErrorInterceptor
     */
    public addErrorInterceptor<T, S>(interceptor: (arg: T) => S): void {
        this.errorInterceptors = [...this.errorInterceptors, interceptor];
    }

    /**
     * Add reuquest interceptor to all reuqests
     * @param interceptor A RequestInterceptor
     */
    public addRequestInterceptor<T, S>(interceptor: (arg: T) => S): void {
        this.requestInterceptors = [interceptor, ...this.requestInterceptors];
    }

    /**
     * Removes header for all requests.
     * @param key      A header key.
     */
    public removeHeader(key: string) {
        delete this.headers[key];
    }

    /**
     * Performs a request with `get` http method.
     * @param url      An url which is used in a http request.
     * @param options  A request options arguments.
     * @returns        It returns a cold Observable which emits one value (in JavaScript format) from the request.
     */
    public get<T>(url: string, options?: RequestOptionsArgs): Observable<T> {
        return this.http.get(this.generateUrl(url), this.generateOptions(options))
            .map(this.responseHandler, this)
            .catch(this.errorHandler.bind(this));
    }

    /**
     * Performs a request with `post` http method.
     * @param url      An url which is used in a http request.
     * @param data     Data (in JavaScript format) which is used in a http request.
     * @param options  A request options arguments.
     * @returns        It returns a cold Observable which emits one value (in JavaScript format) from the request.
     */
    public post<T>(url: string, data: Object, options?: RequestOptionsArgs): Observable<T> {
        const newData = this.prepareData(data);
        return this.http.post(this.generateUrl(url), newData, this.generateOptions(options))
            .map(this.responseHandler, this)
            .catch(this.errorHandler.bind(this));
    }

    /**
     * Performs a request with `put` http method.
     * @param url      An url which is used in a http request.
     * @param data     Data (in JavaScript format) which is used in a http request.
     * @param options  A request options arguments.
     * @returns        It returns a cold Observable which emits one value (in JavaScript format) from the request.
     */
    public put<T>(url: string, data: Object, options?: RequestOptionsArgs): Observable<T> {
        const newData = this.prepareData(data);
        return this.http.put(this.generateUrl(url), newData, this.generateOptions(options))
            .map(this.responseHandler, this)
            .catch(this.errorHandler.bind(this));
    }

    /**
     * Performs a request with `delete` http method.
     * @param url      An url which is used in a http request.
     * @param options  A request options arguments.
     * @returns        It returns a cold Observable which emits one value (in JavaScript format) from the request.
     */
    public delete<T>(url: string, options?: RequestOptionsArgs): Observable<T> {
        return this.http.delete(this.generateUrl(url), this.generateOptions(options))
            .map(this.responseHandler, this)
            .catch(this.errorHandler.bind(this));
    }

    /**
     * Prepare data for request with interceptors
     * @param data     any
     * @returns        string
     */
    public prepareData(data: any): string {
        return this.requestInterceptors.reduce((acc, interceptor) => interceptor(acc), data);
    }

    /**
     * Handler which transform response to JavaScript format if response exists.
     * @param resp Http response
     * @returns any
     */
    public responseHandler(resp: Response): any {
        return this.responseInterceptors.reduce((acc: any, interceptor: any) => interceptor(acc), resp);
    }

    public errorHandler(error: Response): Observable<any> {
        return Observable.throw(
            this.errorInterceptors.reduce((acc: any, interceptor: any) => interceptor(acc), error)
        );
    }

    /**
     * Handler which generate url for all requests. It uses baseUrl if url doesn't start with 'http'' or 'www'.
     * @param url     Url string
     * @returns       Generated url string
     */
    public generateUrl(url: string): string {
        return url.match(absoluteURLPattern) ? url : this.baseUrl + url;
    }

    /**
     * Handler which generate options for all requests from headers.
     * @param options   Request options arguments
     * @returns         Request options arguments
     */
    public generateOptions(options: RequestOptionsArgs = {}): RequestOptionsArgs {
        if (!options.headers) {
            options.headers = new Headers();
        }

        Object.keys(this.headers)
            .filter((key) => this.headers.hasOwnProperty(key))
            .forEach((key) => {
                options.headers.append(key, this.headers[key]);
            });

        return options;
    }

}