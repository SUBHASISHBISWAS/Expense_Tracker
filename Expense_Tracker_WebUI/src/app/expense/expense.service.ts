import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  catchError,
  combineLatest,
  map,
  merge,
  Observable,
  scan,
  Subject,
  tap,
  throwError,
} from 'rxjs';
import { CardService } from '../card/card.service';
import { Expense } from './Model/Expense';

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

  private expenseDeleteSubject = new Subject<any>();
  expenseDeleteAction$ = this.expenseDeleteSubject.asObservable();
  private expenseCreatedSubject = new Subject<Expense>();
  createExpenseAction$ = this.expenseCreatedSubject.asObservable();

  private expenses$ = this.http
    .get<any[]>('http://localhost:5099/api/Expenses')
    .pipe(
      map((expenses) => {
        return expenses.map(
          (expense) =>
            ({
              ...expense,
              expenseId: expense.id,
            } as Expense)
        );
      }),
      tap(
        (expenses) => console.log('fetched expenses', JSON.stringify(expenses)),
        catchError(this.handelErrors)
      )
    );

  expenseWithCard$ = combineLatest([
    this.expenses$,
    this.cardService.cards$,
  ]).pipe(
    map(([expenses, cards]) => {
      return expenses.map((expense) => {
        console.log('first');
        return {
          ...expense,
          expenseCard: cards.find((card) => card.cardId === expense.cardId)
            ?.cardName,
        } as Expense;
      });
    })
  );

  expensesWithCreateExpenseAction$ = merge(
    this.expenseWithCard$,
    this.createExpenseAction$
  ).pipe(
    scan((acc, value) => {
      console.log('Hello' + [...acc]);
      return value instanceof Array ? [...value] : [...acc, value];
    }, [] as Expense[])
  );

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
    expenseData.append('expenseDate', expenseDate!);
    console.log(expenseDate!);
    console.log(JSON.stringify(expenseData));
    this.http
      .post<any>('http://localhost:5099/api/Expenses', expenseData)
      .pipe(
        map((expense) => {
          return {
            ...expense,
            expenseId: expense.id,
          } as Expense;
        })
      )
      .subscribe((expense) => {
        console.log('created expense', JSON.stringify(expense));
        this.expenseCreatedSubject.next(expense);
      });
  }

  deleteExpense(expenseId: any) {
    this.http
      .delete<any>(`http://localhost:5099/api/Expenses/${expenseId}`)
      .subscribe((expense) => {
        console.log('deleted expense', JSON.stringify(expenseId));
        this.expenseDeleteSubject.next(expenseId);
      });
  }

  private handelErrors(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${err.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage); // throw error to the caller));
  }
}
