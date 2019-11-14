import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseProfileManagerComponent } from './responseprofile-manager.component';

describe('ResponseProfileManageComponent', () => {
  let component: ResponseProfileManagerComponent;
  let fixture: ComponentFixture<ResponseProfileManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResponseProfileManagerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseProfileManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
