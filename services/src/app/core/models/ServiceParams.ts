
/**
 * Stores the parameters used by service
 * @author Tathagata Roy.
 */
class ServiceParams {

    private static parameterMap: Map<string, string> = new Map<string, string>();

    /**
     * Returns parameter value from the parameter map
     * 
     *  @param name
     *  @returns value
     */
    public getParamValue(name: string): string {
        return ServiceParams.parameterMap.get(name);
    }

    /**
     * Store the parameter to the map
     * 
     * @param name : parameter name
     * @param value : parameter value
     */
    public setParamValue(name: string, value: string): void {
        ServiceParams.parameterMap.set(name, value);
    }

    /**
     * Removes passed parameter from parameters map
     * @param name
     */
    public removeParam(name: string): void {
        ServiceParams.parameterMap.delete(name);
    }

    /**
     * Clear the map
     */
    public removeAll(): void {
        ServiceParams.parameterMap.clear();
    }

    /**
     * Returns the parameter map
     * 
     * @returns parameter map
     */
    public getServiceParameters(): Map<string, string> {
        return ServiceParams.parameterMap;
    }
}
export {ServiceParams}