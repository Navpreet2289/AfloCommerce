import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { AfloCrudService } from './../services/aflo-crud.service';
import { CatalogSource } from './catalog-source.fields';

@Component({
  selector: 'aflocom-catalog-sources',
  templateUrl: './catalog-sources.component.html',
  styleUrls: ['./catalog-sources.component.css']
})
export class CatalogSourcesComponent implements OnInit {
  fields: Array<any>;
  no: any;
  constructor() { }

  ngOnInit() {
  	this.fields = CatalogSource.fields;
  	this.no = { add: true, export: true };
  }

}
