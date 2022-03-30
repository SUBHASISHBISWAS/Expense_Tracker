import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCardComponent } from './create-card/create-card.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplayCardsComponent } from './display-cards/display-cards.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CreateCardComponent, DisplayCardsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [CreateCardComponent],
})
export class CardModule {}
