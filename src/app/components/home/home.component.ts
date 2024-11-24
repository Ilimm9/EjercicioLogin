import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatChipsModule} from '@angular/material/chips';
import { Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';  
import { MatSidenav } from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';

import Swal from 'sweetalert2';
import { UsuariolocalService } from '../../services/usuariolocal.service';
import { Usuarios } from '../../models/usuarios';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule,
    MatCardModule, MatChipsModule, MatProgressBarModule,RouterOutlet,
    MatSidenavModule, MatCheckboxModule,FormsModule,MatListModule,
   MatMenuModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  usuario:Usuarios|null;

  @ViewChild('sidenav') sidenav!: MatSidenav; 
  isSidenavOpen = false; 
  
  toggleSidenav(){ 
    this.isSidenavOpen = !this.isSidenavOpen; }
  constructor (private router:Router, public usuariolocal:UsuariolocalService){
    this.usuario = this.usuariolocal.getUsuario();
    if(this.usuario!==null){
      console.log(this.usuario.name);
    }

  }
  Salir(){
    Swal.fire({
      title: '¿Seguro de salir?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, salir!',
      cancelButtonText: 'Cancelar'
    }).then((result)=>{
      if (result.isConfirmed) {
        this.usuariolocal.clearUsuario();
      this.router.navigate(['/login']);
    }})
  }
  moon(){
    this.router.navigate(['/home/moon']);  
  }
  user(){
    this.router.navigate(['/home/usuarios']);  
  }
}

