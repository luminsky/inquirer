import { Component } from '@angular/core';
import { Quiz, MainService } from './shared/main.service';
import { map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'Select the quiz:';
  quizzes: Quiz[];
  activeQuiz: Quiz;

  constructor(private service: MainService) {
    this.quizzes = service.quizList;
    service.load().subscribe((data) => this.quizzes.push(...data));

    fromEvent(document, 'click')
      .pipe(map((v: any) => v.target))
      .subscribe((target) => {
        if (target.className === 'answer') {
          target = target.querySelector('input');
          target.checked = true;
        }
      });
  }
}
