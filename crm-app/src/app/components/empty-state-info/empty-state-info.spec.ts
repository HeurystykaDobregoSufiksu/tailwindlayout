import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyStateInfo } from './empty-state-info';

describe('EmptyStateInfo', () => {
  let component: EmptyStateInfo;
  let fixture: ComponentFixture<EmptyStateInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyStateInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyStateInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
