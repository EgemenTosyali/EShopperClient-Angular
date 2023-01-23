import { Component, ViewChild } from '@angular/core';
import { CreateProduct } from 'src/app/contracts/product/create-product';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  
  @ViewChild(ListComponent) listComponents : ListComponent

  createdProduct(createdProduct: CreateProduct){
  this.listComponents.getProducts();
  }
}

