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

  constructor() {}

  ngOnInit(): void {}

  onSubmit(e: Event) {
    e.preventDefault();

    let answers = new Array(this.quiz.content.length).fill(false);

    document.querySelectorAll('.answer input:checked').forEach((radio) => {
      let [question, answer] = radio
        .getAttribute('value')
        .split(',')
        .map((e) => +e);
      if (this.quiz.content[question].correct === answer)
        answers[question] = true;
    });

    console.log(
      '[Test id]',
      this.quiz.id,
      '\n[Answers]',
      answers,
      '\n[Correct]',
      answers.reduce((prev, elem) => prev + elem, 0)
    );
  }
}
