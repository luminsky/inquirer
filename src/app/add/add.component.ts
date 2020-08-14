import { Component, OnInit, Input } from '@angular/core';
import { MainService, Quiz } from '../shared/main.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  @Input() back: VoidFunction;
  quizzes: Quiz[];
  answers: Array<string[]> = [];
  quiz: Quiz;

  constructor(private service: MainService) {}

  ngOnInit(): void {
    this.quizzes = this.service.quizzes;
    this.quiz = { title: '', content: [] };
    this.addQuestion();
  }

  addQuestion() {
    this.answers.push(['', '', '']);
    this.quiz.content.push({
      question: '',
      answers: ['', '', ''],
      correct: 0,
    });
  }

  addAnswer(i: number) {
    this.quiz.content[i].answers.push('');
    this.answers[i].push('');
  }

  removeAnswer(i: number) {
    this.quiz.content[i].answers.pop();
    this.answers[i].pop();
  }

  validatePlus = (i: number): boolean =>
    this.quiz.content[i].answers.length >= 6 ? true : false;

  validateMinus = (i: number): boolean =>
    this.quiz.content[i].answers.length <= 2 ? true : false;

  onSubmit(e: Event) {
    e.preventDefault();

    this.answers.forEach((elem, i) => (this.quiz.content[i].answers = elem));

    this.service.create(this.quiz).subscribe((data) => {
      this.quizzes.push(data);
    });

    this.back();
  }
}
