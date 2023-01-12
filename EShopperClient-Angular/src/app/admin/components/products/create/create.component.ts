import { Component } from '@angular/core';
import { CreateProduct } from 'src/app/contracts/product/create-product';
import { ProductService } from 'src/app/services/common/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  constructor(private productService: ProductService) { }

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    const create_product: CreateProduct = new CreateProduct();
    create_product.name = name.value;
    create_product.price = parseFloat(price.value);
    create_product.stock = parseInt(stock.value)

    this.productService.create(create_product)
  }
}
