import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyDealsPage } from './my-deals.page';

describe('MyDealsPage', () => {
  let component: MyDealsPage;
  let fixture: ComponentFixture<MyDealsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDealsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
