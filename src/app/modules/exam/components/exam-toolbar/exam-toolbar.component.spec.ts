import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamToolbarComponent } from './exam-toolbar.component';

describe('ExamToolbarComponent', () => {
  let component: ExamToolbarComponent;
  let fixture: ComponentFixture<ExamToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
