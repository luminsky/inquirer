import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';

export interface Quiz {
  id?: string;
  title: string;
  content: Array<{
    question: string;
    answers: string[];
    correct: number;
  }>;
  passedAt?: number;
  passedValue?: string;
}

@Injectable({ providedIn: 'root' })
export class MainService {
  static url = 'https://in-quirer.firebaseio.com/tests';
  quizzes: Quiz[] = [];
  preloadQuiz: Quiz;
  quizzesLoaded = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
    this.load()
      .pipe(take(1))
      .subscribe((data) => {
        this.quizzes.push(...data);

        // localStorage.setItem('quizcache', JSON.stringify(data));

        this.quizzes.forEach((quiz) => {
          const passed = JSON.parse(localStorage.getItem(quiz.id));

          if (passed) {
            quiz.passedAt = passed.timestamp;
            quiz.passedValue = (passed.result as [number, number]).join('/');
          }
        });

        this.quizzesLoaded.next(true);
      });
  }

  load(): Observable<Quiz[]> {
    return this.http
      .get<Quiz[]>(`${MainService.url}.json`)
      .pipe(
        map((tests) =>
          tests
            ? Object.keys(tests).map((key) => ({ ...tests[key], id: key }))
            : []
        )
      );
  }

  create(test: Quiz): Observable<Quiz> {
    return this.http
      .post<{ name: string }>(`${MainService.url}.json`, test)
      .pipe(map((res) => ({ ...test, id: res.name })));
  }

  remove(item: { id: string }): Observable<void> {
    return this.http.delete<void>(`${MainService.url}/${item.id}.json`);
  }
}
