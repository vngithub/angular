import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
//import { NgModule } from '@angular/core';

import { UpgradeModule, downgradeComponent, downgradeInjectable, downgradeModule} from '@angular/upgrade/static';
import { AppComponent } from './app.component';
import { Ng2demoComponent } from './ng2demo/ng2demo.component';

//import { ConfigAppModule } from '@config/app/app.module';

//import { hexafyServiceProvider } from "./services/hexafy";

import { TestService } from "./test.service";


import { HeaderModule } from 'ui-component-lib';
import { hexafyServiceProvider } from "ui-component-lib";

//import { HeaderModule } from './modules/header/header.module';

import { RouterModule, Routes } from '@angular/router';

declare var angular: any;

angular.module('App')
  .directive(
    'appNg2demo',
    downgradeComponent({component: Ng2demoComponent})
  );

angular.module('App.Controllers').factory('testService', downgradeInjectable(TestService) as any);
/*angular.module('App')
  .directive(
    'appHeader',
    downgradeComponent({component: HeaderComponent})
  );
*/
/*const appRoutes: Routes = [
{
  path:  '',component:Ng2demoComponent
}

];*/

@NgModule({
  declarations: [
    AppComponent,
    Ng2demoComponent
  ],
  imports: [
    /*RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),*/
    BrowserModule,
    UpgradeModule,
    HeaderModule,/*,
    ConfigAppModule*/
  ],
  entryComponents: [
    Ng2demoComponent, // Don't forget this!!!
  ],
 // schemas: [NO_ERRORS_SCHEMA],
  providers: [
        TestService,
        {provide: 'titleCase', useFactory: (i: any) => i.get('titleCase'), deps: ['$injector']},
        hexafyServiceProvider/*,
         {
            provide: '$scope',
            useFactory: i => i.get('$rootScope'),
            deps: ['$injector']
        }*/],
  bootstrap: [AppComponent]
})
export class AppModule { 
	 constructor(private upgrade: UpgradeModule) { }
	 //ngDoBootstrap(app) {
   // this.upgrade.bootstrap(document.body, ['App']);

  //}
}
