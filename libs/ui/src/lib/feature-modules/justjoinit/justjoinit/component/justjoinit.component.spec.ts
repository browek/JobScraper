import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustjoinitComponent } from './justjoinit.component';

describe('JustjoinitComponent', () => {
  let component: JustjoinitComponent;
  let fixture: ComponentFixture<JustjoinitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JustjoinitComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JustjoinitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
