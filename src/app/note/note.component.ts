import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-note',
    templateUrl: './note.component.html',
    styleUrls: [ './note.component.scss' ]
})
export class NoteComponent {

    constructor () { }

    @Input() text: string;
    @Input() author: string;
    @Input() background: string;

    @Output() onNoteClick = new EventEmitter();
    @Output() onNoteDelete = new EventEmitter();

    onClick (): void {
        let note = null;

        if (this.author) {
            note = {
                author: this.author,
                text: this.text
            };
        }

        this.onNoteClick.emit(note);
    }

    onDelete (event: Event): void {
        this.onNoteDelete.emit();
        event.preventDefault();
        event.cancelBubble = true;
    }


}
