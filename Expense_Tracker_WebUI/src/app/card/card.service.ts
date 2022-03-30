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

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private cardCreatedSubject = new Subject<Card>();
  private createCardAction$ = this.cardCreatedSubject.asObservable();
  private cards$ = this.http
    .get<Card[]>('http://localhost:5099/api/Cards')
    .pipe(
      map((cards) =>
        cards.map(
          (card) =>
            ({
              ...card,
              cardId: card.cardId,
            } as Card)
        )
      ),
      tap((cards) => console.log('fetched cards', JSON.stringify(cards))),
      catchError(this.handelErrors)
    );

  cardsWithCreateCardAction$ = merge(this.cards$, this.createCardAction$).pipe(
    scan((acc, value) => {
      return value instanceof Array ? [...value] : [...acc, value];
    }, [] as Card[])
  );

  createCard(card?: Card) {
    const cardData = new FormData();
    cardData.append('cardName', card!.cardName);
    cardData.append('cardNumber', card!.cardNumber);
    cardData.append('cardDescription', card!.cardDescription!);
    cardData.append('cardType', card!.cardType);
    cardData.append('cardExpiry', card!.cardExpiryDate);
    cardData.append('cardStatement', card!.cardStatementDate);
    console.log(card!.cardStatementDate);
    this.http
      .post<Card>('http://localhost:5099/api/Cards', cardData)
      .pipe(tap((card) => console.log('created card', JSON.stringify(card))))
      .subscribe(() => {
        console.log(card!.cardId);
        this.cardCreatedSubject.next(card!);
      });

    //this.router.navigate(['/']);
  }

  private fakeCard(): Card {
    return {
      cardId: '',
      cardName: '',
      cardNumber: '',
      cardDescription: '',
      cardType: '',
      cardExpiryDate: new Date().toString(),
      cardStatementDate: new Date().toString(),
    };
  }

  constructor(private http: HttpClient, private router: Router) {}

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
