import { Component, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-new-note-form',
    templateUrl: './new-note-form.component.html',
    styleUrls: [ './new-note-form.component.scss' ]
})
export class NewNoteFormComponent {

    constructor (private dialogRef: MatDialogRef<NewNoteFormComponent>) { }

    author: string = '';
    text: string = '';

    onNoteAdd = new EventEmitter();

    private pastelColors = [
        '#FDDFDF',
        '#FCF7DE',
        '#DEFDE0',
        '#DEF3FD',
        '#F0DEFD'
    ];

    addNote (): void {
        const note = {
            author: this.author,
            text: this.text,
            date: new Date().toUTCString(),
            background: this.getColor()
        };

        this.onNoteAdd.emit(note);
        this.dialogRef.close();
    }

    closeModal (): void {
        this.dialogRef.close();
    }

    private getColor (): string {
        const index = Math.round(Math.random() * 100) % 5;

        return this.pastelColors[ index ];
    }

}
