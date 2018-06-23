(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/upgrade/static'), require('@angular/platform-browser'), require('@angular/platform-browser-dynamic')) :
	typeof define === 'function' && define.amd ? define('migrate', ['exports', '@angular/core', '@angular/common', '@angular/upgrade/static', '@angular/platform-browser', '@angular/platform-browser-dynamic'], factory) :
	(factory((global.migrate = {}),global.ng.core,global.ng.common,global.ng.upgrade.static,global.ng.platformBrowser,global.ng.platformBrowserDynamic));
}(this, (function (exports,core,common,_static,platformBrowser,platformBrowserDynamic) { 'use strict';

var HeaderComponent = (function () {
    function HeaderComponent() {
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    return HeaderComponent;
}());
HeaderComponent.decorators = [
    { type: core.Component, args: [{
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
    { type: core.NgModule, args: [{
                imports: [
                    platformBrowser.BrowserModule,
                    common.CommonModule,
                    _static.UpgradeModule
                ],
                declarations: [HeaderComponent],
                entryComponents: [
                    HeaderComponent
                ]
            },] },
];
HeaderModule.ctorParameters = function () { return []; };
platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(HeaderModule)
    .catch(function (err) { return console.log(err); });
angular.module('App')
    .directive('appHeader', _static.downgradeComponent({ component: HeaderComponent }));

exports.HeaderModule = HeaderModule;
exports.ɵa = HeaderComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=migrate.umd.js.map
