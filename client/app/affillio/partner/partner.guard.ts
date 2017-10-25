import { AfloCrudService } from './../services/aflo-crud.service';
import { PartnerService } from './partnter.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PartnerGuard implements CanActivate {
    constructor(private router: Router, private crud: AfloCrudService) { }
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let id = route.params['id'];
        return (id === 'add' || id === 'new') ? true : this.crud.getOne('partners/deep', id)
            .map(e => {
                if (e) { return true; }
            }).catch((err) => {
                console.log("GUARD ERROR MESSAGE >> ", err);
                this.router.navigate(['/affillio/partners']);
                return Observable.of(false);
            });
    }
}