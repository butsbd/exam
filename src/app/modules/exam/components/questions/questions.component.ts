import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { Answers, Choice, Quiz } from 'src/app/modules/exam/models/quiz.model';
import { environment } from 'src/environments/environment';
import LockableComponent from '../../models/LockableComponent';
import { ResultService } from '../../services/resultService';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit  {
  
  readonly rootUrl = 'https://localhost:44314';
  quiz: Quiz;
  answers: Answers;
  questions: any[];
  currentQuestionIndex: number;
 seconds:number=20
  showResults = false;
  // inject both the active route and the questions service
  constructor(private route: ActivatedRoute, private http:HttpClient,private toast:ToastrService,private router:Router,private resultService:ResultService) { }

  ngOnInit() {
    //disable F5/CTRL+F5
     window.addEventListener("keyup", disableF5);
     window.addEventListener("keydown", disableF5);
     //Browser refresh button show confirm message on reaload
     window.onbeforeunload = (event) => {
  const e = event || window.event;
  // Cancel the event
  e.preventDefault();
  if (e) {
    e.returnValue = ''; // Legacy method for cross browser support
  }
  return ''; // Legacy method for cross browser support
};
   //end reload confirm
    function disableF5(e) {
       if ((e.which || e.keyCode) == 116) e.preventDefault(); 
    };
    // //read from the dynamic route and load the proper quiz data
    // this.questionsService.getQuestions(this.route.snapshot.params.quizId)
    //   .subscribe(questions => {
    //     this.questions = questions;
    //     this.answers = new Answers();
    //     this.currentQuestionIndex = 0;
    //   });

     //read from the dynamic route and load the proper quiz data
    this.http.post<any>(environment.apiUrl+'Question/search', {page:-1})
      .subscribe(res => {
        this.questions = res.data.item1;
        this.answers = new Answers();
        this.currentQuestionIndex = 0;
         this.startTimer();
      });
  }
  //...
startTimer(){
    setInterval(() => {
    this.seconds--;
    if(this.seconds==0 && this.currentQuestionIndex !== this.questions.length - 1) {//arif && this.currentQuestionIndex !== this.questions.length - 1
   this.currentQuestionIndex++;
   this.seconds=20;
    }
      if(this.seconds==0 && this.currentQuestionIndex === this.questions.length - 1) {
        this.nextOrViewResults()
      }
}, 1000);

  }
  displayTimeElapsed(){
  return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
}
//......
  updateChoice(choice: Choice) {
    console.log("choice",choice)
    this.answers.values[this.currentQuestionIndex] = choice;

    console.log(this.answers)
  }
// arif  //from route we can get exam id
//from login we get candidate id
  nextOrViewResults() { 
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.showResults = true;
      console.log(this.answers.values)
      this.http.post(environment.apiUrl+ 'SubmitAnswers', this.answers).subscribe(response=>{
        console.log(response)
        this.seconds=undefined;
        this.toast.success("Your answers have been submitted successfully")
        this.resultService.questions=this.questions
        this.resultService.answers=this.answers
        this.router.navigate(['/exam/result'])
      })
      return;
    }else{ this.seconds=20}
    this.currentQuestionIndex++;
  }

  reset() {
    this.quiz = undefined;
    this.seconds=undefined;
    this.questions = undefined;
    this.answers = undefined;
    this.currentQuestionIndex = undefined;
  }

  

  
}
