import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NotesDisplayComponent } from './notes-display/notes-display.component';
import { NoteComponent } from './note/note.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewNoteFormComponent } from './new-note-form/new-note-form.component';
import { FormsModule } from '@angular/forms';
import { UpdateNoteFormComponent } from './update-note-form/update-note-form.component';
import { DeleteNoteConfirmComponent } from './delete-note-confirm/delete-note-confirm.component';
import { DialogModule } from './dialog/dialog.module';
import { EllipsisDirective } from './ellipsis.directive';

@NgModule({
    declarations: [
        AppComponent,
        NotesDisplayComponent,
        NoteComponent,
        NewNoteFormComponent,
        UpdateNoteFormComponent,
        DeleteNoteConfirmComponent,
        EllipsisDirective
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        DialogModule
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
