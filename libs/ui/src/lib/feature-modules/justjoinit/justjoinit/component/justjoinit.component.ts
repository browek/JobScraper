/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
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
    private _snackBar: MatSnackBar,
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

  sentOffer(offer: any) {
    offer.status = 'Sent'
    return this.putOffer(offer)
  }

  rejectOffer(offer: any) {
    offer.status = 'Rejected'
    return this.putOffer(offer)
  }

  archiveOffer(offer: any) {
    offer.archived = true
    return this.putOffer(offer)
  }

  checkOffer(offer: any) {
    if(offer.status === 'New') {
      offer.status = 'Active'
      this.putOffer(offer)
    }
    window.open(offer.link, "_blank");
  }

  putOffer(offer: any) {
    return this.offersService.putOffer(offer).subscribe(
      data => console.log(data))
  }

  openSnackBar() {
    this._snackBar.open('Scraping', 'Close');
  }
}