/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { OffersService } from 'libs/ui/src/lib/services/offers.service';

@Component({
  selector: 'job-scraper-justjoinit',
  templateUrl: './justjoinit.component.html',
  styleUrls: ['./justjoinit.component.scss'],
})
export class JustjoinitComponent implements OnInit {

  offers: any;

  constructor(private offersService: OffersService) {}

  ngOnInit(): void {
    this.offersService.getAllOffers().subscribe(
      data =>  this.offers = data)
  }

}
