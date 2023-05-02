/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../../services/offers.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'job-scraper-pracuj',
  templateUrl: './pracuj.component.html',
  styleUrls: ['./pracuj.component.scss'],
})
export class PracujComponent implements OnInit {
  offers: any;
  scrapMessage: any;
  inArchives = false;

  constructor(
    private offersService: OffersService, 
    private _snackBar: MatSnackBar,
    ) {}

  ngOnInit(): void {
    this.offersService.getAllPracujOffers()
    .subscribe(data =>  this.offers = data)
  }

  scrapData() {
    this.offersService.scrapData().subscribe(
      data => this.scrapMessage = data)
      this.openSnackBar()      
  }

  sentOffer(offer: any) {
    offer.status = 'Sent'
    return this.putPracujOffer(offer)
  }

  rejectOffer(offer: any) {
    offer.status = 'Rejected'
    return this.putPracujOffer(offer)
  }

  archiveOffer(offer: any) {
    offer.archived = !offer.archived
    return this.putPracujOffer(offer)
  }

  checkOffer(offer: any) {
    if(offer.status === 'New') {
      offer.status = 'Active'
      this.putPracujOffer(offer)
    }
    window.open(offer.link, "_blank");
  }

  putPracujOffer(offer: any) {
    return this.offersService.putPracujOffer(offer).subscribe(
      data => console.log(data))
  }

  goToArchivum() {
    this.inArchives = !this.inArchives;
  }

  openSnackBar() {
    this._snackBar.open('Scraping', 'Close');
  }
}
