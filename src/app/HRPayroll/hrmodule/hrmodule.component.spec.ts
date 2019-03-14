import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmoduleComponent } from './hrmodule.component';

describe('HrmoduleComponent', () => {
  let component: HrmoduleComponent;
  let fixture: ComponentFixture<HrmoduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrmoduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrmoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
