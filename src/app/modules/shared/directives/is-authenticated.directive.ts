import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Subscription} from "rxjs";

@Directive({
  selector: '[isAuthenticated]'
})
export class IsAuthenticatedDirective implements OnInit, OnDestroy {

  private hasView = false;
  private requiredRoles: string[] = []
  private subscription: Subscription | undefined = undefined;

  constructor(private authService: AuthService, private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  @Input() set isAuthenticated(roles: string[] | '') {
    this.requiredRoles = roles == '' ? [] : roles
  }

  ngOnInit(): void {
    this.subscription = this.authService
      .currentUser
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
      console.log("Show")
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    }
  }

  private hide() {
    if (this.hasView) {
      console.log("Hide")
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

}
