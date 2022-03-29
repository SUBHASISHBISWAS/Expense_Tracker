import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css'],
})
export class CreateCardComponent implements OnInit {
  public cardForm!: FormGroup;
  selectedCard: string = '';
  public cardTypes: CardType[] = [
    { value: 'VISA', viewValue: 'VISA' },
    { value: 'MASTER', viewValue: 'MASTER' },
    { value: 'AMEX', viewValue: 'AMEX' },
  ];
  constructor() {}

  ngOnInit(): void {
    this.cardForm = new FormGroup({
      cardName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      cardNumber: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      cardType: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      cardDescription: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      cardExpiry: new FormControl('', {
        validators: [Validators.required],
      }),
      cardStatement: new FormControl('', {
        validators: [Validators.required],
      }),
    });
  }

  onSubmit(): void {
    if (!this.cardForm.valid) {
      return;
    }
    console.log(this.cardForm.value);
    console.log(this.selectedCard);
    console.log(this.cardForm.value?.cardStatement);
  }

  onCardExpiryDateChange(event: any): void {
    console.log(event.target.value);
  }
  onCardStatementDateChange(event: any): void {
    console.log(event.target.value);
  }
}

interface CardType {
  value: string;
  viewValue: string;
}
