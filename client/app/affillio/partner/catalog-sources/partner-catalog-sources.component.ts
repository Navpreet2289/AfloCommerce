import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'partner-catalog-sources',
  templateUrl: './partner-catalog-sources.component.html',
  styleUrls: ['./partner-catalog-sources.component.css']
})
export class PartnerCatalogSourcesComponent implements OnInit {
  @Input() catalogSources: any = [];
  @Input('group')
  public catalogSourcesForm: FormGroup;
  constructor() { }
  ngOnInit() {
  }
  err(err) {
    console.log(err);
  }
}