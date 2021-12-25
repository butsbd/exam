import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/core/guards/canDeactivate.guard';
import { QuestionsComponent } from './components/questions/questions.component';
import { ResultsComponent } from './components/results/results.component';
import { ExamComponent } from './exam.component';

const routes: Routes = [
  {
    path: ':candidateid',
    component: ExamComponent
  },
  { path: 'startExam/:examid', component: QuestionsComponent },
  { path: 'result', component: ResultsComponent,canDeactivate:[CanDeactivateGuard] },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule { }
