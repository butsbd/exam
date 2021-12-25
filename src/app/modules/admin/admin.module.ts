import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { CatalogModule } from './catalog/catalog.module';
import { DeleteDialogComponent } from './shared/components/delete-dialog/delete-dialog.component';
import { LogoutDialogComponent } from '../../core/shared/components/logout-dialog/logout-dialog.component';
import { SettingsComponent } from './settings/settings.component';
import { TranslateModule } from '@ngx-translate/core';
import { AboutComponent } from './about/about.component';
import { EventLogsComponent } from './event-logs/event-logs.component';
import { ResultComponent } from './result/result/result.component';
import { FormQuestionComponent } from './configuration/questions/form-question/form-question.component';
import { QuestionListComponent } from './configuration/questions/question-list/question-list.component';
import { InnerTableComponent } from './configuration/questions/question-list/inner-table/inner-table.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DeleteDialogComponent,
    LogoutDialogComponent,
    SettingsComponent,
    AboutComponent,
    EventLogsComponent,
    ResultComponent,
    FormQuestionComponent,
    QuestionListComponent,
    InnerTableComponent,
  
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    SharedModule,
    CatalogModule,
    TranslateModule
  ]
})
export class AdminModule { }
