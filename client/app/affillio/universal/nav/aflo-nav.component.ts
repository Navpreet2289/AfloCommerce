import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
    selector: 'aflo-nav',
    templateUrl: './aflo-nav.component.html',
    styleUrls: ['aflo-nav.component.css'],
})
export class AfloNavComponent implements OnInit {
    affLinks: Array<any> = [];
    selected_url: string;
    constructor(private route: ActivatedRoute, private router: Router) {
     
    }

    ngOnInit() {
        this.affLinks = [
            { name: 'Partners', url: 'affillio/partners', icon: 'people'},
            { name: 'Sources', url: 'affillio/sources', icon: 'pages'},
            { name: 'Suggested Goods', url: 'affillio/goods', icon: 'whatshot'},
        ];

    }


    showResource(affLink?: any) {
      //this.selected_url = url;
      console.log("AFLO NAVIGATION >>  ", affLink.url);
      this.router.navigateByUrl(affLink.url);
  }
    
}