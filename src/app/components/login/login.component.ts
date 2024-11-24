import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { merge } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Usuarios } from '../../models/usuarios';
import Swal from 'sweetalert2';
import { UsuariolocalService } from '../../services/usuariolocal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required]);
  errorMessage = signal('');
  errorgralMessage = signal('');
  loading = signal(false);

  users: any[] = [];
  constructor(private router: Router, private userService: UserService,private userlocalService: UsuariolocalService) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('Campo requerido');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Formato de correo no valido');
    } else {
      this.errorMessage.set('');
    }
  }
  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  login() {
    const email = this.email.value;
    const password = this.password.value;

    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor ingrese correo y contraseña',
      });
      return;
    }
    this.loading.set(true);
    // console.log(this.users);
    // console.log(email+ "," +password);

    let entrada = false;
    for (let user of this.users) {
      // console.log(user.email+ "," +user.password);
      if (user.email === email && user.password === password) {
        this.userlocalService.setUsuario(user);
        
        entrada = true;
        break;
      }
    }

    if (entrada) {
      Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        text: 'Registro exitoso',
      })
        this.router.navigate(['/home']);
      
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Credenciales incorrectas',
        icon: 'error',
      });
    }
  }
}
