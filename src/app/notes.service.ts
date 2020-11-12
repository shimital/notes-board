import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NotesService {

    constructor () { }

    getNotes (): INote[] {
        const sessionNotes = sessionStorage.getItem('notes');

        if (!sessionNotes) {
            return [];
        }

        const notes = JSON.parse(sessionNotes);

        return notes.sort((n1: INote, n2: INote) => {
            return new Date(n2.date).getTime() - new Date(n1.date).getTime();
        });
    }

    addNote (note: INote): void {
        const storageNotes = sessionStorage.getItem('notes');
        let notes: INote[] = storageNotes ? JSON.parse(storageNotes) : [];
        notes = [ note, ...notes ];
        sessionStorage.setItem('notes', JSON.stringify(notes));
    }

    updateNode (index: number, note: Partial<INote>): void {
        const storageNotes = sessionStorage.getItem('notes');
        let notes: INote[] = JSON.parse(storageNotes);
        let noteToUpdate = notes.splice(index, 1)[ 0 ];

        noteToUpdate = {
            ...noteToUpdate,
            ...note
        };

        notes = [ noteToUpdate, ...notes ];
        sessionStorage.setItem('notes', JSON.stringify(notes));
    }

    deleteNote (index: number): void {
        const storageNotes = sessionStorage.getItem('notes');

        if (storageNotes) {
            let notes: INote[] = JSON.parse(storageNotes);
            notes.splice(index, 1);
            sessionStorage.setItem('notes', JSON.stringify(notes));
        }
    }
}

export interface INote {
    text: string;
    author: string;
    date: Date;
    color: string;
}
