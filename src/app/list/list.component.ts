import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MainService, Quiz } from '../shared/main.service';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements AfterViewInit {
  quizzes: Quiz[];
  @ViewChild('search', { read: ElementRef }) search: ElementRef;
  input$: Observable<string>;
  inputSubscription: Subscription;

  constructor(private service: MainService) {
    this.quizzes = service.quizzes;
  }

  ngAfterViewInit(): void {
    this.input$ = fromEvent(this.search.nativeElement, 'input').pipe(
      map((e: Event) => (e.target as HTMLInputElement).value),
      debounceTime(500),
      distinctUntilChanged()
      // set switchMap after implementing live loading
    );

    this.inputSubscription = this.input$.subscribe((value) => {
      if (!value) this.quizzes = this.service.quizzes;

      this.quizzes = this.quizzes.filter((quiz) =>
        quiz.title.toLowerCase().startsWith(value.toLowerCase())
      );
    });
  }

  ngOnDestroy() {
    if (this.inputSubscription) this.inputSubscription.unsubscribe();
  }

  focusSearchField() {
    this.search.nativeElement.focus();
  }

  setQuiz(quiz: Quiz) {
    this.service.preloadQuiz = quiz;
  }
}
