import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiRoutingModule } from './ui-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { OffersService } from './services/offers.service';
import { PracujComponent } from './feature-modules/pracuj/component/pracuj.component';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    PracujComponent,
  ],
  imports: [
    CommonModule,
    UiRoutingModule,
    HttpClientModule,
    HomeModule
  ],
  providers: [OffersService],
})
export class UiModule {}
