import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearEntryComponent } from './year-entry.component';

describe('YearEntryComponent', () => {
  let component: YearEntryComponent;
  let fixture: ComponentFixture<YearEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
