import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.scss']
})
export class FormQuestionComponent implements OnInit {
 
readonly rootUrl = 'https://localhost:44314';
  // method called, once component has received all inputs
  // initialized form controller will link model and view
  // also wire up the form controller with onChange method
  questionForm: FormGroup;
  choices: FormArray;
  exams:[]

  constructor(private formBuilder: FormBuilder,private http:HttpClient) { }
validateSelectOnlyOneCorrectAnswer(arr: FormArray) {
   let arrLength=arr.value?.filter(x=>x.correct==true).length
   if(arrLength==0 || arrLength>1) return   {
    invalidSize: true
  }
   else return null
}
  ngOnInit() {
     this.http.post<any>(this.rootUrl+'/api/Exam/search', {})
      .subscribe(res => {
        this.exams = res.data.item1;
        
      });
    this.questionForm = this.formBuilder.group({
      examId: ['', Validators.required],
      label: ['', Validators.required],
      choices: this.formBuilder.array([this.createItem(),this.createItem(),this.createItem(),this.createItem()],this.validateSelectOnlyOneCorrectAnswer)
    });
  }

 

  createItem(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      correct: [false, Validators.required]
    });
  }

  addItem(): void {
    this.choices = this.questionForm.get('choices') as FormArray;
    this.choices.push(this.createItem());
  }
  onSubmit() {
    this.http.post<any>(this.rootUrl+'/api/Question', this.questionForm.value)
      .subscribe(res => {
        console.log(res)
        
      });
    // TODO: Use EventEmitter with form value
    console.warn(this.questionForm.value);


  }
}
