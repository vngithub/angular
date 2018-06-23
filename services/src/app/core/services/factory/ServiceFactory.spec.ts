import {ServiceFactory} from './ServiceFactory';
import {IService} from '../IService';
import {ServiceParams} from '../../models/ServiceParams';
import {ServiceResult} from '../../models/ServiceResult';
import {ResultSet} from '../../models/ResultSet';
import {ServiceNotFoundException} from '../../exception/ServiceNotFoundException';
import { Subscription } from "rxjs/Rx";
export interface IHelloworldService extends IService {
    /**
	 * Returns hello
	 * @return hello
	*/
    sayHello(): string;
 }
 export class HelloworldServiceImpl implements IHelloworldService  {
    public sayHello(): string {
        return "Hello";
    }
    init(serviceParams: ServiceParams): boolean {
        return true;
    }
    dispose(): boolean {
        return true;
    }
    processService<Object>(): ServiceResult<Object> {
        let map:Map<string, Object> = new Map<string, Object>();
        map.set("result", Object.assign( {"value": "Hello World"}));
        let r: ResultSet<Object> = new ResultSet("Success", Object.assign( {"value": "Hello World"}));
        let result:ServiceResult<Object> = new ServiceResult<Object>("SUCCESS", r );
        return result;
    }
    getName(): string {
        return "Helloworld";
    }
 }

 export class H1 implements IHelloworldService {
     sayHello(): string {
         throw new Error("Method not implemented.");
     }
     init(serviceParams: ServiceParams): boolean {
         throw new Error("Method not implemented.");
     }
     dispose(): boolean {
         throw new Error("Method not implemented.");
     }
     processService<T>(): ServiceResult<T> {
         throw new Error("Method not implemented.");
     }
     getName(): string {
         throw new Error("Method not implemented.");
     }

 }

describe('ServiceFactory', () => {
    it('Service Factory initialize service', () => {
        ServiceFactory.registerService("helloworldService", HelloworldServiceImpl);
        let service: IService = ServiceFactory.findService('helloworldService');
        expect(service.getName()).toBe('Helloworld');
        let result: ServiceResult<object> = service.processService(); 
        let resultData = result.getResults();
        expect(resultData.getStatus()).toBe('Success');
        expect(resultData.getResult()["value"]).toBe('Hello World');
    });
    it('Service Factory throws error if service not found', () => {
        try {
            ServiceFactory.findService('helloworldService1');
        } catch(exp) {
            let match: boolean = exp instanceof ServiceNotFoundException;
            expect(match).toBeTruthy();
        }
    });
})