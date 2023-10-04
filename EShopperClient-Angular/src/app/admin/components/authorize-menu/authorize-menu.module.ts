import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizeMenuComponent } from './authorize-menu.component';
import { RouterModule } from '@angular/router';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogsModule } from 'src/app/dialogs/dialogs.module';



@NgModule({
  declarations: [
    AuthorizeMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component: AuthorizeMenuComponent}
    ]),
    MatTreeModule,MatIconModule,MatButtonModule,DialogsModule
  ]
})
export class AuthorizeMenuModule { }
