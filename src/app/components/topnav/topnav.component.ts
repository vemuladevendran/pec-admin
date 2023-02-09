import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
  isLoggedIn = true;
  @Input() snav: any;
  title = '';
  userName = '';
  constructor(
    private auth: AuthService,
    private tokenServe: TokenService,
  ) { }

  ngOnInit(): void {
    this.getUserName();
  }


  toggleSideNav() {
    this.snav?.toggle();
  }


  logout() {
    this.auth.logout();
  }

  // get user Name
  async getUserName(): Promise<void> {
    const data = await this.tokenServe.getTokenData();
    this.userName = data?.name;
  }
}
