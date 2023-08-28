import { Component, OnInit } from '@angular/core';
import { HubUrls } from 'src/app/constants/hub-urls';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { CustomToastrService, MessagePosition, MessageType } from 'src/app/services/alerts/custom-toastr.service';
import { SignalrService } from 'src/app/services/common/signalr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private signalRService: SignalrService, private customToastr: CustomToastrService) {
    signalRService.start(HubUrls.ProductHub);
  }
  ngOnInit(): void {
    this.signalRService.on(ReceiveFunctions.ProductAddedMEssageReceiveFunction, message => {
      this.customToastr.message(message, "Hub", {
        messagePosition: MessagePosition.TopRight,
        messageType: MessageType.Warning
      })
    });
  }

}
