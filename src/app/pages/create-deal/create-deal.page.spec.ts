import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateDealPage } from './create-deal.page';

describe('CreateDealPage', () => {
  let component: CreateDealPage;
  let fixture: ComponentFixture<CreateDealPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
