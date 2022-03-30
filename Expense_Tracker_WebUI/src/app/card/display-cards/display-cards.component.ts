import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
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

  public cards$ = this.cardService.cards$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      this.userAuthenticated = false;
      return EMPTY;
    })
  );

  constructor(private cardService: CardService) {}

  ngOnInit(): void {}

  onDelete(cardId: any): void {}
}
