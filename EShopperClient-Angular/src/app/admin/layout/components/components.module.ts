import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';



@NgModule({
  declarations: [
    FooterComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule
  ],
  exports:[
    FooterComponent,
    SidebarComponent,
    HeaderComponent
  ]
})
export class ComponentsModule { }
