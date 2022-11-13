import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UiRoutingModule } from './ui-routing.module';
import { JustjoinitComponent } from './feature-modules/justjoinit/justjoinit/component/justjoinit.component';
import { HttpClientModule } from '@angular/common/http'
import { OffersService } from './services/offers.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon'
import { MatSnackBarModule } from '@angular/material/snack-bar';





@NgModule({
  declarations: [HomeComponent, JustjoinitComponent],
  imports: [
    CommonModule,
    UiRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [
    OffersService
  ]
})
export class UiModule { }
