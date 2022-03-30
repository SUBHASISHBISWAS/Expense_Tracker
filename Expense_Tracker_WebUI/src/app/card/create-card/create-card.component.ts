import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, catchError, combineLatest, EMPTY, map } from 'rxjs';
import { CardService } from '../card.service';

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
  constructor(private cardService: CardService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.cardForm = new FormGroup({
      cardName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(0)],
      }),
      cardNumber: new FormControl('', {
        validators: [Validators.required, Validators.minLength(0)],
      }),
      cardType: new FormControl('', {
        validators: [Validators.required, Validators.minLength(0)],
      }),
      cardDescription: new FormControl('', {
        validators: [Validators.required, Validators.minLength(0)],
      }),
      cardExpiryDate: new FormControl('', {
        validators: [Validators.required],
      }),
      cardStatementDate: new FormControl('', {
        validators: [Validators.required],
      }),
    });
  }

  onSubmit(): void {
    if (!this.cardForm.valid) {
      return;
    }
    this.cardService.createCard(this.cardForm.value);
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
