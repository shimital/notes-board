import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesDisplayComponent } from './notes-display/notes-display.component';
import { NoteComponent } from './note/note.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { NewNoteFormComponent } from './new-note-form/new-note-form.component';
import { FormsModule } from '@angular/forms';
import { UpdateNoteFormComponent } from './update-note-form/update-note-form.component';
import { DeleteNoteConfirmComponent } from './delete-note-confirm/delete-note-confirm.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
        AppComponent,
        NotesDisplayComponent,
        NoteComponent,
        NewNoteFormComponent,
        UpdateNoteFormComponent,
        DeleteNoteConfirmComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatDialogModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
