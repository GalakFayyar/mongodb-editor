import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseprofileManageComponent } from './responseprofile-manage.component';

describe('ResponseProfileManageComponent', () => {
  let component: ResponseProfileManageComponent;
  let fixture: ComponentFixture<ResponseProfileManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResponseProfileManageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseProfileManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
