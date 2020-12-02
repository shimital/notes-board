import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-new-note-form',
    templateUrl: './new-note-form.component.html',
    styleUrls: [ './new-note-form.component.scss' ]
})
export class NewNoteFormComponent {

    constructor () { }

    @Output() onNoteAdd = new EventEmitter();
    @Output() onClose = new EventEmitter();

    author: string = '';
    text: string = '';

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
    }

    close (): void {
        this.onClose.emit();
    }

    private getColor (): string {
        const index = Math.round(Math.random() * 100) % 5;

        return this.pastelColors[ index ];
    }

}
