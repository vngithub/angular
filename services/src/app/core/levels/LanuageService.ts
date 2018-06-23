import { IService } from "../services/IService";
import { ServiceParams } from "../models/ServiceParams";
import { ServiceResult } from "../models/ServiceResult";
import { ResultSet } from "../models/ResultSet";
import { Injectable } from "@angular/core";
import { CentralCoreException } from "../exception/CentralCoreException";
import { HttpManager } from "../http/HttpManager";
import { ObjectCacheManager } from '../cache/ObjectCacheManager';
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs";

/**
 * LanguageService returns language module keys
 * @author Tathagata Roy
 */
@Injectable()
export class LanguageService implements IService {
    /**
     * Sets the service params required for LanguageService
     */
    private _serviceParams: ServiceParams= null;
    private lang: string = ''
    private moduleKey: string = '';
    private pageName: string = '';
    private langJSON: Map<string, Map<string, string>> = new Map<string, Map<string, string>>();

    constructor(private httpManager: HttpManager) {
        
    }

    /**
	 * Will be responsible to set up the language service with all the parameters
	 * If the set up is successful then  it would send true
	 * and will return false if the execution result fails then invoking service would fail
	 *  
	 * @param serviceParams : Object containing all the service parameters
	 * @returns boolean 
	 */
    init(serviceParams: ServiceParams): boolean {
        this._serviceParams = serviceParams;
        let language: string = this._serviceParams.getParamValue("language");
        if (!language) {
            language = <string>ObjectCacheManager.getInstance().get("language");
            this._serviceParams.setParamValue("language", language);
        }
        return true;
    }

    /**
     * Disposes the service
     * @returns 
     */
    dispose(): boolean {
        throw new Error("Method not implemented.");
    }

    /**
     * Sets the label 
     * @param moduleName 
     * @param pageName 
     * @param lang 
     * @param labels 
     */
    private setLabel(moduleName, pageName, lang, labels) {
        let moduleMap: Map<string, string> = new Map<string, string>();
        if(!this.langJSON) {
            this.langJSON = new Map<string, Map<string, string>>();
        }
        if(!this.langJSON.get(moduleName))
            this.langJSON.set(moduleName, moduleMap);

        this.langJSON.get(moduleName).set(pageName, labels);
    };

    /**
     * Formats data
     * @param moduleName 
     * @param pageName 
     * @param lang 
     * @param labels 
     */
    private formatData (data, pageName, isOnlyPage) {
        if (typeof(data)=='object') {
            let labelsModule = {help: null, label: null};
            let labelmoduleObj = {};
            let helpmoduleObj = {};
            if(!isOnlyPage) {
                for (let d in data) {
                    this.setLabel(this.moduleKey, d, this.lang, data[d]);
                 }
            }
            let dataSet = isOnlyPage ? data : data[pageName];
            for (let d in dataSet) {
                this.setLabel(this.moduleKey, d, this.lang, dataSet[d]);
                helpmoduleObj[d] = dataSet[d].help;
                labelmoduleObj[d] = dataSet[d].label;
             }    
            labelsModule.help = helpmoduleObj;
            labelsModule.label= labelmoduleObj;
            return labelsModule; 
        } 
    }

    /**
	 * Will be responsible to fetch language json
	 * If the set up is successful then  it would set success in execution result
     * and also will return the labels
	 *  
	 * @returns ServiceResult 
	 */
    processService(): ServiceResult<any> {
        let _data = new Subject();
        let r: ResultSet<Observable<Object>> = new ResultSet("Success", _data);

        this.lang = this._serviceParams.getParamValue("language") || "en_US";
        this.pageName = this._serviceParams.getParamValue("pageName");
        this.moduleKey = this._serviceParams.getParamValue("moduleName");
        let pathPrefix = this._serviceParams.getParamValue("pathPrefix");
        //FIXME: Give proper path
        let URL = pathPrefix + '/' + this.lang + '/'+ this.moduleKey +'.json'; 
        
        this.httpManager.get(URL).subscribe((data) => {
            _data.next(this.formatData(data, this.pageName, false));
        })
        let result:ServiceResult<Observable<Object>> = new ServiceResult<Observable<Object>>("SUCCESS", r );
        return result;
    }

    /**
     * Returns the service name
     * @returns name
     */
    getName(): string {
        return "LanguageService";
    }
}