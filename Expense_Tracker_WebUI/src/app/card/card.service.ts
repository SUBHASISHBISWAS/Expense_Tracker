import { Injectable } from '@angular/core';
import {
  catchError,
  map,
  merge,
  Observable,
  scan,
  Subject,
  tap,
  throwError,
} from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Card } from './models/card';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private cardCreatedSubject = new Subject<Card>();
  private createCardAction$ = this.cardCreatedSubject.asObservable();
  private cards$ = this.http.get<any[]>('http://localhost:5099/api/Cards').pipe(
    map((cards) =>
      cards.map(
        (card) =>
          ({
            ...card,
            cardId: card.id,
          } as Card)
      )
    ),
    tap((cards) => console.log('fetched cards', JSON.stringify(cards))),
    catchError(this.handelErrors)
  );

  cardsWithCreateCardAction$ = merge(this.cards$, this.createCardAction$).pipe(
    scan((acc, value) => {
      console.log('Hello');
      return value instanceof Array ? [...value] : [...acc, value];
    }, [] as Card[])
  );

  createCard(card?: any) {
    let cardExpiryDate = this.datePipe.transform(
      new Date(card!.cardStatementDate).toString(),
      'MM/dd/yyyy'
    );
    let cardStatementDate = this.datePipe.transform(
      new Date(card!.cardStatementDate).toString(),
      'MM/dd/yyyy'
    );

    const cardData = new FormData();
    cardData.append('cardName', card!.cardName);
    cardData.append('cardNumber', card!.cardNumber);
    cardData.append('cardDescription', card!.cardDescription!);
    cardData.append('cardType', card!.cardType);
    cardData.append('cardExpiryDate', cardExpiryDate!);
    cardData.append('cardStatementDate', cardStatementDate!);

    this.http
      .post<any>('http://localhost:5099/api/Cards', cardData)
      .pipe(
        map((card) => {
          return {
            ...card,
            cardId: card.id,
          } as Card;
        }),
        tap((card) => console.log('created card', JSON.stringify(card)))
      )
      .subscribe((card) => {
        console.log(card!.cardId);
        this.cardCreatedSubject.next(card!);
      });

    //this.router.navigate(['/']);
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private datePipe: DatePipe
  ) {}

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
