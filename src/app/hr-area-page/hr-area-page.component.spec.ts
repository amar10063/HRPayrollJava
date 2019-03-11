import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrAreaPageComponent } from './hr-area-page.component';

describe('HrAreaPageComponent', () => {
  let component: HrAreaPageComponent;
  let fixture: ComponentFixture<HrAreaPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrAreaPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrAreaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
