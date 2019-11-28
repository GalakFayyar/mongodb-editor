import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverterManagerComponent } from './converter-manager.component';

describe('ConverterManagerComponent', () => {
  let component: ConverterManagerComponent;
  let fixture: ComponentFixture<ConverterManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConverterManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConverterManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
