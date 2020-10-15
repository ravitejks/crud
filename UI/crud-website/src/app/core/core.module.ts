import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import {
  MatInputModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule
} from '@angular/material';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { SnackbarService } from './services/snackbar.service';
import { ErrorService } from './services/error.service';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
    imports: [
        MatSnackBarModule,
        CommonModule,
        HttpClientModule,
        MatInputModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule

    ],
    declarations: [],
    providers: [
        SnackbarService,
        ErrorService,
        AuthenticationService
    ],
    exports: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
