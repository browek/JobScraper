import { NgModule } from "@angular/core";
import { HomeComponent } from "./component/home.component";
import {MatTabsModule} from '@angular/material/tabs';
import { JustjoinitModule } from "../feature-modules/justjoinit/justjoinit.module";

@NgModule({
    declarations: [
      HomeComponent,
    ],
    imports: [
        JustjoinitModule,
        MatTabsModule
    ],
    exports: [],
    providers: [],
  })
  export class HomeModule {}