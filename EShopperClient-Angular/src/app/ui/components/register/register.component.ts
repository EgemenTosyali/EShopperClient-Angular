import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_User } from 'src/app/contracts/product/users/create_user';
import { CustomToastrService, MessagePosition, MessageType } from 'src/app/services/alerts/custom-toastr.service';
import { UserService } from 'src/app/services/common/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private customToastr: CustomToastrService) {
    super(spinner);
  }

  formGroup: FormGroup;

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ["", [
        Validators.required,
        Validators.maxLength(40),
        Validators.minLength(3),
        Validators.email
      ]],
      name: ["", [
        Validators.required,
        Validators.maxLength(40),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z]+$')]],
      surname: ["", [
        Validators.required,
        Validators.maxLength(40),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z]+$')]],
      userName: ["", [
        Validators.required,
        Validators.maxLength(40),
        Validators.minLength(3)]],
      password: ["", [
        Validators.required]],
      passwordValidator: ["", [
        Validators.required]]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let password = group.get("password").value;
        let passwordValidate = group.get("passwordValidator").value;
        return password == passwordValidate ? null : { notSame: true };
      }
    })
  }
  submitted: boolean = false;
  get component() {
    return this.formGroup.controls;
  }

  checkInputs(){
    
  }

  async onSubmit(user: any) {
    this.submitted = true;

    if (this.formGroup.invalid)
      return;

    this.showSpinner(SpinnerType.Ball)

    const result: Create_User = await this.userService.create(user);
    if (result.succeeded) {
      this.hideSpinner(SpinnerType.Ball)
      this.customToastr.message(result.message, "Success", {
        messagePosition: MessagePosition.TopRight,
        messageType: MessageType.Success
      })
    }
    else {
      this.hideSpinner(SpinnerType.Ball)
      this.customToastr.message(result.message, "Error", {
        messagePosition: MessagePosition.TopRight,
        messageType: MessageType.Error
      })
    }
  }
}
