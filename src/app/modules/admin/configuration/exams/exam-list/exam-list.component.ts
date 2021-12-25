import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TableColumn } from 'src/app/core/shared/components/table/table-column';
import { environment } from 'src/environments/environment';
import { ExamFormComponent } from '../exam-form/exam-form.component';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.scss']
})
export class ExamListComponent implements OnInit {
  dataSource: any;
  examColumns: TableColumn[];
  //brandParams = new BrandParams();
  searchString: string;

  constructor(
    public http: HttpClient,
    public dialog: MatDialog,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getExams();
    this.initColumns();
  }

  getExams(keyword="",page=0,rowsPerPage=5): void {
     this.http.post<any>(environment.apiUrl + 'Exam/search', { page:page,rowsPerPage:rowsPerPage }).subscribe(res=>{
      this.dataSource=res?.data
    });;
  }
 pageChanged(event: any): void {
    this.getExams(event.pageIndex,event.pageSize);
  }


  initColumns(): void {
    this.examColumns = [
      { name: 'Id', dataKey: 'id', isSortable: true, isShowable: true },
      { name: 'Code', dataKey: 'code', isSortable: true, isShowable: true },
      { name: 'Action', dataKey: 'action', position: 'right' },
    ];
  }

 
  openForm(brand?: any): void {
    const dialogRef = this.dialog.open(ExamFormComponent, {
     // data: brand,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      //  this.getBrands();
      }
    });
  }

  remove($event: string): void {
   // this.brandService.deleteBrand($event).subscribe(() => {
     // this.getBrands();
    //  this.toastr.info('Brand Removed');
  //  });
  }

  sort($event: any): void {
   // this.brandParams.orderBy = $event.active + ' ' + $event.direction;
   // console.log(this.brandParams.orderBy);
    //this.getBrands();
  }

  filter($event: string): void {
  //  this.brandParams.searchString = $event.trim().toLocaleLowerCase();
    //this.brandParams.pageNumber = 0;
    //this.brandParams.pageSize = 0;
   // this.getBrands();
  }

  reload(): void {
  //  this.brandParams.searchString = '';
  //  this.brandParams.pageNumber = 0;
//    this.brandParams.pageSize = 0;
   /// this.getBrands();
  }
}
