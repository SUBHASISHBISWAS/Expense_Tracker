import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { DisplayExpensesComponent } from './display-expenses/display-expenses.component';

@NgModule({
  declarations: [AddExpenseComponent, DisplayExpensesComponent],
  imports: [CommonModule],
})
export class ExpenseModule {}
