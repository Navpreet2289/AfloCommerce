import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { AfloCrudService } from './../services/aflo-crud.service';
import { SuggestedGood } from './suggested-good.fields';

@Component({
  selector: 'aflocom-suggested-goods',
  templateUrl: './suggested-goods.component.html',
  styleUrls: ['./suggested-goods.component.css']
})
export class SuggestedGoodsComponent implements OnInit {
  fields: Array<any>;
  no: any;
  constructor() { }

  ngOnInit() {
  	this.fields = SuggestedGood.fields;
  	this.no = { add: true, export: true };
  }

}
