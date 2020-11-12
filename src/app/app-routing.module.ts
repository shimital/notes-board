import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardGuard } from './board.guard';
import { LoginComponent } from './login/login.component';
import { NotesDisplayComponent } from './notes-display/notes-display.component';


const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'board',
        component: NotesDisplayComponent,
        canActivate: [ BoardGuard ]
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
