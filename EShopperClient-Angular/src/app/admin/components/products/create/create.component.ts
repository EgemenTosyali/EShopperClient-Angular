import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/product/create-product';
import { CustomToastrService, MessagePosition, MessageType } from 'src/app/services/alerts/custom-toastr.service';
import { ProductService } from 'src/app/services/common/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit{
  constructor(private productService: ProductService, private customToastr: CustomToastrService, spinner: NgxSpinnerService ) { 
    super(spinner)
  }
  ngOnInit(): void {}

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    const create_product: CreateProduct = new CreateProduct();
    create_product.name = name.value;
    create_product.price = parseFloat(price.value);
    create_product.stock = parseInt(stock.value);

    this.showSpinner(SpinnerType.Square)
    this.productService.create(create_product, () => {
      this.customToastr.message("Product Created Successfully", "Success", { messagePosition: MessagePosition.TopCenter, messageType: MessageType.Success })
    }, errorMessage => {
      this.customToastr.message(errorMessage, "Error", { messagePosition: MessagePosition.TopCenter, messageType: MessageType.Error })
    });
  }
}
