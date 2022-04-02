import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from '../card/card.service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private datePipe: DatePipe,
    private cardService: CardService
  ) {}

  cards$ = this.cardService.cardsWithCreateCardAction$;

  createExpense(expense: any) {
    let expenseDate = this.datePipe.transform(
      new Date(expense!.expenseDate).toString(),
      'MM/dd/yyyy'
    );
    const expenseData = new FormData();
    expenseData.append('description', expense!.expenseDescription);
    expenseData.append('amount', expense!.expenseAmount);
    expenseData.append('cardId', expense!.expenseCard!);
    expenseData.append('expenseCategory', expense!.expenseCategory);
    expenseData.append('createdDate', expenseDate!);
    console.log(expense!.expenseCard!);
    console.log(JSON.stringify(expenseData));
    this.http
      .post<any>('http://localhost:5099/api/Expenses', expenseData)
      .subscribe((expense) => {
        console.log('created expense', JSON.stringify(expense));
      });
  }
}
