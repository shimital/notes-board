import { Component, OnInit } from '@angular/core';
import { INote, NotesService } from '../notes.service';
import { NewNoteFormComponent } from '../new-note-form/new-note-form.component';
import { UpdateNoteFormComponent } from '../update-note-form/update-note-form.component';
import { DeleteNoteConfirmComponent } from '../delete-note-confirm/delete-note-confirm.component';
import { DialogService } from '../dialog/dialog.service';

@Component({
    selector: 'app-notes-display',
    templateUrl: './notes-display.component.html',
    styleUrls: [ './notes-display.component.scss' ]
})
export class NotesDisplayComponent implements OnInit {

    constructor (
        private readonly notesService: NotesService,
        private readonly dialogService: DialogService
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
        const dialogRef = this.dialogService.open({
            component: NewNoteFormComponent,
            width: 600,
            height: 600,
            outputs: {
                onClose: () => {
                    this.dialogService.close();
                },
                onNoteAdd: (note: INote) => {
                    this.notesService.addNote(note);
                    this.notes = this.notesService.getNotes();
                    this.dialogService.close();
                }
            }
        });
    }

    private openUpdateNoteForm (note: INote, index: number): void {
        const dialogRef = this.dialogService.open({
            component: UpdateNoteFormComponent,
            width: 600,
            height: 600,
            inputs: {
                author: note.author,
                text: note.text
            },
            outputs: {
                onClose: () => {
                    this.dialogService.close();
                },
                onNoteUpdate: (note: INote) => {
                    this.notesService.updateNode(index, note);
                    this.notes = this.notesService.getNotes();
                    this.dialogService.close();
                }
            }
        });
    }

    private openConfirmDelete (index: number): void {
        const dialogRef = this.dialogService.open({
            component: DeleteNoteConfirmComponent,
            width: 350,
            height: 200,
            outputs: {
                onClose: () => {
                    this.dialogService.close();
                },
                onDelete: () => {
                    this.notesService.deleteNote(index);
                    this.notes = this.notesService.getNotes();
                    this.dialogService.close();
                }
            }
        });
    }

}
