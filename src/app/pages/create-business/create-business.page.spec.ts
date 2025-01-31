import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateBusinessPage } from './create-business.page';

describe('CreateBusinessPage', () => {
  let component: CreateBusinessPage;
  let fixture: ComponentFixture<CreateBusinessPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBusinessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
