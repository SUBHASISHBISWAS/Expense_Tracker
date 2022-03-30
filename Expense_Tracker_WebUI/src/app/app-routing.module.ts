import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCardComponent } from './card/create-card/create-card.component';
import { DisplayCardsComponent } from './card/display-cards/display-cards.component';

const routes: Routes = [
  { path: 'card/create', component: CreateCardComponent },
  { path: '', component: DisplayCardsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
