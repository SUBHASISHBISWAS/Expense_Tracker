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
    expenseData.append('cardName', expense!.expenseDescription);
    expenseData.append('cardNumber', expense!.expenseAmount);
    expenseData.append('cardDescription', expense!.expenseCard!);
    expenseData.append('cardType', expense!.expenseCategory);
    expenseData.append('cardExpiryDate', expenseDate!);
    console.log(expense!.expenseCard!);
    //this.http.post<any>('http://localhost:5099/api/Expense', expenseDate);
  }
}
