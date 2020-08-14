import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  { path: '', component: MainComponent }, // List and Add
  { path: 'quiz', component: QuizComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
