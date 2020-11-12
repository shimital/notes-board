import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-delete-note-confirm',
    templateUrl: './delete-note-confirm.component.html',
    styleUrls: [ './delete-note-confirm.component.scss' ]
})
export class DeleteNoteConfirmComponent implements OnInit {

    constructor (private dialogRef: MatDialogRef<DeleteNoteConfirmComponent>) { }

    isDelete = new EventEmitter();

    ngOnInit (): void {
    }

    closeDialog (confirmDelete: boolean): void {
        this.isDelete.emit(confirmDelete);
        this.dialogRef.close();
    }

}
