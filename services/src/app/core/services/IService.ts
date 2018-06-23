import {ServiceParams}  from '../models/ServiceParams';
import {ServiceResult}  from '../models/ServiceResult';
/**
 * Service interface is the glue between all modules.
 * It would communicate with module and would return the desired result to the called modules
 *
 */
export interface IService {
	/**
	 * Will be responsible to set up the service with all the parameters
	 * If the set up is successful then  it would send true
	 * and will return false if the execution result fails then invoking service would fail
	 *  
	 * @param serviceParams : Object containing all the service parameters
	 * @returns boolean 
	 */
	init(serviceParams: ServiceParams): boolean;

	/**
	 * Will be responsible to dispose the objects obtained by the service
	 *  
	 * @returns ServiceResult 
	 */
	dispose(): boolean;
	
	/**
	 * Will be responsible to communicate with DAO and will return the result to its caller
	 * If the set up is successful then  it would set success in execution result
	 *  
	 * @returns ServiceResult 
	 */
	processService<T extends any>(): ServiceResult<T>;
	
	/**
	 * Returns the service name
	 * @returns service name
	 */
	getName(): string;
}
