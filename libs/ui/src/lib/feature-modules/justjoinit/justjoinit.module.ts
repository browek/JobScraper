import { NgModule } from "@angular/core";
import { JustjoinitComponent } from "./component/justjoinit.component";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CommonModule } from "@angular/common";


@NgModule({
  declarations: [
    JustjoinitComponent,
  ],
  imports: [
    FontAwesomeModule,
    MatIconModule,
    MatSnackBarModule,
    CommonModule
  ],
  exports: [
    JustjoinitComponent
  ],
  providers: [],
})
export class JustjoinitModule { }