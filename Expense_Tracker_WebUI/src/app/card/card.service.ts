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
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Card } from './models/card';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private cardCreatedSubject = new Subject<Card>();
  cardCreateAction$ = this.cardCreatedSubject.asObservable();
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

  cardWithCreateAction$ = merge(this.cards$, this.cardCreateAction$).pipe(
    scan((acc, value) => {
      return value instanceof Array ? [...value] : [...acc, value];
    }, [] as Card[])
  );

  createCard(card?: Card) {
    //card = this.fakeCard();
    this.cardCreatedSubject.next(card!);
    //this.router.navigate(['/']);
  }

  private fakeCard(): Card {
    return {
      cardId: '',
      cardName: '',
      cardNumber: '',
      cardDescription: '',
      cardType: '',
      cardExpiry: new Date().toString(),
      cardStatement: new Date().toString(),
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
