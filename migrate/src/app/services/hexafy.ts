import { InjectionToken } from "@angular/core";

export const hexafy_SERVICE = new InjectionToken<any>('hexafy_SERVICE');

export function createhexafyService(i) {
	console.log(i);
  return i.get('hexafy');
}

export const hexafyServiceProvider = {
  provide: hexafy_SERVICE,
  useFactory: createhexafyService,
  deps: ['$injector']
}