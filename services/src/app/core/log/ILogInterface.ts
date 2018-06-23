/**
 * LogInterface interface will be used to log information.
 * @author Tathagata Roy
 */
export interface ILogInterface {
    /**
	 * Will be responsible to add log for debugging
	 *  
	 * @param msg : String log message
     * @param details : Details log message
	 * @return
	 */
    debug(primaryMessage: string, ...details: any[]): void;
    
    /**
	 * Will be responsible to add log for info
	 *  
	 * @param msg : String log message
     * @param details : Details log message
	 * @return
	 */
    warn(primaryMessage: string, ...details: any[]): void;
    
    /**
	 * Will be responsible to add log for warn
	 *  
	 * @param msg : String log message
     * @param details : Details log message
	 * @return
	 */
    error(primaryMessage: string, ...details: any[]): void;
     
    /**
	 * Will be responsible to add log for error
	 *  
	 * @param msg : String log message
     * @param details : Details log message
	 * @return
	 */
    info(primaryMessage: string, ...details: any[]): void;
}
