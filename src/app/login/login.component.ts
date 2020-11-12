import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ]
})
export class LoginComponent {

    constructor (
        private readonly auth: AuthService,
        private readonly router: Router
    ) { }

    username: string = '';
    password: string = '';

    isError: boolean = false;

    login (): void {
        if (this.auth.checkAndDoLogin(this.username, this.password)) {
            this.router.navigate([ 'board' ]);
        } else {
            this.isError = true;
        }
    }

}
