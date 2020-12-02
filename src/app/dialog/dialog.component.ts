import { Component, Type, OnDestroy, AfterViewInit, ComponentRef, ViewChild, ComponentFactoryResolver, ChangeDetectorRef, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { InsertionDirective } from './insertion.directive';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: [ './dialog.component.css' ],
})
export class DialogComponent implements AfterViewInit, OnDestroy {

    public childComponentRef: ComponentRef<any>;
    public childComponentType: Type<any>;

    private subscriptions: Subscription[] = [];

    @ViewChild(InsertionDirective) insertionPoint: InsertionDirective;

    constructor (
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly cd: ChangeDetectorRef) { }

    @Input() height: number;
    @Input() width: number;
    @Input() childInputs: { [ key: string ]: any; } = {};
    @Input() childOutputs: { [ key: string ]: Function; } = {};

    ngAfterViewInit () {
        this.loadChildComponent();
        this.cd.detectChanges();
    }

    ngOnDestroy () {
        if (this.childComponentRef) {
            this.destroyComponent();
        }
    }

    loadChildComponent () {
        let componentFactory =
            this.componentFactoryResolver.resolveComponentFactory(this.childComponentType);

        let viewContainerRef = this.insertionPoint.viewContainerRef;
        viewContainerRef.clear();
        this.childComponentRef = viewContainerRef.createComponent(componentFactory);

        Object.keys(this.childInputs).forEach((key: string) => {
            this.childComponentRef.instance[ key ] = this.childInputs[ key ];
        });

        Object.keys(this.childOutputs).forEach((key: any) => {
            this.subscriptions.push(
                this.childComponentRef.instance[ key ].subscribe((value) => {
                    this.childOutputs[ key ](value);
                })
            );
        });
    }

    private unsubscribeListeners (): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    private destroyComponent (): void {
        this.childComponentRef.destroy();
        this.unsubscribeListeners();
    }

}