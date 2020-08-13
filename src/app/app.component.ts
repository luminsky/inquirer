import { Component } from '@angular/core';
import { Quiz, MainService } from './shared/main.service';

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

    this.quizzes.forEach((quiz) => {
      let passed = JSON.parse(localStorage.getItem(quiz.id));
      if (passed) {
        quiz.passedAt = passed.timestamp;
        quiz.passedValue = (passed.result as [number, number]).join('/');
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
