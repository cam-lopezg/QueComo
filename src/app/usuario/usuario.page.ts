import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  nombreUsuario: string = '';
  emailUsuario: string = '';

  constructor() { }

  ngOnInit() {
    // Obtener los datos del usuario desde localStorage
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || 'Usuario';
    this.emailUsuario = localStorage.getItem('emailUsuario') || 'usuario@ejemplo.com';
  }
}
