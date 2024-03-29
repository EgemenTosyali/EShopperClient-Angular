import { NgxSpinnerService } from "ngx-spinner";

export class BaseComponent {
  constructor(public spinner: NgxSpinnerService) {}

  showSpinner(spinnerType: SpinnerType){
    this.spinner.show(spinnerType);
    setTimeout(()=> this.hideSpinner(spinnerType),1000);
  }

  hideSpinner(spinnerType: SpinnerType){
    this.spinner.hide(spinnerType);
  }
}

export enum SpinnerType{
  Fire = "fire",
  Square = "square-jelly-box",
  Ball = "ball-spin-rotate"
}
