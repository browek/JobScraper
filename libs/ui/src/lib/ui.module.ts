import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UiRoutingModule } from './ui-routing.module';
import { JustjoinitComponent } from './feature-modules/justjoinit/justjoinit/component/justjoinit.component';
import { HttpClientModule } from '@angular/common/http'
import { OffersService } from './services/offers.service';




@NgModule({
  declarations: [HomeComponent, JustjoinitComponent],
  imports: [
    CommonModule,
    UiRoutingModule,
    HttpClientModule
  ],
  providers: [
    OffersService
  ]
})
export class UiModule {}
