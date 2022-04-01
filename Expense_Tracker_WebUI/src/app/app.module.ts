import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './header/header.module';
import { MatSliderModule } from '@angular/material/slider';
import { CardModule } from './card/card.module';
import { ExpenseModule } from './expense/expense.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HeaderModule,
    MatSliderModule,
    CardModule,
    ExpenseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
