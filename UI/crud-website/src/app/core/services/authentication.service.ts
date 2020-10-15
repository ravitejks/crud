import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
// import { Role } from 'src/app/fmea/constants/fmea.enums';

/**
 * Service used to authenticate user
 */

@Injectable()
export class AuthenticationService {
  httpHeaders: HttpHeaders;
  currentUser: User = null;
  isAdmin = false;

  webApiBaseURL = environment.webServerBaseURL;
  authURL = this.webApiBaseURL + 'auth/getuser';

  constructor(private http: HttpClient) {
  }

  async authenticateUser(): Promise<User> {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      withCredentials: 'true'
    });
    this.currentUser = null;
    await this.http
      .get(this.authURL, { headers: this.httpHeaders })
      .toPromise()
      .then((user: User) =>  {
        this.currentUser = user;
        // to mock as Administrator
        // this.currentUser.Roles.push(Role.Administrator);
        // this.isAdmin = user.Roles.includes(Role.Administrator);
      })
      .catch((err) => console.error('Error receiving user details'));
    return this.currentUser;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }
}
