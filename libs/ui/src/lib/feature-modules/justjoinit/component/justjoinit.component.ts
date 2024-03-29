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
  inArchives = false;

  constructor(
    private offersService: OffersService, 
    private _snackBar: MatSnackBar,
    ) {}

  ngOnInit(): void {
    this.offersService.getAllJJITOffers()
    .subscribe(data =>  this.offers = data)
  }

  scrapData() {
    this.offersService.scrapData().subscribe(
      data => this.scrapMessage = data)
      this.openSnackBar()      
  }

  sentOffer(offer: any) {
    offer.status = 'Sent'
    return this.putJJITOffer(offer)
  }

  rejectOffer(offer: any) {
    offer.status = 'Rejected'
    return this.putJJITOffer(offer)
  }

  archiveOffer(offer: any) {
    offer.archived = !offer.archived
    return this.putJJITOffer(offer)
  }

  checkOffer(offer: any) {
    if(offer.status === 'New') {
      offer.status = 'Active'
      this.putJJITOffer(offer)
    }
    window.open(offer.link, "_blank");
  }

  putJJITOffer(offer: any) {
    return this.offersService.putJJITOffer(offer).subscribe(
      data => console.log(data))
  }

  goToArchivum() {
    this.inArchives = !this.inArchives;
  }

  openSnackBar() {
    this._snackBar.open('Scraping', 'Close');
  }
}