import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BusyService } from 'src/app/core/services/busy.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  enrolledExams:any[]=[]
  
  constructor(private themeService: ThemeService,public busyService: BusyService,
    private activatedRoute: ActivatedRoute,private http:HttpClient, 
    private router:Router,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.getCandidateEnrolledExams(this.activatedRoute.snapshot.params.candidateid)

  }
  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

 
   getCandidateEnrolledExams(candidateId): void {
     console.log(candidateId)
     this.http.post<any>(environment.apiUrl + 'CandidateExam/search', {page:-1,candidateId:candidateId,orderBy:'id'}).subscribe(res=>{
       console.log(res
        )
      this.enrolledExams=res?.data.item1
    });;
  }

   enableExamStartBtn(examDateTime):boolean{
    var total=Date.parse(new Date(examDateTime).toLocaleString()) - Date.parse(new Date().toLocaleString())
    if(total>0) return true
   
   }
    getExamStartDateTime(examDateTime):string{
   return new Date(examDateTime).toLocaleString()
   }
  startExam(exam){
    var total=Date.parse(new Date(exam.examDateTime).toLocaleString()) - Date.parse(new Date().toLocaleString())
    if(total<=0) this.router.navigate(['/exam/startExam',exam.id])
    else {
      this.toaster.success('Please Try on Schedule Time')
    }

  }
 
}
