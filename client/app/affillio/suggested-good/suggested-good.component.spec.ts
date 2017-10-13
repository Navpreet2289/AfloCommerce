import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedGoodComponent } from './suggested-good.component';

describe('SuggestedGoodComponent', () => {
  let component: SuggestedGoodComponent;
  let fixture: ComponentFixture<SuggestedGoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestedGoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedGoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
