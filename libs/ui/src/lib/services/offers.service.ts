/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private httpClient: HttpClient) { }

  getAllOffers() {
    return this.httpClient.get('http://localhost:3333/api/records')
  }

  scrapData() {
    return this.httpClient.get('http://localhost:3333/api/scrap')
  }
}
