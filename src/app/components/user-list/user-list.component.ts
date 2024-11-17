import { AfterViewInit,Component, OnInit,ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Usuarios } from '../../models/usuarios';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,MatTableModule, MatPaginatorModule,MatFormFieldModule, MatInputModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [ 'id','name', 'email', 'role'];
  dataSource = new MatTableDataSource<Usuarios>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  users: any[] = [];
  constructor(private userService: UserService) {}
  ngOnInit(): void {
  this.userService.getUsers().subscribe(data => {
  this.users = data;
  this.dataSource.data = this.users;
  });
}
}


