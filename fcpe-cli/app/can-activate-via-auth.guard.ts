import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
  
  constructor(private authService: AuthService,private router: Router){}

  // canActivate(){
  //   console.log("fcpe-cli - CanActivateViaAuthGuard.canActivate");
  //   return this.authService.verifierUtilisateur();
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.verifierUtilisateur()) {
            // logged in so return true
            return true;
        }
        else {
          this.router.navigate(['/authenticate'], { queryParams: { returnUrl: state.url }});
          return false;
        }
 
    }

}