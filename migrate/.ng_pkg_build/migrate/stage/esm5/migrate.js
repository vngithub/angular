import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpgradeModule, downgradeComponent } from '@angular/upgrade/static';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

var HeaderComponent = (function () {
    function HeaderComponent() {
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    return HeaderComponent;
}());
HeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-header',
                template: "<h1>\n  <ng-content></ng-content>\n</h1>",
                styles: ["h1{color:red}"]
            },] },
];
HeaderComponent.ctorParameters = function () { return []; };
var HeaderModule = (function () {
    function HeaderModule() {
    }
    HeaderModule.prototype.ngDoBootstrap = function () {
    };
    return HeaderModule;
}());
HeaderModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    BrowserModule,
                    CommonModule,
                    UpgradeModule
                ],
                declarations: [HeaderComponent],
                entryComponents: [
                    HeaderComponent
                ]
            },] },
];
HeaderModule.ctorParameters = function () { return []; };
platformBrowserDynamic().bootstrapModule(HeaderModule)
    .catch(function (err) { return console.log(err); });
angular.module('App')
    .directive('appHeader', downgradeComponent({ component: HeaderComponent }));

export { HeaderModule, HeaderComponent as ɵa };
//# sourceMappingURL=migrate.js.map
