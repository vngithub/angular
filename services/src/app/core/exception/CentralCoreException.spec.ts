import {CentralCoreException} from './CentralCoreException';
import {IService} from '../services/IService';
import {ServiceParams} from '../models/ServiceParams';
import {ServiceResult} from '../models/ServiceResult';
import {ResultSet} from '../models/ResultSet';
import {ServiceNotFoundException} from '../exception/ServiceNotFoundException';
import { Subscription } from "rxjs/Rx";
describe('CentralCoreException', () => {
    it('CentralCoreException test', () => {
        let result: ServiceResult<object> = new ServiceResult("FAILURE", new ResultSet("Success", {"msg": "Resolve it"}))
        let exception: CentralCoreException = new CentralCoreException("CoreException", result);
        expect(exception.getMessage()).toBe('CoreException');
        expect(exception.getName()).toBe('CentralCoreException');
        expect(exception.getServiceResult().getStatus()).toBe('FAILURE');
        expect(exception.getServiceResult().getResults().getResult()["msg"]).toBe('Resolve it');
    });
    
})