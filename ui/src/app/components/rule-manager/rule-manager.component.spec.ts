import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleManagerComponent } from './rule-manager.component';

describe('ResponseProfileManageComponent', () => {
  let component: RuleManagerComponent;
  let fixture: ComponentFixture<RuleManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RuleManagerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
