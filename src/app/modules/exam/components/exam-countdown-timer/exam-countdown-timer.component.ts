import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-exam-countdown-timer',
  templateUrl: './exam-countdown-timer.component.html',
  styleUrls: ['./exam-countdown-timer.component.scss']
})
export class ExamCountdownTimerComponent implements OnInit {
  @Input() examDateTime:string;
   @Input() exam:any;
  total
  days
  hours
  minutes
  seconds
  constructor() { }

  ngOnInit(): void {
     const timeinterval = setInterval(() => {
    this.getTimeRemaining();
    if (this.total <= 0) {
      clearInterval(timeinterval);
      this.days=0
      this.hours=0
      this.minutes=0
      this.seconds=0
    }
}, 1000);
console.log("fdfdifdfdf",this.exam)
  }


  getTimeRemaining(endtime=new Date(this.examDateTime).toLocaleString()):void {
    this.total = Date.parse(endtime) - Date.parse(new Date().toLocaleString());
   this.seconds = Math.floor((this.total % (1000*60)) /(1000));
   this.minutes = Math.floor((this.total %(1000 *60* 60))/(1000*60));
   this.hours = Math.floor((this.total / (1000 * 60 * 60)) % 24);
   this.days = Math.floor(this.total / (1000 * 60 * 60 * 24));
}

}
