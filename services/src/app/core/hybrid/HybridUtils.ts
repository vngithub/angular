import { downgradeComponent, downgradeInjectable } from '@angular/upgrade/static';
import { FactoryProvider } from '@angular/core';
//import * as angular from 'angular';
import {IUpgradeableComponent} from './IUpgradeableComponent';

declare var angular: angular.IAngularStatic;
/**
 * HybridUtils is responsible to upgrade downgrade component services. 
 * @author Tathagata Roy
 */
export class HybridUtils   {
  /**
   * Downgrades angular component to angularjs component
   * @param moduleName angularjs module
   * @param componentName angularjs component 
   * @param componentClass angular component
   * @param options 
   */
  static downgradeComponent(moduleName: string, componentName: string, componentClass: any, options?: IUpgradeableComponent)  {
    options = options || {};
    const inputs = options.inputs || [];
    const outputs = options.outputs || [];
    const component = componentClass;

    angular.module(moduleName).directive(componentName, downgradeComponent({
      component, inputs, outputs
    }) as angular.IDirectiveFactory);
  }

  /**
   * Downgrades angular service to angularjs service
   * @param moduleName angularjs module
   * @param providerName angularjs service
   * @param providerClass angularjs class
   * 
   */
  static downgradeService(moduleName: string, providerName: string, providerClass: any)  {
    angular.module(moduleName).factory(providerName, downgradeInjectable(providerClass));
  }

  /**
   * Upgrades angularjs service to angular service
   * @param oldName angularjs service
   * @param newName angular service
   * 
   */
  static upgradeService(oldName: string, newName?: string): FactoryProvider  {
    newName = newName || oldName;

    return {
      provide: newName,
      useFactory: updrageProviderFactory(oldName),
      deps: ['$injector']
    };
  }
  
}
/**
 * Factory to get angularjs service
 * @param oldNmae 
 */
export function updrageProviderFactory(oldNmae: string): any {
  return (injector: any) => injector.get(oldNmae);
}
