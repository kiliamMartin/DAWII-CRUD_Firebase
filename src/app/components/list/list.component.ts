import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onSearch(event : KeyboardEvent){

  }
  openDeleteDialog() {
    const myCompDialog = this.dialog.open(DeleteDialogComponent);
    myCompDialog.afterClosed().subscribe((result) => {
      switch (result) {
        case 'close':
          console.log('close');
          break 
        case "delete":
          console.log("delete")
          
          break
        
        default:
          console.log("undefined")
          break
         
      }
      
    });
  }

}
