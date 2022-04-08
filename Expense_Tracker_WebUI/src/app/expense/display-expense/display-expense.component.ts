import { Component, OnInit } from '@angular/core';
import {
  map,
  EMPTY,
  BehaviorSubject,
  pipe,
  combineLatest,
  catchError,
} from 'rxjs';
import { CardService } from 'src/app/card/card.service';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-display-expense',
  templateUrl: './display-expense.component.html',
  styleUrls: ['./display-expense.component.css'],
})
export class DisplayExpenseComponent implements OnInit {
  displayedColumns: string[] = [
    'description',
    'amount',
    'expenseCard',
    'expenseCategory',
    'expenseDate',
  ];

  expenseTypeSelectedSubject = new BehaviorSubject<string>('');
  cardTypeSelectedAction$ = this.expenseTypeSelectedSubject.asObservable();

  errorMessage: any;
  userAuthenticated: boolean = true;
  expenses$ = combineLatest([
    this.expenseService.expensesWithCreateExpenseAction$,
    this.cardTypeSelectedAction$,
  ]).pipe(
    map(([expenses, cardTypeSelected]) =>
      expenses.filter((expense) =>
        cardTypeSelected ? expense.expenseCategory === cardTypeSelected : true
      )
    ),
    catchError((err) => {
      this.errorMessage = err;
      this.userAuthenticated = false;
      return EMPTY;
    })
  );

  constructor(
    private cardService: CardService,
    private expenseService: ExpenseService
  ) {}

  ngOnInit(): void {}
  applyFilter(event: any) {}
}
