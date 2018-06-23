import { HybridUtils } from "./HybridUtils";
import { Component, Inject, Injector, NgModule, forwardRef, Injectable } from '@angular/core';
import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';
import { UpgradeModule } from '@angular/upgrade/static';
import * as angular from 'angular';
import { AppComponent } from "@app/app.component";
import { setAngularLib } from '@angular/upgrade/static';
import { Http } from '@angular/http'
import { BrowserModule } from "@angular/platform-browser";
let fixture;
let testService: any;
//declare var angular: _angular.IAngularStatic;
//Root component
let module = angular.module('ArubaCentral', []);

//Dummy Service
angular.module('ArubaCentral').service('testService', function () {
    this.testFunc = function (x: number) {
        return x * 10;
    }
});
const upgradedServices = [
    HybridUtils.upgradeService('testService', 'testService')
];
@Component({
    selector: 'app-root',
    template: '<div></div>',
    providers: [Http, UpgradeModule, ...upgradedServices]
})
//Root Component
export class TestComponent {
    title = 'app';
    constructor(private upgrade: UpgradeModule) {
        setAngularLib(angular);
        this.upgrade.bootstrap(document.body, ['ArubaCentral']);
    }

}

@Injectable()
export class TestService {
    title = 'app';
    getTitle(): string {
        return this.title;
    }

}
@Component({
    selector: 'app-ang-root',
    template: '<div></div>',
    providers: [TestService]
})
//Root Component
export class TestAngComponent {
    title = 'app';
    constructor(private service: TestService) {
        console.log(service);
    }
  

}


describe('HybridUtils  upgrade test case', () => {
    let service1;
    beforeEach((() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent
            ],
            imports: [
                BrowserModule,
                UpgradeModule
            ],
            providers: [...upgradedServices]
        }).compileComponents();
        const fixture = TestBed.createComponent(TestComponent);
        const app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        testService = fixture.debugElement.componentInstance.upgrade.injector.get('testService')
        

    }));
    it('HybridUtils upgrade test', () => {
        expect(testService instanceof Object).toBe(true);
        expect(testService.testFunc(10)).toBe(100);
    });


});

describe('HybridUtils  downgrade test case', () => {
    let service:TestService = null, service1 = null, _$root;
    beforeEach((() => {
        TestBed.configureTestingModule({
            declarations: [
                TestAngComponent
            ],
            imports: [
                BrowserModule
            ],
            providers: [TestService]
        }).compileComponents();
        const fixture = TestBed.createComponent(TestAngComponent);
        service  = fixture.debugElement.componentInstance.service;
        HybridUtils.downgradeService("ArubaCentral","TestService1", TestService);
        
    }));
    beforeEach(inject([TestService],(testService1) => {
        service1 =  testService1;
    }));
    it('HybridUtils upgrade test', () => {
        expect(service instanceof TestService).toBe(true);
        expect(service1.getTitle()).toBe('app');
    });


});

