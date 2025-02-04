import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerFacingBusinessProfilePage } from './customer-facing-business-profile.page';

describe('CustomerFacingBusinessProfilePage', () => {
  let component: CustomerFacingBusinessProfilePage;
  let fixture: ComponentFixture<CustomerFacingBusinessProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFacingBusinessProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
