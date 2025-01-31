import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasboardMapPage } from './dasboard-map.page';

describe('DasboardMapPage', () => {
  let component: DasboardMapPage;
  let fixture: ComponentFixture<DasboardMapPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DasboardMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
