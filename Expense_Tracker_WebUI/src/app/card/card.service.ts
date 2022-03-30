import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Card } from './models/card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private http: HttpClient) {}

  public cards$ = this.http.get<Card[]>('http://localhost:5099/api/Cards').pipe(
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
