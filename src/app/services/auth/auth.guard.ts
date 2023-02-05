import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  private nonLoginOnlyRoutes = [
    'login',
  ];

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {

  }

  async canLoad(
    route: Route,
    segments: UrlSegment[]): Promise<boolean> {
    // console.log(route);

    const isLoggedIn = await this.auth.isLoggedIn();
    const isGoingToNonLoginPage = this.nonLoginOnlyRoutes.some(r => route.path === r);

    if (!isLoggedIn && isGoingToNonLoginPage) {
      return true;
    }

    if (isLoggedIn && !isGoingToNonLoginPage) {
      return true;
    }

    if (isLoggedIn && isGoingToNonLoginPage) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    this.router.navigate(['/login']);
    return false;
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    // console.log(route);
    const isLoggedIn = await this.auth.isLoggedIn();
    const isGoingToNonLoginPage = this.nonLoginOnlyRoutes.some(r => route.routeConfig?.path === r);

    if (!isLoggedIn && isGoingToNonLoginPage) {
      return true;
    }

    if (isLoggedIn && !isGoingToNonLoginPage) {
      return true;
    }

    if (isLoggedIn && isGoingToNonLoginPage) {
      this.router.navigate(['/teachers']);
      return false;
    }

    this.router.navigate(['/login']);
    return false;

  }


}
