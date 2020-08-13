import { Component, OnInit, Input } from '@angular/core';
import { Quiz } from '../shared/main.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  @Input() quiz: Quiz;
  @Input() back: VoidFunction;
  result: [number, number];
  toShow: any;

  constructor() {}

  ngOnInit(): void {}

  onSubmit(e: Event) {
    e.preventDefault();

    let userAnswers = new Array(this.quiz.content.length).fill(false);

    document
      .querySelectorAll('.answer input')
      .forEach((radio: HTMLInputElement, i) => {
        let [question, answer] = [+radio.name, +radio.value];

        if (this.quiz.content[question].correct === answer)
          radio.parentElement.style.backgroundColor = '#bfb';

        if (radio.checked) {
          if (this.quiz.content[question].correct === answer)
            userAnswers[question] = true;
          else radio.parentElement.style.backgroundColor = '#fcc';
        }
      });

    this.result = [
      userAnswers.reduce((prev, elem) => prev + elem, 0),
      userAnswers.length,
    ];

    this.toShow = {
      value: ((100 / this.result[1]) * this.result[0]).toFixed(1),
    };

    this.assignShowData(this.toShow);

    let passedInfo = { timestamp: Date.now(), result: this.result };

    this.quiz.passedAt = passedInfo.timestamp;
    this.quiz.passedValue = this.result.join('/');

    localStorage.setItem(this.quiz.id, JSON.stringify(passedInfo));

    // console.log(`[Test ID] ${this.quiz.id}\n[Answers] ${userAnswers}\n[Correct] ${this.result[0]}`);
  }

  assignShowData(config: any) {
    if (config.value >= 85)
      (config.color = '#3d5'), (config.text = 'Great result, well done!');
    else if (config.value >= 60)
      (config.color = '#bd5'), (config.text = 'Pretty good :)');
    else if (config.value >= 45)
      (config.color = '#ee4'), (config.text = 'Not bad :]');
    else if (config.value >= 30)
      (config.color = '#f86'), (config.text = 'Could be better :|');
    else (config.color = '#f24'), (config.text = 'Result is upsetting :(');
  }
}
