import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { AuthService } from './../../shared/services/auth.service';
import { MdSnackBar } from '@angular/material';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AfloCrudService } from './../services/aflo-crud.service';
import { Subscription } from 'rxjs';
import { URLSearchParams, Http } from '@angular/http';
import * as _ from 'lodash';

@Component({
  selector: 'aflocom-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cards: Array<any>;
  partners: Array<any> = [];
  partner: any;
  q: any;
  busy: Subscription;
  meta: any = { skip: 0, limit: 10 };
  searchParam: string;
  gauges: Array<any>;
  constructor(public auth: AuthService, private snack:MdSnackBar, private crud: AfloCrudService, private http: Http, private route: ActivatedRoute, private router: Router) {

   }

  ngOnInit() {
  	this.q = {};
  	this.getPartners();

    this.gauges = [
        { name: 'Partners', bgImage: 'ico_partners', cnt: 22, bgColor:'green'},
        { name: 'Catalog Sources', bgImage: 'ico_catalog_sources', cnt: 120, bgColor:'darkBlue'},
        { name: 'Suggested Goods', bgImage: 'ico_suggested_goods', cnt: 1174, bgColor:'red'}
    ];
  }
  isLargeScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width > 1024) {
      return true;
    } else {
      return false;
    }
  }
  getPartners(q?: any, scrolled?: boolean) {
    q = q || {};
    let params = new URLSearchParams();
    params.set('limit', '10');
    q.limit ? params.set('limit', q.limit) : params.set('limit', '10');
   	q.skip ? params.set('skip', q.skip) : params.set('skip', '0');
    if (this.meta.sort) { params.set('sort', this.meta.sort); };
    if (q.where) params.set('where', JSON.stringify(q.where));
    if (q.search) params.set('search', JSON.stringify(q.search));
    if (this.meta.busy || this.meta.end)
      return;
    this.meta.busy = true;
    this.busy = this.crud.get('partners', params).subscribe(data => {
      this.meta.busy = false;
      this.meta.skip = data.length + this.meta.skip || 0;
      this.meta.end = (data.length >= 5) ? false : true;
      this.partners = scrolled ? this.partners.concat(data) : data;
    }, error => { this.meta.busy = false; this.snack.open(<any>error, 'OK', { duration: 2000 }) });
  }

}
