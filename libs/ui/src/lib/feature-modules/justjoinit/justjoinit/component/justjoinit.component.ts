/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OffersService } from 'libs/ui/src/lib/services/offers.service';


@Component({
  selector: 'job-scraper-justjoinit',
  templateUrl: './justjoinit.component.html',
  styleUrls: ['./justjoinit.component.scss'],
})
export class JustjoinitComponent implements OnInit {


  offers: any;
  scrapMessage: any;

  constructor(
    private offersService: OffersService, 
    private _snackBar: MatSnackBar
    ) {}

  ngOnInit(): void {
    this.offersService.getAllOffers().subscribe(
      data =>  this.offers = data);
  }

  scrapData() {
    this.offersService.scrapData().subscribe(
      data => this.scrapMessage = data)
      this.openSnackBar()      
  }

  openSnackBar() {
    this._snackBar.open(this.scrapMessage, 'Close');
  }
}
