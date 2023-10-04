import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/product/create-product';
import { CustomToastrService, MessagePosition, MessageType } from 'src/app/services/alerts/custom-toastr.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { RoleService } from 'src/app/services/common/models/role.service';
import { ProductService } from 'src/app/services/common/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(private roleService: RoleService, private customToastr: CustomToastrService, spinner: NgxSpinnerService ) { 
    super(spinner)
  }
  ngOnInit(): void {}
  
  @Output() createdRole: EventEmitter<string> = new EventEmitter();
  

  create(name: HTMLInputElement) {
    this.showSpinner(SpinnerType.Square)
    this.roleService.createRole(name.value, () => {
      this.customToastr.message("Role Created Successfully", "Success", { messagePosition: MessagePosition.TopCenter, messageType: MessageType.Success })
      this.createdRole.emit(name.value);
    }, errorMessage => {
      this.customToastr.message(errorMessage, "Error", { messagePosition: MessagePosition.TopCenter, messageType: MessageType.Error })
    });
  }
}
