import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Answers, Question } from 'src/app/modules/exam/models/quiz.model';
import LockableComponent from '../../models/LockableComponent';
import { ResultService } from '../../services/resultService';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, LockableComponent{
  constructor(private route: ActivatedRoute,private resultService:ResultService){}
   answers: any;
   questions: any;
  ngOnInit(): void {
    //disable F5/CTRL+F5
     window.addEventListener("keyup", disableF5);
     window.addEventListener("keydown", disableF5);
      function disableF5(e) {
       if ((e.which || e.keyCode) == 116) e.preventDefault(); 
    };
    this.questions=this.resultService.questions
    this.answers=this.resultService.answers
    console.log("questions",this.questions)
     console.log("answers",this.answers)
  }
  // used to make answers available to parent component (= questions)
  // so that parent can pass it to child component (= results)
// route disable
  allowRedirect: boolean;

canDeactivate(): boolean {
  return this.allowRedirect;
}

@HostListener('window:beforeunload', ['$event'])
beforeUnloadHander() {
    // or directly false
    this.allowRedirect;
}
}