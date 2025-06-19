import { Component, OnInit } from '@angular/core';
import { SafeUrlPipe } from "../safe-url.pipe";
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-mostrar-archivo',
  imports: [NgIf, SafeUrlPipe],
  templateUrl: './mostrar-archivo.component.html',
  styleUrl: './mostrar-archivo.component.scss'
})
export class MostrarArchivoComponent implements OnInit {
  nombreArchivo: string = '';

  ngOnInit(): void {
    this.nombreArchivo = localStorage.getItem('nombreArchivo') || '';
  }
}
