import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamCountdownTimerComponent } from './exam-countdown-timer.component';

describe('ExamCountdownTimerComponent', () => {
  let component: ExamCountdownTimerComponent;
  let fixture: ComponentFixture<ExamCountdownTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamCountdownTimerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamCountdownTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
