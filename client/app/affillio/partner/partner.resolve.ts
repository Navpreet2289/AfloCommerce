import { AfloCrudService } from './../services/aflo-crud.service';
import { MdSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable()
export class PartnerResolve implements Resolve<any> {

  constructor(private crud: AfloCrudService, private router: Router, private snack: MdSnackBar) { }

  resolve(route: ActivatedRouteSnapshot) {
    let id = route.params['id'];
    //return (id === 'add' || id === 'new') ? undefined : this.crud.getOne('partners', id, true);
    return (id === 'add' || id === 'new') ? {} : this.crud.getOne('partners', id);
  }
}