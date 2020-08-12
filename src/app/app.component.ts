import { Component } from '@angular/core';
import { Quiz, MainService } from './shared/main.service';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  quizzes: Quiz[] = [];
  active: Quiz;
  choiseMode = true;

  constructor(private service: MainService) {
    this.quizzes = service.quizList;
    service.load().subscribe((data) => this.quizzes.push(...data));

    fromEvent(document, 'click')
      .pipe(map((v: Event) => v.target as HTMLInputElement))
      .subscribe((target) => {
        if (target.className === 'answer') {
          target = target.querySelector('input');
          target.checked = true;
        }
      });
  }

  setQuiz(quiz: Quiz) {
    this.active = quiz;
  }

  setChoiseMode(value: boolean) {
    this.choiseMode = value;
  }
}
