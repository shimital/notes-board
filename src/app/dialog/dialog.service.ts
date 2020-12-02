import {
    Injectable,
    ComponentFactoryResolver,
    ApplicationRef,
    Injector,
    EmbeddedViewRef,
    ComponentRef,
} from '@angular/core';
import { DialogComponent } from './dialog.component';
import { DialogOptions } from './dialog.model';
import { DialogModule } from './dialog.module';

@Injectable({
    providedIn: DialogModule,
})
export class DialogService {

    dialogComponentRef: ComponentRef<DialogComponent>;
    dialogElem: HTMLElement;

    private static readonly CLOSE_ANIMATION_DURATION = 200;

    constructor (
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) { }

    public open (options: DialogOptions) {
        this.appendDialogComponentToBody();

        Object.assign(this.dialogComponentRef.instance, {
            childComponentType: options.component,
            height: options.height,
            width: options.width,
            childInputs: options.inputs || {},
            childOutputs: options.outputs || {}
        });
    }

    close (): void {
        this.removeDialogComponent();
    }

    appendDialogComponentToBody () {
        const componentFactory =
            this.componentFactoryResolver.resolveComponentFactory(DialogComponent);

        const componentRef = componentFactory.create(this.injector);
        this.appRef.attachView(componentRef.hostView);

        this.dialogElem = (componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[ 0 ] as HTMLElement;

        document.body.appendChild(this.dialogElem);
        this.dialogElem.addEventListener('click', this.removeDialogComponent.bind(this));
        this.dialogComponentRef = componentRef;
    }

    private removeDialogComponent () {
        const dialogOverlayElement = <HTMLElement> this.dialogElem.querySelector('.overlay');
        dialogOverlayElement.style.opacity = '0';

        setTimeout(() => {
            this.dialogElem.removeEventListener('click', this.removeDialogComponent.bind(this));
            this.appRef.detachView(this.dialogComponentRef.hostView);
            this.dialogComponentRef.destroy();
        }, DialogService.CLOSE_ANIMATION_DURATION);
    }

}