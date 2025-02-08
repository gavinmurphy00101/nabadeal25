import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddLocationMarkerDetailsPage } from './add-location-marker-details.page';

describe('AddLocationMarkerDetailsPage', () => {
  let component: AddLocationMarkerDetailsPage;
  let fixture: ComponentFixture<AddLocationMarkerDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLocationMarkerDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
