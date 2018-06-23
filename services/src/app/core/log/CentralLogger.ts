import {ILogInterface} from '../log/ILogInterface';

export class CentralLogger implements ILogInterface {
    /**
	 * Will be responsible to add log for debugging
	 *  
	 * @param msg : String log message
     * @param details : Details log message
	 * @return
	 */
    public debug(msg: string, ...details: any[]): void {
        this.logMessage("debug", msg, details);
    }

    /**
	 * Will be responsible to add log for info
	 *  
	 * @param msg : String log message
     * @param details : Details log message
	 * @return
	 */
    public info(msg: string, ...details: any[]): void {
        this.logMessage("info", msg, details);
    }

    /**
	 * Will be responsible to add log for warn
	 *  
	 * @param msg : String log message
     * @param details : Details log message
	 * @return
	 */
    public warn(msg: string, ...details: any[]): void {
        this.logMessage("warn", msg, details);
    }

    /**
	 * Will be responsible to add log for error
	 *  
	 * @param msg : String log message
     * @param details : Details log message
	 * @return
	 */
    public error(msg: string, ...details: any[]): void {
        this.logMessage("error", msg, details);
    }

    public logMessage(msgType: "debug" | "info" | "warn" | "error", msg: string, details: any[]) {
        console[msgType](msg);
    }
}