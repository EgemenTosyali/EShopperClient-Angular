import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/common/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  authCheck: boolean
  constructor(public authService: AuthService) {
  }
}
