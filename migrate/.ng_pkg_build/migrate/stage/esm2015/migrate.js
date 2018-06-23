import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpgradeModule, downgradeComponent } from '@angular/upgrade/static';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HeaderComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
HeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-header',
                template: `<h1>
  <ng-content></ng-content>
</h1>`,
                styles: [`h1{color:red}`]
            },] },
];
/** @nocollapse */
HeaderComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HeaderModule {
    /**
     * @return {?}
     */
    ngDoBootstrap() {
    }
}
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
/** @nocollapse */
HeaderModule.ctorParameters = () => [];
platformBrowserDynamic().bootstrapModule(HeaderModule)
    .catch(err => console.log(err));
angular.module('App')
    .directive('appHeader', downgradeComponent({ component: HeaderComponent }));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { HeaderModule, HeaderComponent as ɵa };
//# sourceMappingURL=migrate.js.map
