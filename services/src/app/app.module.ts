import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HttpManager } from './core/http/HttpManager';
import {UpgradeModule} from '@angular/upgrade/static';
import { BrowserModule, DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    UpgradeModule
  ],
  providers: [
    HttpManager
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
