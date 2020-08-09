import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import staticTests from '../../assets/tests.json';

export interface Quiz {
  id: string;
  title: string;
  content: Array<{
    question: string;
    answers: string[];
    correct: number;
  }>;
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

  create(test: any): Observable<Quiz> {
    return this.http
      .post<{ name: string }>(`${MainService.url}.json`, test)
      .pipe(map((res) => ({ ...test, id: res.name })));
  }

  remove(test: { id: string }): Observable<void> {
    return this.http.delete<void>(`${MainService.url}/${test.id}.json`);
  }
}
