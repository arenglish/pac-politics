import { Component, OnInit, Input, ElementRef, ContentChild, TemplateRef } from '@angular/core';

@Component({
    selector: 'portfolio-window-card',
    templateUrl: './window-card.component.html',
    styleUrls: ['./window-card.component.scss']
})
export class WindowCardComponent implements OnInit {
    @Input() image: URL;
    @Input() title: string;
    @Input() cardPosition: 'left' | 'right' = 'left';
    @Input() link: string = '';
    @ContentChild(TemplateRef)
    @Input() expandContent: TemplateRef<any> = null;
    
    isBannerExpanded = false;

    constructor() { }

    ngOnInit() { }

    toggleBanner() {
        this.isBannerExpanded = !this.isBannerExpanded;
    }

}
