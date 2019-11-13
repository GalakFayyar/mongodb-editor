import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseprofileCreateComponent } from './responseprofile-create.component';

describe('ResponseprofileCreateComponent', () => {
  let component: ResponseprofileCreateComponent;
  let fixture: ComponentFixture<ResponseprofileCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResponseprofileCreateComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseprofileCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
