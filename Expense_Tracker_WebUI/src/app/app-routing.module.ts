import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCardComponent } from './card/create-card/create-card.component';
import { DisplayCardsComponent } from './card/display-cards/display-cards.component';
import { CreateExpenseComponent } from './expense/create-expense/create-expense.component';
import { DisplayExpenseComponent } from './expense/display-expense/display-expense.component';

const routes: Routes = [
  { path: 'card/create', component: CreateCardComponent },
  { path: '', component: DisplayCardsComponent },
  { path: 'expense/create', component: CreateExpenseComponent },
  { path: 'expense/display', component: DisplayExpenseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
