import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/common/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  visibleSlider: boolean = false;
  constructor(private router: Router,private authService: AuthService) {
    authService.authChecker()
    this.router.events.subscribe(event => {
      this.visibleSlider = router.url == "/" ? true : false;
    })
  }

}