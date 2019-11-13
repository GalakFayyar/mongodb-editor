import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseprofileEditComponent } from './responseprofile-edit.component';

describe('ResponseprofileEditComponent', () => {
  let component: ResponseprofileEditComponent;
  let fixture: ComponentFixture<ResponseprofileEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResponseprofileEditComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseprofileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
