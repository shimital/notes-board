import { AfterViewInit, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appEllipsis]'
})
export class EllipsisDirective implements AfterViewInit {

    private ellipsisEl: HTMLElement;
    private textContainer: HTMLElement;

    constructor (private readonly el: ElementRef) {
    }

    ngAfterViewInit (): void {
        this.textContainer = <HTMLElement> this.el.nativeElement;
        this.checkAndAddEllipsis();
    }

    @HostListener('window:resize') checkAndAddEllipsis (): void {
        this.resetTextContainer();
        const textContainerHeight = this.textContainer.clientHeight;
        const textContainerParent = this.textContainer.parentElement;
        const textContainerParentHeight = textContainerParent.clientHeight;

        if (textContainerHeight > textContainerParentHeight) {
            this.normalizeTextContainer();

            if (this.ellipsisEl) {
                return;
            }

            const ellipsisEl = document.createElement('span');

            Object.assign(ellipsisEl.style, {
                position: 'absolute',
                bottom: '10px',
                right: '6px'
            });

            ellipsisEl.textContent = '...';
            this.ellipsisEl = ellipsisEl;
            textContainerParent.appendChild(this.ellipsisEl);
        } else if (this.ellipsisEl) {
            this.ellipsisEl.remove();
            this.ellipsisEl = null;
        }
    }

    private resetTextContainer (): void {
        this.textContainer.style.height = 'auto';
        this.textContainer.style.overflow = 'auto';
    }

    private normalizeTextContainer (): void {
        this.textContainer.style.height = '100%';
        this.textContainer.style.overflow = 'hidden';
    }

}
