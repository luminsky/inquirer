import { Component, OnInit } from '@angular/core';
import { MainService, Quiz } from '../shared/main.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  quizzes: Quiz[];
  quiz: Quiz;

  constructor(private service: MainService) {
    this.quizzes = service.quizzes;
    this.quiz = { title: '', content: [] };
  }

  ngOnInit(): void {
    this.addQuestion();
  }

  addQuestion() {
    this.quiz.content.push({
      question: '',
      answers: ['', '', ''],
      correct: 0,
    });
  }

  trackFn = (i: number) => i;

  addAnswer(i: number) {
    this.quiz.content[i].answers.push('');
  }

  removeAnswer(i: number) {
    this.quiz.content[i].answers.pop();
  }

  validatePlus = (i: number): boolean =>
    this.quiz.content[i].answers.length >= 6 ? true : false;

  validateMinus = (i: number): boolean =>
    this.quiz.content[i].answers.length <= 2 ? true : false;

  onSubmit(e: Event) {
    e.preventDefault();

    this.service.create(this.quiz).subscribe((data) => {
      this.quizzes.push(data);
    });
  }
}
