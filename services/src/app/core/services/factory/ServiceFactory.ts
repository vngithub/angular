
import {Injector, Provider, ReflectiveInjector, ClassProvider} from '@angular/core';
import {IService} from '../IService';
import {ServiceNotFoundException} from '../../exception/ServiceNotFoundException';
import {CentralCoreException} from '../../exception/CentralCoreException';

/**
 * Registers service and find the service stored in registry
 * @author Tathagata Roy.
 */
export class ServiceFactory {

	private static allServices: Map<string, any>  = new Map<string, any>();

	/**
	 * Initializes the service
	 */
	static initialize() {
		//ServiceFactory.allServices.set("helloworldService", HelloworldServiceImpl);
	}
	
	/**
	 * Registers the service using Service factory
	 *  
	 * @param serviceName
	 * @param serviceClassName 
	 * @throws ServiceNotFoundException
	 */
	public static registerService(serviceName: string, serviceClassName: any ){
		if(serviceName != null && serviceClassName != null) {
			ServiceFactory.allServices.set(serviceName, serviceClassName);
		}
	}

	/**
	 * Returns the service object if service is registered
	 *  
	 * @param serviceName 
	 * @returns service object
	 * @throws ServiceNotFoundException
	 */
	public static findService(serviceName: string ): IService  {
		let serviceClassName: any = ServiceFactory.allServices.get(serviceName);
		if(serviceClassName === null || serviceClassName === undefined) {
			throw new ServiceNotFoundException("No service found with name: " + serviceName);
		}
		let service: IService = null;
		try {
			//FIXME: Plain reflection we may have to use
			const injector: Injector = ReflectiveInjector.resolveAndCreate([{provide: serviceName, useClass: serviceClassName}]);
			service = injector.get(serviceName);
		}
		catch(e) {
			throw new CentralCoreException("No service found with name" + serviceName);
		}
		return service;
	}
}
