import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { TableColumn } from 'src/app/core/shared/components/table/table-column';
import { environment } from 'src/environments/environment';
import { BaseRequestModel } from '../../models/baseRequestModel';
import { ExamFormComponent } from './exam-form/exam-form.component';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  dataSource: any;
  examColumns: TableColumn[];
  requestModel = new BaseRequestModel();

  constructor(
    public http: HttpClient,
    public dialog: MatDialog,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getExams();
    this.initColumns();
  }

  getExams(): void {
     this.http.post<any>(environment.apiUrl + 'Exam/search', this.requestModel).subscribe(res=>{
      this.dataSource=res?.data
    });;
  }
 pageChanged(event: any): void {
   this.requestModel.page=event.pageIndex
   this.requestModel.rowsPerPage=event.pageSize
    this.getExams();
  }


  initColumns(): void {
    this.examColumns = [
      { name: 'Code', dataKey: 'code', isSortable: false, isShowable: true },
       { name: 'Set', dataKey: 'examCode', isSortable: false, isShowable: true },
      { name: 'Title', dataKey: 'title', isSortable: false, isShowable: true },
      { name: 'Round', dataKey: 'roundNo', isSortable: false, isShowable: true },
       { name: 'Duration', dataKey: 'duration', isSortable: false, isShowable: true },
      { name: 'Date & Time', dataKey: 'examDateTime', isSortable: false, isShowable: true },
       { name: 'No Of Questions', dataKey: 'numberOfQuestions', isSortable: false, isShowable: true },
        { name: 'Published', dataKey: 'published', isSortable: false, isShowable: true },
      { name: 'Action', dataKey: 'action', position: 'right' },
    ];
  }

 
  openForm(exam?: any): void {
    const dialogRef = this.dialog.open(ExamFormComponent, {
      data: exam,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      this.getExams();
      }
    });
  }

  remove($event: string): void {
   this.http.post<any>(environment.apiUrl+'exam/'+$event,{}).subscribe(response => {
          this.toastr.success(response.message);
        })
  }

  sort($event: Sort): void {
    this.requestModel.orderBy=$event.active
     $event.direction=='asc' ?this.requestModel.isAscending=true:false
    this.getExams();
  }

  filter($event: string): void {
    this.requestModel.keyword=$event.trim().toLocaleLowerCase()
   this.getExams();
  }
  

  reload(): void {
   this.getExams();
  }
}
