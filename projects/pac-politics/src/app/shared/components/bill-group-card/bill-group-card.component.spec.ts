import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BillGroupCardComponent } from "./bill-group-card.component";

describe("VotesListComponent", () => {
  let component: BillGroupCardComponent;
  let fixture: ComponentFixture<BillGroupCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BillGroupCardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillGroupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
