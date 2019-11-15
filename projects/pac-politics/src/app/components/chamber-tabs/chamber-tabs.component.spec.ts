import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ChamberTabsComponent } from "./chamber-tabs.component";

describe("ChamberTabsComponent", () => {
  let component: ChamberTabsComponent;
  let fixture: ComponentFixture<ChamberTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChamberTabsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamberTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
