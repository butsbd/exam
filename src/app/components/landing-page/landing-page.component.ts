import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { LogoutDialogComponent } from 'src/app/core/shared/components/logout-dialog/logout-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
src='/assets/iman.pdf'
   @Input() darkModeIcon: string;
  @Input() inputSideNav: MatSidenav;
  @Input() isDarkMode: boolean;
  @Output('darkModelToggled') darkModelToggled = new EventEmitter<{ isDarkMode: boolean, darkModeIcon: string }>();
  fullName: string;
  email: string;
 publishedExams:any[]=[]
  constructor(private localStorageService: LocalStorageService, public authService: AuthService, public dialog: MatDialog,private themeService:ThemeService
    ,private http:HttpClient,
    private toastr:ToastrService) { }

  ngOnInit() {
    let themeVariant = this.localStorageService.getItem('themeVariant');
    this.darkModeIcon = themeVariant === 'dark-theme' ? 'bedtime' : 'wb_sunny';
    this.isDarkMode = themeVariant === 'dark-theme';
    this.fullName = this.authService.getFullName;
    this.email = this.authService.getEmail;
    this.getPublishedExams()
  }

  toggleDarkMode() {
    this.isDarkMode = this.themeService.toggleDarkMode();
    this.darkModeIcon = this.isDarkMode ? 'bedtime' : 'wb_sunny'
  }
 getExamStartDateTime(examDateTime):string{
   return new Date(examDateTime).toLocaleString()
   }
  openLogoutDialog() {
    const dialogRef = this.dialog.open(LogoutDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.authService.logout();
    });
  }
 getPublishedExams(): void {
     this.http.post<any>(environment.apiUrl + 'Exam/search', {page:-1,published:true}).subscribe(res=>{
      this.publishedExams=res?.data.item1
    });;
  }
  enroll(examId){
     if(this.authService.isAuthenticated){
         this.http.post<any>(environment.apiUrl+'CandidateExam',{examId:examId,candidateId:this.authService.getUserId}).subscribe(response => {
          this.toastr.success(response.message);
        })
     
    }  
    else{
     this.toastr.error("Please Login Before Enroll");
    }
     
  }
  isEnrolled(examId,candidateId):boolean{
       this.http.get<Enrollment>(environment.apiUrl+'enrollment/'+examId+"/"+candidateId).subscribe(response => {
        return response.enrolled;
    })
    return false;
  }

}

export class Enrollment{
  enrolled:boolean
}
