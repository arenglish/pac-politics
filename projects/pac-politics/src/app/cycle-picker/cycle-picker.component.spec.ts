import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CyclePickerComponent } from './cycle-picker.component';

describe('CyclePickerComponent', () => {
  let component: CyclePickerComponent;
  let fixture: ComponentFixture<CyclePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CyclePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CyclePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
