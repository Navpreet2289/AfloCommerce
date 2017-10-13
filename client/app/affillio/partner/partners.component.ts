import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { AfloCrudService } from './../services/aflo-crud.service';
import { partner } from './partner.fields';

@Component({
  selector: 'aflocom-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})

export class PartnersComponent implements OnInit {
  fields: Array<any>;
  constructor() { 
  	this.fields = partner.fields;
  	//console.log("PartnerComponent Ouput >>  ", JSON.stringify(partner.fields));
  }

  ngOnInit() {

  }

}
