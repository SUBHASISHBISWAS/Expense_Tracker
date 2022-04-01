import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardService } from 'src/app/card/card.service';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css'],
})
export class CreateExpenseComponent implements OnInit {
  public expenseForm!: FormGroup;
  selectedCard: string = '';
  selectedCategory: string = '';
  public cardTypes: CardType[] = [
    { value: 'VISA', viewValue: 'VISA' },
    { value: 'MASTER', viewValue: 'MASTER' },
    { value: 'AMEX', viewValue: 'AMEX' },
  ];
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
  }

  onExpenseDateChange(event: any) {}

  onSubmit(): void {
    if (!this.expenseForm.valid) {
      return;
    }
    this.expenseService.createExpense(this.expenseForm.value);
  }
}
interface CardType {
  value: string;
  viewValue: string;
}
