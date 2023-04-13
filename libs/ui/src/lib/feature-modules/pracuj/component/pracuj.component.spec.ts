import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracujComponent } from './pracuj.component';

describe('PracujComponent', () => {
  let component: PracujComponent;
  let fixture: ComponentFixture<PracujComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PracujComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PracujComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
