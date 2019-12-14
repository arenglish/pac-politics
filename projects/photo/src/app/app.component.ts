import { Component } from "@angular/core";
import { PHOTOS } from "../environments/photos";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  photos = PHOTOS;
  title = "photo";
}
