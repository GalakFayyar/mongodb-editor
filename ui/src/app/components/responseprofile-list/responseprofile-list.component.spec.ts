import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseprofileListComponent } from './responseprofile-list.component';

describe('ResponseprofileListComponent', () => {
  let component: ResponseprofileListComponent;
  let fixture: ComponentFixture<ResponseprofileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResponseprofileListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseprofileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
