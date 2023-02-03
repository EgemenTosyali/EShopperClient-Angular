import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CommonDialogComponent, ConfirmState } from 'src/app/dialogs/common-dialog/common-dialog.component';
import { CustomToastrService, MessagePosition, MessageType } from '../../alerts/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent extends BaseComponent {
  url: any;
  constructor(private httpClientService: HttpClientService,
    private customToastr: CustomToastrService,
    private dialog: MatDialog,
    spinner: NgxSpinnerService) {
    super(spinner)
  }
  public files: NgxFileDropEntry[];
  @Input() options: Partial<FileUploadOptions>

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.openDialog(async () => {

      this.spinner.show(SpinnerType.Square)
      this.files = files;
      const fileData: FormData = new FormData();
      for (const file of files) {
        (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
          fileData.append(_file.name, _file, file.relativePath);
        })
      }
      this.httpClientService.post({
        controller: this.options.controller,
        action: this.options.action,
        queryString: this.options.queryString,
        headers: new HttpHeaders({ "responseType": "blob" })
      }, fileData).subscribe(data => {
        this.customToastr.message("Files Uploaded Succesfuly", "Success", {
          messagePosition: MessagePosition.TopRight,
          messageType: MessageType.Success
        })
        this.spinner.hide(SpinnerType.Square)
      }, (errorResponse: HttpErrorResponse) => {
        this.customToastr.message(errorResponse.message, "Error", {
          messagePosition: MessagePosition.TopRight,
          messageType: MessageType.Error
        })
        this.spinner.hide(SpinnerType.Square)
      })
    })
  }
  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: '300px',
      data: { title: "Upload Warning!", message: "Are you sure for upload this files", confirmState: ConfirmState.Yes }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result.confirmState == ConfirmState.Yes)
        afterClosed();
    })
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
}