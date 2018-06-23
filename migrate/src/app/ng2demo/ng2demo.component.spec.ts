import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng2demoComponent } from './ng2demo.component';

describe('Ng2demoComponent', () => {
  let component: Ng2demoComponent;
  let fixture: ComponentFixture<Ng2demoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng2demoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng2demoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
