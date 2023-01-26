import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EShopperClient-Angular';
  visibleSlider: boolean = false;
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      this.visibleSlider = router.url == "/" ? true : false;
    })
  }

}