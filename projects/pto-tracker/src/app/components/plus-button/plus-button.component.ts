import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-plus-button",
  template: `
    <div class="add-year-icon-container" (click)="_clicked.emit()">
      <div>+</div>
    </div>
  `,
  styleUrls: ["./plus-button.component.scss"]
})
export class PlusButtonComponent {
  @Output("clicked") _clicked = new EventEmitter<void>();
}
