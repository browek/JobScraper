import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UiRoutingModule } from './ui-routing.module';

@NgModule({
  imports: [CommonModule, UiRoutingModule],
  declarations: [HomeComponent],
})
export class UiModule {}
