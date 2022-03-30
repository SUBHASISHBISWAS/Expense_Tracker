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
    this.cardService.createCard(this.cardForm.value);
  }

  onCardExpiryDateChange(event: any): void {
    console.log(event.target.value);
  }
  onCardStatementDateChange(event: any): void {
    console.log(event.target.value);
  }
  userAuthenticated: boolean = true;
  errorMessage: string = '';
  cardTypeSelectedSubject = new BehaviorSubject<string>('');
  cardTypeSelectedAction$ = this.cardTypeSelectedSubject.asObservable();

  cards$ = combineLatest([
    this.cardService.cardWithCreateAction$,
    this.cardTypeSelectedAction$,
  ]).pipe(
    map(([cards, cardTypeSelected]) => {
      return cards.filter((card) =>
        cardTypeSelected ? card.cardType === cardTypeSelected : true
      );
    }),
    catchError((err) => {
      this.errorMessage = err;
      this.userAuthenticated = false;
      return EMPTY;
    })
  );
}

interface CardType {
  value: string;
  viewValue: string;
}
