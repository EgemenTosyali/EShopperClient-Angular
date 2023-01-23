import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/product/list-product';
import { CustomToastrService, MessagePosition, MessageType } from 'src/app/services/alerts/custom-toastr.service';
import { ProductService } from 'src/app/services/common/product.service';
declare var $: any

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private productService: ProductService, private toastrServicer: CustomToastrService) {
    super(spinner);
  }
  displayedColumns: string[] = ['name', 'stock', 'price', 'createDate', 'updateDate', 'edit', 'delete'];
  dataSource: MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts() {
    this.showSpinner(SpinnerType.Ball);
    const allProducts: { totalCount: number, products: List_Product[] } = await this.productService.get(this.paginator ?
      this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5
      , () => this.hideSpinner(SpinnerType.Ball), errorMessage => this.toastrServicer.message(errorMessage, "error", {
        messageType: MessageType.Error,
        messagePosition: MessagePosition.TopRight
      }))
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length = allProducts.totalCount;
  }
  async pageChanged() {
    await this.getProducts();
  }
  async ngOnInit() {
    await this.getProducts();
  }

  delete(id, event) {
    const img: HTMLImageElement = event.srcElement;
    $(img.parentElement.parentElement).fadeOut(1500);
  }
}
