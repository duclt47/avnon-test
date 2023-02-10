import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-answers',
  templateUrl: './form-answers.component.html',
  styleUrls: ['./form-answers.component.scss']
})
export class FormAnswersComponent implements OnInit {
  questions: any[] = [];
  constructor(private router: Router, private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    const keys = Object.keys(history.state);
    keys.forEach(key => {
      if (key !== 'navigationId') {
        this.questions.push(history.state[key])
      }
    })
  }
  backToFormBuilder() {
    this.router.navigateByUrl('form/builder', { state: this.questions });
  }

  generateAnswer(question: any) {
    let answer = ''
    console.log(question);

    question.options.forEach((option: any) => {
      if (option.checked) {
        answer = answer + option.answer + ', ';
      }
    });
    if (question.other && question.otherAnswer) {
      answer = answer + question.otherAnswer
    }
    return answer;
  }

}
