import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KampaniaCardHeader } from './kampania-card-header';

describe('KampaniaCardHeader', () => {
  let component: KampaniaCardHeader;
  let fixture: ComponentFixture<KampaniaCardHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KampaniaCardHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KampaniaCardHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
