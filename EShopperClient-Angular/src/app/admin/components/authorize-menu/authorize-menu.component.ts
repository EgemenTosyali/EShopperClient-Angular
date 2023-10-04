import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Menu } from 'src/app/contracts/application-configurations/menu';
import { AuthorizeMenuDialogComponent } from 'src/app/dialogs/authorize-menu-dialog/authorize-menu-dialog.component';
import { CommonDialogComponent, ConfirmState } from 'src/app/dialogs/common-dialog/common-dialog.component';
import { ApplicationService } from 'src/app/services/common/models/application.service';

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-authorize-menu',
  templateUrl: './authorize-menu.component.html',
  styleUrls: ['./authorize-menu.component.scss']
})

export class AuthorizeMenuComponent implements OnInit {
  
  constructor(private applicationService: ApplicationService, private dialog : MatDialog) {
  }
  assignRole(code: string, name: string){
    const dialogRef = this.dialog.open(AuthorizeMenuDialogComponent, {
      width: '700px',
      data: {code,name}
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result.confirmState == ConfirmState.No)
        this.dialog.closeAll();
    })
  }

  async ngOnInit() {
    this.dataSource.data = await (await this.applicationService.getAuthorizationDefinitionEndpoints()).map(m => {
      const treeMenu : ITreeMenu = {
        name : m.name,
        actions : m.actions.map(a => {
          const _treeMenu: ITreeMenu = {
            name: a.definition,
            code: a.code
          }
          return _treeMenu
        })
      }
      return treeMenu
    });
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener((menu: ITreeMenu, level: number) => {
    return {
      expandable: menu.actions?.length > 0,
      name: menu.name,
      level: level,
      code: menu.code
    };
  },
    menu => menu.level,
    menu => menu.expandable,
    menu => menu.actions
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}

interface ITreeMenu{
  name?: string;
  actions?: ITreeMenu[];
  code?: string;
}
