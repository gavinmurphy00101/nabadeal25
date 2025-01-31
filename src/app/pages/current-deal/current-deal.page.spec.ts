import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentDealPage } from './current-deal.page';

describe('CurrentDealPage', () => {
  let component: CurrentDealPage;
  let fixture: ComponentFixture<CurrentDealPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentDealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
