import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, combineLatest, EMPTY, map } from 'rxjs';
import { CardService } from 'src/app/card/card.service';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css'],
})
export class CreateExpenseComponent implements OnInit {
  userAuthenticated: boolean = true;
  errorMessage: string = '';
  public expenseForm!: FormGroup;
  selectedCard: string = '';
  selectedCategory: string = '';
  public cardTypes: CardType[] = [
    { value: 'VISA', viewValue: 'VISA' },
    { value: 'MASTER', viewValue: 'MASTER' },
    { value: 'AMEX', viewValue: 'AMEX' },
  ];
  expenseTypeSelectedSubject = new BehaviorSubject<string>('');
  cardTypeSelectedAction$ = this.expenseTypeSelectedSubject.asObservable();

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

  cards$ = this.cardService.cardsWithCreateCardAction$;

  constructor(
    private fb: FormBuilder,
    private cardService: CardService,
    private expenseService: ExpenseService
  ) {}

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      expenseDescription: ['', [Validators.required, Validators.minLength(0)]],
      expenseAmount: ['', [Validators.required, Validators.minLength(0)]],
      expenseDate: ['', [Validators.required]],
      expenseCategory: ['', [Validators.required, Validators.minLength(0)]],
      expenseCard: ['', [Validators.required, Validators.minLength(0)]],
    });
    this.expenseService.expenseDeleteAction$.subscribe((expenseId) => {
      this.expenses$ = this.expenses$.pipe(
        map((expenses) =>
          expenses.filter((expense) => expense.expenseId !== expenseId)
        )
      );
    });
  }

  onExpenseDateChange(event: any) {}

  onSubmit(): void {
    if (!this.expenseForm.valid) {
      return;
    }
    this.expenseService.createExpense(this.expenseForm.value);
  }

  onDelete(expenseId: any) {
    this.expenseService.deleteExpense(expenseId);
  }
}
interface CardType {
  value: string;
  viewValue: string;
}
