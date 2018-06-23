/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header.component";
import { UpgradeModule, downgradeComponent } from "@angular/upgrade/static";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
export class HeaderModule {
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
function HeaderModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    HeaderModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    HeaderModule.ctorParameters;
}
platformBrowserDynamic().bootstrapModule(HeaderModule)
    .catch(err => console.log(err));
angular.module('App')
    .directive('appHeader', downgradeComponent({ component: HeaderComponent }));
//# sourceMappingURL=header.module.js.map