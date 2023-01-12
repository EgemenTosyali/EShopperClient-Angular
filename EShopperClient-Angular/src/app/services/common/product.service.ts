import { Injectable } from '@angular/core';
import { CreateProduct } from 'src/app/contracts/product/create-product';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClientService) { }

  create(product: CreateProduct){
    this.httpClient.post({controller: "product"},product).subscribe();
  }
}
