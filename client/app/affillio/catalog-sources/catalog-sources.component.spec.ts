import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogSourcesComponent } from './catalog-sources.component';

describe('CatalogSourcesComponent', () => {
  let component: CatalogSourcesComponent;
  let fixture: ComponentFixture<CatalogSourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogSourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogSourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
