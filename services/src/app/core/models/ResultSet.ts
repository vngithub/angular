/**
 * This is a pojo class for storing the result value and status
 * 
 * @author Tathagata Roy.
 *
 */
export class ResultSet<T> {
    /**
     * Sets status and result
     * @param status
     * @param result 
     */
    constructor(private status: string, private result: T) {

    }
    /**
     * Returns status
     * @returns status
     */
    public getStatus(): string {
        return this.status;
    }
    /**
     * Returns result
     * @returns result
     */
    public getResult(): T {
        return this.result;
    }
}