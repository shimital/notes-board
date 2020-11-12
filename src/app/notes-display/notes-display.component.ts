import { Component, OnInit } from '@angular/core';
import { INote, NotesService } from '../notes.service';
import { MatDialog } from '@angular/material/dialog';
import { NewNoteFormComponent } from '../new-note-form/new-note-form.component';
import { UpdateNoteFormComponent } from '../update-note-form/update-note-form.component';
import { DeleteNoteConfirmComponent } from '../delete-note-confirm/delete-note-confirm.component';

@Component({
    selector: 'app-notes-display',
    templateUrl: './notes-display.component.html',
    styleUrls: [ './notes-display.component.scss' ]
})
export class NotesDisplayComponent implements OnInit {

    constructor (
        private readonly notesService: NotesService,
        private readonly matDialog: MatDialog
    ) { }

    notes: INote[] = [];

    ngOnInit (): void {
        this.notes = this.notesService.getNotes();
    }

    handleNoteClick (note: INote, index: number = 0): void {
        if (!note) {
            this.openNewNoteForm();
        } else {
            this.openUpdateNoteForm(note, index);
        }
    }

    handleNoteDelete (index: number): void {
        this.openConfirmDelete(index);
    }

    private openNewNoteForm (): void {
        const dialogRef = this.matDialog.open(NewNoteFormComponent, {
            width: '600px',
            height: '600px'
        });

        dialogRef.componentInstance
            .onNoteAdd.subscribe((note: INote) => {
                if (note.author) {
                    this.notesService.addNote(note);
                    this.notes = this.notesService.getNotes();
                }
            });

        dialogRef.afterClosed().subscribe(() => {
            dialogRef.componentInstance.onNoteAdd.unsubscribe();
        });
    }

    private openUpdateNoteForm (note: INote, index: number): void {
        const dialogRef = this.matDialog.open(UpdateNoteFormComponent, {
            width: '600px',
            height: '600px',
            data: {
                author: note.author,
                text: note.text
            }
        });

        const updateNoteSubscription = dialogRef.componentInstance
            .onNoteUpdate.subscribe((note: INote) => {
                if (note.text) {
                    this.notesService.updateNode(index, note);
                    this.notes = this.notesService.getNotes();
                }
            });

        dialogRef.afterClosed().subscribe(() => {
            dialogRef.componentInstance.onNoteUpdate.unsubscribe();
        });
    }

    private openConfirmDelete (index: number): void {
        const dialogRef = this.matDialog.open(DeleteNoteConfirmComponent, {
            width: '350px',
            height: '200px',
        });

        dialogRef.componentInstance.isDelete.subscribe((isDelete: boolean) => {
            if (isDelete) {
                this.notesService.deleteNote(index);
                this.notes = this.notesService.getNotes();
            }
        });

        dialogRef.afterClosed().subscribe(() => {
            dialogRef.componentInstance.isDelete.unsubscribe();
        });
    }

}
