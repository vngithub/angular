import {ServiceResult} from '../models/ServiceResult';
import {Exception} from '../exception/Exception';
class CentralCoreException extends Exception {
	
	/**
	 * Sets the exception message and service result set
	 * 
	 * @param msg
	 * @param serviceResult
	 */
	
	constructor(private msg: string, private serviceResult?: ServiceResult<object>){
		super('CentralCoreException', msg.toString());
	}
	
	/**
	 * Returns the service result
	 * 
	 * @return seriveResult
	 */
	public getServiceResult(): ServiceResult<object>{
		return this.serviceResult;
	}

}

export {CentralCoreException}
