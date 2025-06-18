import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mostrar-archivo',
  imports: [],
  templateUrl: './mostrar-archivo.component.html',
  styleUrl: './mostrar-archivo.component.scss'
})
export class MostrarArchivoComponent implements OnInit {
  nombreArchivo: string = '';

  ngOnInit(): void {
    this.nombreArchivo = localStorage.getItem('nombreArchivo') || '';
  }
}
