import { Component, HostBinding, Input } from "@angular/core";

@Component({
  selector: "app-loading",
  template: `
    <ng-container *ngIf="isLoading; else showContent">
      <div class="loading"></div>
    </ng-container>
    <ng-template #showContent>
      <ng-content></ng-content>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        align-content: center;
        height: 100%;
        width: 100%;
      }

      .loading {
        font-size: 100px;
      }

      .loading:after {
        overflow: hidden;
        display: inline-block;
        vertical-align: bottom;
        -webkit-animation: ellipsis steps(4, end) 900ms infinite;
        animation: ellipsis steps(4, end) 900ms infinite;
        content: "\\2026"; /* ascii code for the ellipsis character */
        width: 0px;
      }

      @keyframes ellipsis {
        to {
          width: 1.25em;
        }
      }

      @-webkit-keyframes ellipsis {
        to {
          width: 1.25em;
        }
      }
    `
  ]
})
export class LoadingComponent {
  @Input() isLoading = true;
}
