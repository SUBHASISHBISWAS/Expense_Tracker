import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCardComponent } from './create-card/create-card.component';
import { DisplayCardsComponent } from './display-cards/display-cards.component';



@NgModule({
  declarations: [
    CreateCardComponent,
    DisplayCardsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CardModule { }
