import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

 
  displayedColumns: string[] = ['candidate','exam','noOfQuestions','attemted', 'notAttempted', 'score', 'accuracy'];
  
  dataSource:any={};
  constructor(
    public toastr: ToastrService,private http:HttpClient
  ) { }

  ngOnInit(): void {
    this.getResults();
  }

  getResults(keyword="",page=0,rowsPerPage=5): void {
     this.http.post<any>(environment.apiUrl + 'CandidateExamResult/search', { page:page,rowsPerPage:rowsPerPage }).subscribe(res=>{
      this.dataSource=res?.data
    });;
  }
 pageChanged(event: any): void {
    this.getResults(event.pageIndex,event.pageSize);
  }

 

}
