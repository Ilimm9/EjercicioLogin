import {Component,OnInit,ChangeDetectionStrategy,ViewChild,inject} from '@angular/core';
import { MoonService } from '../../services/moon.service';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Moon } from '../../models/moon';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MoonDialogComponent } from './moon-dialog/moon-dialog.component';
import { DialogRef } from '@angular/cdk/dialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-moon',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './moon.component.html',
  styleUrl: './moon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoonComponent implements OnInit {

  apodData: any[] = [];
  displayedColumns: string[] = ['id', 'url', 'title', 'action'];
  dataSource = new MatTableDataSource<Moon>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private moonService: MoonService) {}

  ngOnInit(): void {  
    this.moonService.getAPOD().subscribe(
      (data) => {
        console.log('Datos recibidos:', data);
        this.apodData = data.map((item, index) => ({
          id: index + 1,
          ...item,
        }));
        this.dataSource.data = this.apodData; // Asigna datos
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  readonly dialog = inject(MatDialog);
  ver(row: any): void {
    const dialogRef = this.dialog.open(MoonDialogComponent, {
      data: { row, isViewMode: true },
    });
  }
  editar(row: any): void {
    const dialogRef = this.dialog.open(MoonDialogComponent, {
      width:'800px',
      data: { row, isViewMode: false },
    }  

  );
  dialogRef.afterClosed().subscribe(()=>{
    this.dataSource._updateChangeSubscription();
  })

  }
  eliminar(id: number): void {
    Swal.fire({
      title: '¿Seguro de eliminarlo?',
      text: "Se eliminara de manera permanente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataSource.data = this.dataSource.data.filter(
          (item) => item.id !== id
        );
        this.dataSource._updateChangeSubscription();
        Swal.fire(
          'Eliminado!',
          'El elemento ha sido eliminado.',
          'success'
        );
      }
    });
  }
  
}
