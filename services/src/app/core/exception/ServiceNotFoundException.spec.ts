import {ServiceNotFoundException} from './ServiceNotFoundException';
import {IService} from '../services/IService';
import {CENTRAL_CONSTANTS} from '../common/CentralConstants';
import {ServiceParams} from '../models/ServiceParams';
import {ServiceResult} from '../models/ServiceResult';
import {ResultSet} from '../models/ResultSet';
import { Subscription } from "rxjs/Rx";
describe('ServiceNotFoundException', () => {
    it('ServiceNotFoundException test', () => {
        let result: ServiceResult<object> = new ServiceResult("FAILURE", new ResultSet("Success", {"msg": "Resolve it"}))
        let exception: ServiceNotFoundException = new ServiceNotFoundException();
        expect(exception.getMessage()).toBe("The requested service not found");
        expect(exception.getName()).toBe('ServiceNotFoundException');
    });
    
})