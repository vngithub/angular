import { SanitizerPipe } from "./SanitizerPipe";
import { Component, Inject, Injector, NgModule, forwardRef } from '@angular/core';
import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';
import { BrowserModule } from "@angular/platform-browser";
let service: SanitizerPipe;

describe('SanitizerPipe  test case', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [ SanitizerPipe
          ]
        });
      });
    
    beforeEach(inject([SanitizerPipe], (_service) => {
        service = _service;
      }));
    
    it('SanitizerPipe sanitize url test', () => {
        let URL = service.transform("http://visualrf.com").changingThisBreaksApplicationSecurity;
        expect(URL).toBe("http://visualrf.com");
    });


});

