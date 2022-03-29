import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCardComponent } from './create-card/create-card.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateCardComponent],
  imports: [CommonModule, ReactiveFormsModule, AngularMaterialModule],
  exports: [CreateCardComponent],
})
export class CardModule {}
