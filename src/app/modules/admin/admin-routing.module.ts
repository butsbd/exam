import { SalesComponent } from './sales/sales.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { CatalogComponent } from './catalog/catalog.component';
import { PeopleComponent } from './people/people.component';
import { AboutComponent } from './about/about.component';
import { IdentityComponent } from './identity/identity.component';
import { PermissionGuard } from 'src/app/core/guards/permission.guard';
import { EventLogsComponent } from './event-logs/event-logs.component';
import { ResultComponent } from './result/result/result.component';
import { FormQuestionComponent } from './configuration/questions/form-question/form-question.component';
import { QuestionListComponent } from './configuration/questions/question-list/question-list.component';
import { ExamListComponent } from './configuration/exams/exam-list/exam-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'result',
    component: ResultComponent
  },
   {
    path: 'add-question',
    component: FormQuestionComponent
  },
  {
    path: 'list-question',
    component: QuestionListComponent
  },
  {
    path: 'list-exam',
    component: ExamListComponent
  },
  {
    path: 'identity',
    canActivate: [AuthGuard],
    component: IdentityComponent,
    loadChildren: () => import('./identity/identity.module').then(mod => mod.IdentityModule),
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'catalog',
    canActivate: [AuthGuard],
    component: CatalogComponent,
    loadChildren: () => import('./catalog/catalog.module').then(mod => mod.CatalogModule),
  },
  {
    path: 'event-logs',
    canActivate: [AuthGuard],
    component: EventLogsComponent,
    loadChildren: () => import('./event-logs/event-logs.module').then(mod => mod.ActivityLogsModule),
  },
  {
    path: 'people',
    canActivate: [AuthGuard],
    component: PeopleComponent,
    loadChildren: () => import('./people/people.module').then(mod => mod.PeopleModule),
  },
  {
    path: 'sales',
    canActivate: [AuthGuard],
    component: SalesComponent,
    loadChildren: () => import('./sales/sales.module').then(mod => mod.SalesModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
