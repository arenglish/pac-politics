import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearCardComponent } from './year-card.component';

describe('YearCardComponent', () => {
  let component: YearCardComponent;
  let fixture: ComponentFixture<YearCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
