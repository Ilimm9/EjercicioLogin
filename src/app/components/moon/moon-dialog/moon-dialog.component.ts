import { CommonModule } from '@angular/common';
import { Component,ChangeDetectionStrategy,Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MAT_DIALOG_DATA,MatDialogRef
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Moon } from '../../../models/moon';
import Swal from 'sweetalert2';
//  isViewMode: boolean; 
@Component({
  selector: 'app-moon-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, 
    MatDialogClose, MatButtonModule,MatCardModule,CommonModule,FormsModule,
  MatFormFieldModule,MatInputModule,MatCardModule],
  templateUrl: './moon-dialog.component.html',
  styleUrl: './moon-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class MoonDialogComponent {
  moon:Moon;
  isEditMode:boolean;

  constructor( public dialogRef: MatDialogRef<MoonDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any ) {
      this.moon = data.row;
      this.isEditMode = data.isViewMode;
     }

  guardarCambios():void{
    Swal.fire({
      title: 'Guardar cambios',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar!',
      cancelButtonText: 'Cancelar'
    }).then((result)=>{
      if (result.isConfirmed) {
        this.dialogRef.close(this.data);
      }})
  }
  salirModal():void{
    this.dialogRef.close();
  }
}
