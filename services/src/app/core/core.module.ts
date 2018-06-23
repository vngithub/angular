import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
declare var angular: angular.IAngularStatic;
import { SanitizerPipe } from './pipe/SanitizerPipe';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SanitizerPipe],
  exports:[SanitizerPipe]
})
export class CoreModule { }
