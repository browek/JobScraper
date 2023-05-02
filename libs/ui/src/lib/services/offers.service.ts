/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private httpClient: HttpClient) { }

  getAllJJITOffers() {
    return this.httpClient.get('http://localhost:3333/api/jjit')
  }

  getAllPracujOffers() {
    return this.httpClient.get('http://localhost:3333/api/pracuj')
  }

  scrapData() {
    return this.httpClient.get('http://localhost:3333/api/scrap')
  
  }
  putJJITOffer(body: undefined) {
    return this.httpClient.put('http://localhost:3333/api/jjit', body)
  }

  putPracujOffer(body: undefined) {
    return this.httpClient.put('http://localhost:3333/api/pracuj', body)
  }
}
