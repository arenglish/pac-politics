import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from "@angular/core";

function checkChildrenView(event, emitter: EventEmitter<Element>) {
  const element = event.currentTarget;
  const childElements = Array.from(element.childNodes || []).filter(
    (node: any) => {
      return node.classList
        ? Array.from(node.classList).includes("scroll-child")
        : false;
    }
  );
  const parentFloor =
    window.innerHeight - element.offsetTop + element.offsetHeight;

  childElements.forEach((el: any) => {
    const childTop = window.innerHeight - el.offsetTop;

    if (childTop > parentFloor) {
      emitter.emit(el);
    }
  });
}

@Directive({
  selector: "[scrollWatch]"
})
export class ScrollContainerDirective implements OnDestroy {
  @Output()
  public childInView = new EventEmitter<ElementRef>();
  private listenerFunction;

  constructor(private elementRef: ElementRef) {
    const element = this.elementRef.nativeElement;
    this.listenerFunction = function listenerFunction(event: Event) {
      return checkChildrenView(event, this.childInView);
    };

    element.addEventListener("scroll", this.listenerFunction);
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.removeEventListener(
      "scroll",
      this.listenerFunction
    );
  }
}
