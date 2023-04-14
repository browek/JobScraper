import { NgModule } from "@angular/core";
import { HomeComponent } from "./component/home.component";
import {MatTabsModule} from '@angular/material/tabs';
import { JustjoinitModule } from "../feature-modules/justjoinit/justjoinit.module";
import { PracujModule } from "../feature-modules/pracuj/pracuj.module";

@NgModule({
    declarations: [
      HomeComponent,
    ],
    imports: [
        JustjoinitModule,
        PracujModule,
        MatTabsModule
    ],
    exports: [],
    providers: [],
  })
  export class HomeModule {}