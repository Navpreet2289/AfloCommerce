import { AfloCrudService } from './../services/aflo-crud.service';
import { AuthService } from './../services/auth.service';
import { ModalService } from './../../modal/modal.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DashboardGuard implements CanActivate {
    constructor(private router: Router, private crud: AfloCrudService, private auth: AuthService, private modal: ModalService) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        
        if(this.auth.hasRole('admin')){
        	console.log("SHOULD BE ADMIN >> ", this.auth);
            return true;
        } 

        console.log("NOT ADMIN >> ", this.auth);
        this.modal.login().subscribe((result: any) => {
					     //    if(result){
					     //    	this.router.navigate('./admin');
					    	// }else{
					    	// 	this.router.navigate('/');
					    	// }
					      });

        return Observable.of(false);
    }
}