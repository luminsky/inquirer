import { Component, OnInit } from '@angular/core';
import { Quiz, MainService } from '../shared/main.service';
import { ActivatedRoute } from '@angular/router';
import { map, take, takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  quiz: Quiz;
  result: [number, number];
  toShow: any = {};

  constructor(private route: ActivatedRoute, private service: MainService) {
    this.quiz = service.preloadQuiz;

    this.service.quizzesLoaded
      .pipe(
        filter((v) => v),
        take(1)
      )
      .subscribe(() => {
        route.queryParams
          .pipe(
            take(1),
            map((params) =>
              service.quizzes.find((quiz) => quiz.id === params['id'])
            )
          )
          .subscribe((quiz) => (this.quiz = quiz));
      });
  }

  ngOnInit(): void {}

  onSubmit(e: Event) {
    e.preventDefault();

    const userAnswers = new Array(this.quiz.content.length).fill(false);

    document
      .querySelectorAll('.answer input')
      .forEach((radio: HTMLInputElement) => {
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

    this.toShow.value = ((100 / this.result[1]) * this.result[0]).toFixed(1);

    assignShowData(this.toShow);

    const timestamp = Date.now();
    const passedInfo = { timestamp, result: this.result };

    this.quiz.passedAt = timestamp;
    this.quiz.passedValue = this.result.join('/');

    localStorage.setItem(this.quiz.id, JSON.stringify(passedInfo));

    function assignShowData(toShow: any) {
      if (toShow.value >= 85)
        (toShow.color = '#3d5'), (toShow.text = 'Great result, well done!');
      else if (toShow.value >= 60)
        (toShow.color = '#bd5'), (toShow.text = 'Pretty good :)');
      else if (toShow.value >= 45)
        (toShow.color = '#ee4'), (toShow.text = 'Not bad :]');
      else if (toShow.value >= 30)
        (toShow.color = '#f86'), (toShow.text = 'Could be better :|');
      else (toShow.color = '#f24'), (toShow.text = 'Result is upsetting :(');
    }
  }
}
