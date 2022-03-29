import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css'],
})
export class CreateCardComponent implements OnInit {
  cardForm!: FormGroup;
  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log('submit');
  }
}
