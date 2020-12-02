import { Component, EventEmitter, ViewChild, ElementRef, Input, Output } from '@angular/core';

@Component({
    selector: 'app-update-note-form',
    templateUrl: './update-note-form.component.html',
    styleUrls: [ './update-note-form.component.scss' ]
})
export class UpdateNoteFormComponent {

    constructor () { }

    @Input() author: string;
    @Input() text: string;

    @Output() onNoteUpdate = new EventEmitter();
    @Output() onClose = new EventEmitter();

    isEdit = false;
    isDirty = false;

    @ViewChild('textAreaInput') textArea: ElementRef;

    ngOnInit (): void {
    }

    updateNote (): void {
        const note = {
            author: this.author,
            text: this.text,
            date: new Date().toUTCString()
        };

        this.onNoteUpdate.emit(note);
    }

    switchToEditMode (): void {
        this.isEdit = true;

        setTimeout(() => {
            this.textArea.nativeElement.focus();
        });
    }

    onBlur (): void {
        this.isEdit = false;
    }

    close (): void {
        this.onClose.emit();
    }

    onTextChange (): void {
        this.isDirty = true;
    }

}

interface DialogData {
    [ key: string ]: any;
}
