import { Component, EventEmitter, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-update-note-form',
    templateUrl: './update-note-form.component.html',
    styleUrls: [ './update-note-form.component.scss' ]
})
export class UpdateNoteFormComponent {

    constructor (
        private dialogRef: MatDialogRef<UpdateNoteFormComponent>,
        @Inject(MAT_DIALOG_DATA) private data: DialogData
    ) { }

    author: string = '';
    text: string = '';
    isEdit = false;
    isDirty = false;

    @ViewChild('textAreaInput') textArea: ElementRef;

    onNoteUpdate = new EventEmitter();

    ngOnInit (): void {
        this.author = this.data.author;
        this.text = this.data.text;
    }

    updateNote (): void {
        const note = {
            author: this.author,
            text: this.text,
            date: new Date().toUTCString()
        };

        this.onNoteUpdate.emit(note);
        this.dialogRef.close();
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

    closeModal (): void {
        this.dialogRef.close();
    }

    onTextChange (): void {
        this.isDirty = true;
    }

}

interface DialogData {
    [ key: string ]: any;
}
