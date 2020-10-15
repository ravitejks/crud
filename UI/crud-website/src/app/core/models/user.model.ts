export class User {
  NTLogin: string;
  FullName?: string;
  FirstName: string;
  LastName: string;
  EMail: string;
  Roles: string[];

  constructor() {
    this.FullName = this.FirstName + ' ' + this.LastName;
  }
}
