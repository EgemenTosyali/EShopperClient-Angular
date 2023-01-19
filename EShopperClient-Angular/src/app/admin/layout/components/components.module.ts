import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import { SliderComponent } from './slider/slider.component';



@NgModule({
  declarations: [
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
    SidebarComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule
  ],
  exports:[
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
    SliderComponent
  ]
})
export class ComponentsModule { }
