import { Component, OnInit, Input } from '@angular/core';
import { MainService, QuizWithNoId } from '../shared/main.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  quiz: QuizWithNoId = { title: '', content: [] };
  answers: Array<string[]> = [];
  @Input() quizzes;
  @Input() back;

  constructor(private service: MainService) {}

  ngOnInit(): void {
    this.addQuestion();
  }

  addQuestion() {
    this.quiz.content.push({
      question: '',
      answers: ['', '', ''],
      correct: 0,
    });
    this.answers.push(['', '', '']);
  }

  addAnswer(i: number, e: any) {
    this.quiz.content[i].answers.push('');
    this.answers[i].push('');
    // if (this.quiz.content[i].answers.length >= 6) e.target.disabled = true;
  }

  removeAnswer(i: number) {
    this.quiz.content[i].answers.pop();
    this.answers[i].pop();
  }

  onSubmit(e: Event) {
    e.preventDefault();
    this.answers.forEach((e, i) => (this.quiz.content[i].answers = e));
    this.service.create(this.quiz).subscribe((data) => {
      this.quizzes.push(data);
      this.back();
    });
  }
}
