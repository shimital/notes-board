import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class BoardGuard implements CanActivate {

    constructor (
        private readonly auth: AuthService,
        private readonly router: Router
    ) {
    }

    canActivate (
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (this.auth.isUserLogedIn()) {
            return true;
        }

        this.router.navigate([ '' ]);

        return false;
    }

}