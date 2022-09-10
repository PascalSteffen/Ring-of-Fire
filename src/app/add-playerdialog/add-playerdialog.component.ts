import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-playerdialog',
  templateUrl: './add-playerdialog.component.html',
  styleUrls: ['./add-playerdialog.component.scss']
})
export class AddPlayerdialogComponent implements OnInit {
  name: string = '';
  constructor(public dialogRef: MatDialogRef<AddPlayerdialogComponent>) { }

  ngOnInit(): void {
  }


  /**
   * function to close the pop-up.
   *
   */
  public onNoClick(): void {
    this.dialogRef.close();
  }

}
