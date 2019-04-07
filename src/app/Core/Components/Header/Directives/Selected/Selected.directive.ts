import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
    selector: '[selected]'
})
export class Selected implements OnChanges {
    @Input() selected: string;
    @Input() current: string;

    constructor(
        private element: ElementRef
    ) { }

    ngOnChanges(): void {
        if(this.selected == this.current) {
            this.element.nativeElement.style.color = "#007bff";
        } else {
            this.element.nativeElement.style.color = "#ffffff";
        }
    }
}