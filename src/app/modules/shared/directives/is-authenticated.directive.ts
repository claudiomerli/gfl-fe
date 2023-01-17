import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Subscription} from "rxjs";
import {AuthenticationState} from "../../store/state/authentication-state";
import {Store} from "@ngxs/store";

@Directive({
  selector: '[isAuthenticated]'
})
export class IsAuthenticatedDirective implements OnInit, OnDestroy {

  private hasView = false;
  private requiredRoles: string[] = []
  private subscription: Subscription | undefined = undefined;

  constructor(private authService: AuthService, private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef, private store: Store) {
  }

  @Input() set isAuthenticated(roles: string[] | '' | 'ALL') {
    this.requiredRoles = roles === '' || roles === "ALL" ? [] : roles
  }

  ngOnInit(): void {
    this.subscription = this.store.select(AuthenticationState.user)
      .subscribe((user) => {
        if (user) {
          if (this.requiredRoles.length == 0) {
            this.show();
          } else if (user.role && this.requiredRoles.includes(user.role)) {
            this.show();
          } else {
            this.hide();
          }
        } else {
          this.hide();
        }
      })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private show() {
    if (!this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    }
  }

  private hide() {
    if (this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

}
