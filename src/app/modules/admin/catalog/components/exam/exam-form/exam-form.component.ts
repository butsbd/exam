import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.scss']
})
export class ExamFormComponent implements OnInit {
  examForm: FormGroup;
  formTitle: string;
  isEditForm:boolean;
  code:string;
  examTitles:any[]=[]
  nextRoundExams:any[]=[]
  rounds=[{id:1,name:'1ST ROUND'},{id:2,name:'2ND ROUND'},{id:3,name:'3RD ROUND' },{id:4,name:'4TH ROUND'}]
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialog, private http: HttpClient, private toastr: ToastrService, private fb: FormBuilder,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.initializeForm();
   // this.getThreeLetterCode()
   this.getExamTitles();
   
  }

  initializeForm() {
    this.examForm = this.fb.group({
      id: [this.data && this.data.id],
      createdBy: [this.data && this.data.createdBy],
      updatedBy: [this.data && this.data.updatedBy],
      code: [this.data&& this.data.code],
      examCode: [this.data && this.data.examCode, Validators.required],
      examTitleId: [this.data && this.data.examTitleId, Validators.required],
      duration: [this.data && this.data.duration, Validators.required],
      examDateTime: [this.data&&this.data.examDateTime],
      numberOfQuestions: [this.data && this.data.numberOfQuestions, Validators.required],
      roundNo: [this.data && this.data.roundNo],
      nextRoundExamId: [this.data && this.data.nextRoundExamId],
      published: [this.data && this.data.published]
    })
    if (this.examForm.get('id').value === "" || this.examForm.get('id').value == null) {
      this.formTitle = "Add  New Exam";
      this.examForm.get('published').setValue(false)
      this.isEditForm=false;
    }
    else {
      this.formTitle = "Edit Exam";
      this.isEditForm=true;
      this.getNextRoundExams();
    }
  }
getThreeLetterCode(){
    this.http.get<any>(environment.apiUrl+'exam/code').subscribe(res=>{
      this.code= res?.code
    })
  }
  getExamTitles(){
     this.http.post<any>(environment.apiUrl+'examTitle/search', {page:-1})
      .subscribe(res => {
        this.examTitles = res.data.item1;
        
      });
  }

  getNextRoundExams(){
     this.http.post<any>(environment.apiUrl+'exam/search', {page:-1})
      .subscribe(res => {
        this.nextRoundExams = res.data.item1;
        
      });
  }
  
  onSubmit() {
    if (this.examForm.valid) {
      if (this.examForm.get('id').value === "" || this.examForm.get('id').value == null) {
      console.log(this.examForm.value)
        this.http.post<any>(environment.apiUrl+'exam',this.examForm.value).subscribe(response => {
          this.toastr.success(response.message);
          this.dialogRef.closeAll();
        })
      } else {
         console.log(this.examForm.value)
         this.http.post<any>(environment.apiUrl+'exam/update',this.examForm.value).subscribe(response => {
          this.toastr.success(response.message);
          this.dialogRef.closeAll();
        })
      }
    }
  }

}
