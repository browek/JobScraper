import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CommonModule } from "@angular/common";
import { PracujComponent } from "./component/pracuj.component";


@NgModule({
    declarations: [
        PracujComponent,
    ],
    imports: [
        FontAwesomeModule,
        MatIconModule,
        MatSnackBarModule,
        CommonModule
    ],
    exports: [
        PracujComponent
    ],
    providers: [],
})
export class PracujModule { }