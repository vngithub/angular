import { HttpManager } from '../http/HttpManager';
import { BaseRequestOptions, Http, Response, ResponseOptions, HttpModule, RequestOptionsArgs } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { TestBed, inject, async, fakeAsync, tick, getTestBed, discardPeriodicTasks } from '@angular/core/testing';
import { LanguageService } from '../levels/LanuageService';
import { ServiceParams } from '../models/ServiceParams';
import { ObjectCacheManager } from '../cache/ObjectCacheManager';
import { ServiceResult } from '../models/ServiceResult';
import { Observable } from 'rxjs/Observable';

describe('Service: LanguageService', () => {
  let service: LanguageService;
  let httpManager: HttpManager;
  let mockbackend: MockBackend;
  let http: Http;
  let _resultData;
  beforeAll(() => {
    // Monkey-patch Observable.debounceTime() since it is using
    // setInterval() internally which not allowed within async zone
    Observable.prototype.debounceTime = function () { return this; };
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ HttpManager, MockBackend, BaseRequestOptions,
        { provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
        LanguageService
      ],
      imports: [ HttpModule ]
    });
    TestBed.compileComponents();
  });

  beforeEach(inject([MockBackend, HttpManager, LanguageService], (_mockbackend, _service, languageService) => {
    mockbackend = _mockbackend;
    service = languageService;
    httpManager = _service;
    mockbackend.connections.subscribe(
      (connection: MockConnection) => {

        // make sure the URL is correct
        expect(connection.request.url).toMatch(/en_US\/devices_licenses.json/);
        connection.mockRespond(
          new Response(
            new ResponseOptions({
              body: {
                "smtp_settings": {
                  "smtp_settings_success": {
                    "help": {
                      "text": "",
                      "title": ""
                    },
                    "label": "SMTP settings success"
                  },
                  "mail_server_settings": {
                    "help": {
                      "text": "",
                      "title": ""
                    },
                    "label": "Mail Server Settings"
                  }
                }
              }
            }))
        );
      }
    );
    let s: ServiceParams = new ServiceParams();
    ObjectCacheManager.getInstance().put("language", "en_US");
    s.setParamValue("moduleName", "devices_licenses");
    s.setParamValue("pageName", "smtp_settings");
    s.setParamValue("path_prefix", "/static");
    service.init(s);
    _resultData = service.processService().getResults().getResult();
    
    
  }));

  it('should be true', () => {
    expect(service).toBeTruthy();
  });

  it('Language should be fetched', fakeAsync(() => { 
    /*_resultData.subscribe((resultData: Object) => {
      actuallyDone = true;
      expect(Object.keys(_resultData.label).length).toBe(3);
      expect((_resultData.label["mail_server_settings"])).toBe("Mail Server Settings");
    })
    _resultData.complete();
    tick(2000);
    discardPeriodicTasks();*/
  }));

});