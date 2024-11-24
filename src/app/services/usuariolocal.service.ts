import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuarios } from '../models/usuarios';
@Injectable({
  providedIn: 'root'
})
export class UsuariolocalService {

  private readonly STORAGE_KEY = 'usuario'; // Clave para el localStorage
  private usuarioSubject = new BehaviorSubject<Usuarios | null>(this.loadUsuarioFromStorage());

  // Método para establecer el usuario y guardarlo en localStorage
  setUsuario(usuario: Usuarios): void {
    this.usuarioSubject.next(usuario);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuario));
  }

  // Método para obtener el usuario actual
  getUsuario(): Usuarios | null {
    return this.usuarioSubject.value;
  }

  // Observable para escuchar los cambios en el usuario
  getUsuarioObservable() {
    return this.usuarioSubject.asObservable();
  }

  // Método para eliminar el usuario tanto del estado como del localStorage
  clearUsuario(): void {
    this.usuarioSubject.next(null);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Carga inicial del usuario desde localStorage
  private loadUsuarioFromStorage(): Usuarios | null {
    const usuarioString = localStorage.getItem(this.STORAGE_KEY);
    return usuarioString ? JSON.parse(usuarioString) : null;
  }


  constructor() { }
}
