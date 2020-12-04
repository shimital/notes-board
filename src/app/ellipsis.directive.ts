import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appEllipsis]'
})
export class EllipsisDirective implements AfterViewInit {

    constructor (private readonly el: ElementRef) {
    }

    ngAfterViewInit (): void {
        const textContainer = <HTMLElement> this.el.nativeElement;
        const textContainerHeight = textContainer.clientHeight;
        const textContainerParent = textContainer.parentElement;
        const textContainerParentHeight = textContainerParent.clientHeight;

        if (textContainerHeight > textContainerParentHeight) {
            textContainer.style.height = '100%';
            textContainer.style.overflow = 'hidden';
            const ellipsisEl = document.createElement('span');

            Object.assign(ellipsisEl.style, {
                position: 'absolute',
                bottom: '10px',
                right: '4px'
            });

            ellipsisEl.textContent = '...';
            textContainerParent.appendChild(ellipsisEl);
        }
    }

}
