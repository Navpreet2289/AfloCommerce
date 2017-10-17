import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedGoodsComponent } from './suggested-goods.component';

describe('SuggestedGoodsComponent', () => {
  let component: SuggestedGoodsComponent;
  let fixture: ComponentFixture<SuggestedGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestedGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
