import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Http, RequestOptions } from '@angular/http';
import { AfloNavComponent } from './universal/nav/aflo-nav.component';
import { PartnersComponent } from './partner/partners.component';
import { PartnerResolve } from './partner/partner.resolve';
import { PartnerGuard } from './partner/partner.guard';
import { PartnersGuard } from './partner/partners.guard';
import { PartnerDetailComponent } from './partner/partner-detail/partner-detail.component';
import { PartnerCatalogSourcesComponent } from './partner/catalog-sources/partner-catalog-sources.component';
import { SuggestedGoodComponent } from './suggested-good/suggested-good.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TreeModule } from 'angular-tree-component';
import { MdInputModule, MdMenuModule, MdCardModule, MdSlideToggleModule, MdChipsModule, MdSelectModule, MdButtonModule, MdIconModule, MdSnackBarModule, MdProgressBarModule, MdProgressSpinnerModule, MdButtonToggleModule, MdTabsModule, MdCheckboxModule, MdDatepickerModule, MdNativeDateModule, MdGridListModule } from '@angular/material';
import { AfloCrudService } from './services/aflo-crud.service';
import { CrudHelper } from './services/crud.helper';
import { ListComponent } from './universal/list/list.component';
import { ExportComponent } from './universal/export/export.component';
import { LabelcasePipe } from './universal/pipes/labelcase.pipe';
import { UniquePipe } from './universal/pipes/unique.pipe';
import { FilterPipe, ObjectFilterPipe } from './universal/pipes/filter.pipe';
import { DashboardFilterPipe } from './universal/pipes/dashboardFilter.pipe';
import { SearchPipe } from './universal/pipes/search.pipe';
import { PluralizePipe } from './universal/pipes/pluralize.pipe';
import { EditComponent } from './universal/edit/edit.component';
import { MediaLibraryModal } from './universal/media/media-library';
//import { MediaComponent } from './universal/media/media.component';
import { BusyModule } from 'angular2-busy';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FileUploadModule } from 'ng2-file-upload';
import { SingleFileUploadModal } from './universal/media/modal-single';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { SubmitButtonComponent } from './universal/submit-button/submit-button.component';


const affRoutes: Routes = [
  {
    path: '', 
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard', 
    component: DashboardComponent,
    data: { title: 'Affillio Task Manager' }
  },
  {
    path: 'partners', 
    component: PartnersComponent,
    canActivate: [PartnersGuard],
    data: { title: 'Partner Sources' }
  },
  {
    path: 'partners/:id', component: PartnerDetailComponent,
    resolve: { partner: PartnerResolve }, canActivate: [PartnerGuard],
    data: { title: 'Add/Edit Partners' }
  },
  {
    path: 'goods', 
    component: SuggestedGoodComponent,
    data: { title: 'Suggested Goods' }
  }

];

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(affRoutes), FlexLayoutModule, TreeModule, BusyModule, FormsModule, ReactiveFormsModule, InfiniteScrollModule, FileUploadModule,
    MdInputModule, MdMenuModule, MdCardModule, MdSlideToggleModule, MdSelectModule, MdButtonModule, MdIconModule, MdSnackBarModule, MdProgressBarModule, MdProgressSpinnerModule, MdButtonToggleModule, MdTabsModule, MdCheckboxModule, MdDatepickerModule, MdNativeDateModule, MdChipsModule, MdGridListModule
  ],
  exports: [AfloNavComponent, ListComponent, ExportComponent, FilterPipe, ObjectFilterPipe, DashboardFilterPipe, PluralizePipe, SearchPipe, LabelcasePipe, UniquePipe, EditComponent, SubmitButtonComponent],
  declarations: [PartnerCatalogSourcesComponent, AfloNavComponent, PartnersComponent, PartnerDetailComponent, SuggestedGoodComponent, DashboardComponent, ListComponent, ExportComponent, FilterPipe, ObjectFilterPipe, DashboardFilterPipe, PluralizePipe, SearchPipe, LabelcasePipe, UniquePipe, EditComponent, SubmitButtonComponent, MediaLibraryModal, SingleFileUploadModal],
  providers:[AfloCrudService, CrudHelper, PartnerResolve, PartnerGuard, PartnersGuard, AuthService, UserService ],
  entryComponents: [SingleFileUploadModal, MediaLibraryModal]
})
export class AffillioModule { }
