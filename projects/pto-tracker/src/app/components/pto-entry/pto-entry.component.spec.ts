import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PtoEntryComponent } from './pto-entry.component';

describe('PtoEntryComponent', () => {
  let component: PtoEntryComponent;
  let fixture: ComponentFixture<PtoEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PtoEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtoEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
