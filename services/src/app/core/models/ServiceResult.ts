import {CENTRAL_CONSTANTS} from '../common/CentralConstants';
import {ResultSet} from '../models/ResultSet';
/**
 * This is a pojo class for storing the results and result status
 * 
 * @author Tathagata Roy.
 *
 */
class ServiceResult<T> {
	// Default to failure
	private resultStatus:string = CENTRAL_CONSTANTS.FAILURE;
	private results:ResultSet<T> = null;
	
	/**
	 * Sets the status and result map
	 * 
	 * @param status
	 * @param results
	 */
	constructor(status?: string, results?: ResultSet<T>){
		this.resultStatus = status? status: '';
		this.results = results? results: null;
	}
	
	/**
	 * Returns the result status
	 * @returns resultStatus
	 */
	public getStatus(): string{
		return this.resultStatus;
	}
	
	/**
	 * Returns the results 
	 * @returns results
	 */
	public getResults(): ResultSet<T>{
		return this.results;
	}
	
	/**
	 * Stores the result status
	 * @param resultStatus
	 */
	public setStatus(resultStatus: string): void{
		this.resultStatus = resultStatus;
	}
	
	/**
	 * Stores the results 
	 * @param results
	 */
	public setResults(results: ResultSet<T> ): void {
		this.results = results;
	}
}

export {ServiceResult}
