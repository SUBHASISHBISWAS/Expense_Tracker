import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayExpenseComponent } from './display-expense/display-expense.component';
import { CreateExpenseComponent } from './create-expense/create-expense.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [DisplayExpenseComponent, CreateExpenseComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [DisplayExpenseComponent],
})
export class ExpenseModule {}
