import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { QuizComponent } from './quiz/quiz.component';
import { AddComponent } from './add/add.component';
import { NotFoundComponent } from './not-found.component';

import { MainService } from './shared/main.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    AddComponent,
    NotFoundComponent,
    ListComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [MainService],
  bootstrap: [AppComponent],
})
export class AppModule {}
