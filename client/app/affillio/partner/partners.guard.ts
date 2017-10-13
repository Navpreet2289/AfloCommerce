import { ModalService } from './../../modal/modal.service';
import { AfloCrudService } from './../services/aflo-crud.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PartnersGuard implements CanActivate {
    constructor(private router: Router, private crud: AfloCrudService, private modal: ModalService) { }
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.crud.get('partners', null, true)
            .map(e => { if (e) { return true; } }).catch(() => {
                // this.router.navigate(['/account/login', { returnUrl: '/admin/users' }]);
                this.modal.login().subscribe();
                return Observable.of(false);
            });
    }
}