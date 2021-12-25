import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/material/material.module';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ExamComponent } from './exam.component';
import { ExamRoutingModule } from './exam-routing.module';
import { MatCardModule } from '@angular/material/card';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { ResultsComponent } from './components/results/results.component';
import { ExamCountdownTimerComponent } from './components/exam-countdown-timer/exam-countdown-timer.component';
import { ExamToolbarComponent } from './components/exam-toolbar/exam-toolbar.component';

@NgModule({
  declarations: [
    ExamComponent,
    QuestionFormComponent,
    QuestionsComponent,
    ResultsComponent,
    ExamCountdownTimerComponent,
    ExamToolbarComponent,
    
  ],
  imports: [
    CommonModule,
    ExamRoutingModule,
    MatCardModule,
    MaterialModule,
    SharedModule,
    TranslateModule,
    NgxSkeletonLoaderModule
  ]
})
export class ExamModule { }
