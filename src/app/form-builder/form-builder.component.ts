import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { __assign } from 'tslib';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormBuilderComponent implements OnInit {
  isShowAddQuestion: boolean = false;
  questionBuilder: any = {
    type: 'checkbox-list',
    question: '',
    options: [
      {
        answer: ''
      }
    ],
    allowSpecify: false,
    required: false
  }
  questions: any = []
  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  addQuestion() {
    this.isShowAddQuestion = true
  }

  addAnswers() {
    if (this.questionBuilder.options.length < 5) {
      this.questionBuilder.options.push({ answer: '' });
    }
  }

  onSubmit() {
    if (this.validate()) {
      const question = Object.assign(this.questionBuilder)
      this.questions.push(question);
      this.isShowAddQuestion = false;
      this.questionBuilder = {
        type: 'checkbox-list',
        question: '',
        options: [
          {
            answer: ''
          }
        ],
        allowSpecify: false,
        required: false,
        answer: ''
      }
      console.log(this.questions);
    }

  }

  validateAnwser() {
    if (this.questionBuilder.options.length > 0) {
      return this.questionBuilder.options.every((answer: any) => answer.answer !== '')
    }
    return false
  }

  validate() {
    if (this.questionBuilder.type === 'paragraph') {
      return this.questionBuilder.question;
    }
    return this.questionBuilder.question && this.validateAnwser();
  }

  reviewAnswers() {
    if (this.validateAnswers()) {
      this.router.navigateByUrl('form/answers', { state: this.questions });

      console.log(this.questions);
    }

  }

  validateAnswers() {
    let errors: boolean[] = [];
    this.questions.forEach((element: any) => {
      if (element.type === 'checkbox-list' && element.required) {
        if (element.other && element.otherAnswer) {
          errors.push(true);
        } else {
          errors.push(element.options.some((option: any) => option.checked))
        }
      } else if ((element.type === 'paragraph' && element.required)) {
        errors.push(element.answer)
      }
    });
    return errors.every((error: boolean) => error)
  }

  changeType($event: any) {
    this.questionBuilder = {
      type: $event.target.value,
      question: '',
      options: [
        {
          answer: ''
        }
      ],
      allowSpecify: false,
      required: false
    }
  }
}
