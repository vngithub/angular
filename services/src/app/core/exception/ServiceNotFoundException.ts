import {ServiceResult} from '../models/ServiceResult';
import {CENTRAL_CONSTANTS} from '../common/CentralConstants';
import {Exception} from '../exception/Exception';
/**
 * This exception class will be thrown back from service to its caller if service is not found
 * 
 * @author Tathagata Roy
 *
 */
class ServiceNotFoundException extends Exception {
    name = 'ServiceNotFoundException'
    message:string = CENTRAL_CONSTANTS.SERVICE_NOT_FOUND;
	
	/**
	 * Sets the exception message
	 * 
	 * @param msg
	 */
	constructor(msg?: string){
		super(name, msg ? msg : CENTRAL_CONSTANTS.SERVICE_NOT_FOUND);
		this.message = msg ? msg : CENTRAL_CONSTANTS.SERVICE_NOT_FOUND;
	}
	

}
export {ServiceNotFoundException}
