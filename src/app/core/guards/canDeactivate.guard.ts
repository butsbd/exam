import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import LockableComponent from "src/app/modules/exam/models/LockableComponent";



@Injectable()
export class CanDeactivateGuard implements CanDeactivate<any> {
  constructor(
        private readonly location: Location
    ) {}
canDeactivate(
    component: LockableComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (
      (component.allowRedirect === false ||
        (component.canDeactivate && !component.canDeactivate()))
    ) {
      // Angular bug! The stack navigation with candeactivate guard
      // messes up all the navigation stack...
      // see here: https://github.com/angular/angular/issues/13586#issuecomment-402250031
        this.location.href=currentState.url;

      if (
        window.confirm("Sure man?")
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}