import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-playerdialog',
  templateUrl: './add-playerdialog.component.html',
  styleUrls: ['./add-playerdialog.component.scss']
})
export class AddPlayerdialogComponent implements OnInit {
  name: string = '';
  constructor(private dialogRef: MatDialogRef<AddPlayerdialogComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
