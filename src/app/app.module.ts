import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';

import { MainService } from './shared/main.service';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [AppComponent, QuizComponent, AddComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [MainService],
  bootstrap: [AppComponent],
})
export class AppModule {}
