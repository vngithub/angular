/**
 * This exception class is parent of every central exception class
 * 
 * @author Tathagata Roy
 *
 */
export abstract class Exception implements Error {
    constructor(public name, public message) {

    }
    /**
     * Returns exception name
     * @returns name
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Returns exception message
     * @returns message
     */
    public getMessage(): string {
        return this.message;
    }
}
