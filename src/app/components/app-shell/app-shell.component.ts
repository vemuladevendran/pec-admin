import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SeoService } from 'src/app/services/seo/seo.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/token/token.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { menuItems as menuList } from './sidenav-items';

@Component({
  selector: 'app-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.css']
})
export class AppShellComponent implements OnInit, OnDestroy {
  
  menuItems = menuList;

  mobileQuery = this.media.matchMedia('(max-width: 600px)');
  private subscriptions: Subscription[] = [];
  title = '';
  isLoggedIn = false;

  constructor(
    private media: MediaMatcher,
    private auth: AuthService,
    // private dialog: MatDialog,
    private seo: SeoService,
    private router: Router,
    private token: TokenService
  ) { }

  ngOnInit() {
    if (this.router.url === '/') {
      this.router.navigate(['teachers']);
    }

    // this.listenForTitleChanges();
    // this.showLoginIcon();
  }

  // showLoginIcon() {
  //   this.isLoggedIn = this.auth.isLoggedIn();
  // }


  private listenForTitleChanges() {
    const subscription = this.seo.subsject.subscribe((title) => {
      this.title = title;
    });

    this.subscriptions.push(subscription);
  }


  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
