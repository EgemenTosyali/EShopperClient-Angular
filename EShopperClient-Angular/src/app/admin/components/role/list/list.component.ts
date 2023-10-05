import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { concatWith } from 'rxjs';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Role } from 'src/app/contracts/role/List_Role';
import { CustomToastrService, MessagePosition, MessageType } from 'src/app/services/alerts/custom-toastr.service';
import { RoleService } from 'src/app/services/common/models/role.service';
declare var $: any

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit{
  constructor(spinner: NgxSpinnerService,
    private roleService: RoleService,
     private toastrServicer: CustomToastrService,
     private dialog: MatDialog) {
   super(spinner);
 }
 displayedColumns: string[] = ['name', 'edit', 'delete'];
 dataSource: MatTableDataSource<List_Role> = null;
 @ViewChild(MatPaginator) paginator: MatPaginator;  

 async getRoles() {
  this.showSpinner(SpinnerType.Ball);
    const allRoles: { roles:List_Role[], totalRoleCount: number } = await this.roleService.getRoles(this.paginator ?
      this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5
      , () => this.hideSpinner(SpinnerType.Ball), errorMessage => this.toastrServicer.message(errorMessage, "error", {
        messageType: MessageType.Error,
        messagePosition: MessagePosition.TopRight
      }))
      this.hideSpinner(SpinnerType.Ball)

    this.dataSource = new MatTableDataSource<List_Role>(allRoles.roles);
    this.paginator.length = allRoles.totalRoleCount;
 }
 async pageChanged() {
   await this.getRoles();
 }
 async ngOnInit() {
   await this.getRoles();
 }

 delete(id, event) {
   const img: HTMLImageElement = event.srcElement;
   $(img.parentElement.parentElement).fadeOut(1500);
 }
}
