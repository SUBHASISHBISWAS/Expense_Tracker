import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  map,
  mergeWith,
  Observable,
  Subject,
} from 'rxjs';
import {
  combineLatest,
  combineLatestInit,
} from 'rxjs/internal/observable/combineLatest';
import { CardService } from '../card.service';
import { Card } from '../models/card';

@Component({
  selector: 'app-display-cards',
  templateUrl: './display-cards.component.html',
  styleUrls: ['./display-cards.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayCardsComponent implements OnInit {
  userAuthenticated: boolean = true;
  errorMessage: string = '';
  cardTypeSelectedSubject = new BehaviorSubject<string>('');
  cardTypeSelectedAction$ = this.cardTypeSelectedSubject.asObservable();

  cards$ = combineLatest([
    this.cardService.cardsWithCreateCardAction$,
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
  /*
  public cards$ = this.cardService.cardWithCreateAction$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      this.userAuthenticated = false;
      return EMPTY;
    })
  );
*/

  constructor(private cardService: CardService) {}

  ngOnInit(): void {}

  onDelete(cardId: any): void {}
}
