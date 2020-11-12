import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor () { }

    private readonly singletonUser = {
        username: 'smith',
        password: '1234'
    };

    checkAndDoLogin (username: string, password: string): boolean {
        if (this.singletonUser.username === username &&
            this.singletonUser.password === password) {

            // if the user was stored in a backend, we would encrypt its password , before storing it
            sessionStorage.setItem('user', JSON.stringify(this.singletonUser));

            return true;
        }

        return false;
    }

    isUserLogedIn (): boolean {
        let userRep: string = sessionStorage.getItem('user');

        if (!userRep) {
            return false;
        }

        // if the user was stored in a backend, we would decrypt the password after fetching it from db
        let user = JSON.parse(userRep);

        if (user.username === this.singletonUser.username &&
            user.password === this.singletonUser.password) {
            return true;
        }

        return false;
    }
}
