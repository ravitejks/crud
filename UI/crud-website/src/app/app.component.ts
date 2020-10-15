import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './core/services/authentication.service';
import { SnackbarService } from './core/services/snackbar.service';
import { User } from './core/models/user.model';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  loggedInUser: User;
  isUserDataAvailable = false;
  userAuthFailed = false;

  constructor(private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private authService: AuthenticationService) { }

  async ngOnInit() {
    this.loggedInUser = await this.authService.authenticateUser();
    if (this.loggedInUser && this.loggedInUser.NTLogin && this.loggedInUser.NTLogin.trim().length) {
      this.isUserDataAvailable = true;
    } else {
      this.snackbarService.error('Unable to authenticate user. Please contact SCM');
      this.userAuthFailed = true;
    }
  }
}
