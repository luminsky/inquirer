import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import staticTests from '../../assets/tests.json';

export interface QuizWithNoId {
  title: string;
  content: Array<{
    question: string;
    answers: string[];
    correct: number;
  }>;
  passedAt?: number;
  passedValue?: string;
}

export interface Quiz extends QuizWithNoId {
  id: string;
}

@Injectable({ providedIn: 'root' })
export class MainService {
  static url = 'https://in-quirer.firebaseio.com/tests';
  quizList: Quiz[] = staticTests;

  constructor(private http: HttpClient) {}

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

  create(test: QuizWithNoId): Observable<Quiz> {
    return this.http
      .post<{ name: string }>(`${MainService.url}.json`, test)
      .pipe(map((res) => ({ ...test, id: res.name })));
  }

  remove(item: { id: string }): Observable<void> {
    return this.http.delete<void>(`${MainService.url}/${item.id}.json`);
  }
}
