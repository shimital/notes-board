import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-delete-note-confirm',
    templateUrl: './delete-note-confirm.component.html',
    styleUrls: [ './delete-note-confirm.component.scss' ]
})
export class DeleteNoteConfirmComponent {

    constructor () { }

    @Output() onDelete = new EventEmitter();
    @Output() onClose = new EventEmitter();

    close (): void {
        this.onClose.emit();
    }

    delete (): void {
        this.onDelete.emit();
    }

}
