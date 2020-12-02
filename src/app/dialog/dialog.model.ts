import { Type } from '@angular/core';

export interface DialogOptions {
    component: Type<any>;
    height: number;
    width: number;
    inputs?: { [ key: string ]: any; };
    outputs?: { [ key: string ]: Function; };
}