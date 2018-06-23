import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { UpgradeModule, downgradeComponent, downgradeModule} from '@angular/upgrade/static';

import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    UpgradeModule
  ],
  declarations: [HeaderComponent],
  entryComponents: [
    HeaderComponent // Don't forget this!!!
  ]
})
export class HeaderModule { 
	ngDoBootstrap() {
  }
}


platformBrowserDynamic().bootstrapModule(HeaderModule)
  .catch(err => console.log(err));


declare var angular: any;

angular.module('App')
  .directive(
    'appHeader',
    downgradeComponent({component: HeaderComponent})
  );




