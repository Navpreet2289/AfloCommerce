import { ActivatedRoute, Router } from '@angular/router';
import { AfloCrudService } from './../../services/aflo-crud.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { MdSnackBar, MdDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import { MediaLibraryModal } from './../../universal/media/media-library';

@Component({
  selector: 'aflocom-partner-detail',
  templateUrl: './partner-detail.component.html',
  styleUrls: ['./partner-detail.component.scss']
})
export class PartnerDetailComponent implements OnInit {
  partner: any;
  fields: any;
  header: string;
  busy: Subscription;
  partnerForm: FormGroup;
  catalogSources: Array<any>;
  errMessage: string;
  constructor(private crud: AfloCrudService, private route: ActivatedRoute, private router: Router, @Inject(FormBuilder) private _fb: FormBuilder, private snack: MdSnackBar, public dialog: MdDialog) {
    this.partner = {};
    this.catalogSources = [];
   }

  ngOnInit() {
    this.crud.get('catalog-sources').subscribe(data => this.catalogSources = data, this.handleError);
    this.partner = this.route.snapshot.data['partner'];
    let id = this.route.snapshot.params['id'];
    this.header = (id === 'add' || id === 'new') ? "Add New Partner" : "Edit Partner - " + id;
    this.partnerForm = this._fb.group({
      companyName: [this.partner.companyName, [Validators.required]],
      description: [this.partner.description, []],
      avatar: [this.partner.avatar, []],
      city: [this.partner.city, []],
      state: [this.partner.state, []],
      country: [this.partner.country, []],
      catalogSources: this._fb.array([])
    });

    console.log("init Partner Detail Inspection >>", JSON.stringify(this.partner));
    this.addCatalogSource(this.partner.catalogSources);
  }

  initCatalogSource(a?: any) {
    return this._fb.group({ title: [a.title], sourcePath: [a.sourcePath] });
  }

  addCatalogSource(a?: any) {
    const control = <FormArray>this.partnerForm.get('catalogSources');
    //console.log("addCatalogSource >>", control);
    if (!a) {
      const addrCtrl = this.initCatalogSource({});
      control.push(addrCtrl);
    } else {
      a.forEach(element => {
        const addrCtrl = this.initCatalogSource(element);
        control.push(addrCtrl);
      });
    }
  }

  removeCatalogSource(a: number) {
    const control = <FormArray>this.partnerForm.get('catalogSources');
    control.removeAt(a);
  }

  handleError(error) {
    this.snack.open(<any>error, 'OK', { duration: 2000 });
  }

  save(data) {
    if (!data) { return; }
    delete data['_id'];
    let id = this.route.snapshot.params['id'];
    if (id === 'add' || id === 'new') {
      this.busy = this.crud.post('partners', data).subscribe(data => this.router.navigateByUrl("/affillio/partners"), err => this.snack.open(err, 'OK', { duration: 2000 }));
    } else {
      this.busy = this.crud.patch('partners', id, data).subscribe(data => this.router.navigateByUrl("/affillio/partners"), err => this.snack.open(err, 'OK', { duration: 2000 }));
    }
  }

  chooseImage() {
    let dialogRef = this.dialog.open(MediaLibraryModal, {
      width: '80%',
      height: '80%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.partnerForm.controls['avatar'].setValue(result);
      }
    });
  }

}
