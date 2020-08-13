import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { AddComponent } from './add/add.component';

import { MainService } from './shared/main.service';
// import { StoreModule, ActionReducer } from '@ngrx/store';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, QuizComponent, AddComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    // StoreModule.forRoot({}, {}),
    // StoreDevtoolsModule.instrument({
    //   maxAge: 25,
    //   logOnly: environment.production,
    // }),
  ],
  providers: [MainService],
  bootstrap: [AppComponent],
})
export class AppModule {}
