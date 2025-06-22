import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { DocumentoService } from '../services/documento.service';

@Component({
  selector: 'app-pagina-inicial',
  imports: [NgIf, NgFor],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.scss'
})
export class PaginaInicialComponent {
  [x: string]: any;
  mensaje: string[] = [];

  constructor(private http: HttpClient, private router: Router, private documentoService: DocumentoService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];

    if (archivo) {
      this.subirArchivo(archivo);
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const archivo = event.dataTransfer?.files[0];
    if (archivo) {
      this.subirArchivo(archivo);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  subirArchivo(archivo: File): void {
    this.documentoService.archivoSeleccionado = archivo;

  this.documentoService.subirArchivo(archivo).subscribe({
    next: res => {
      this.router.navigate(['/mostrar-archivo']);
    },
    error: err => {
      this.mensaje = [
        'Error al subir el archivo, no es compatible. Pruebe a usar uno de los siguientes:',
        '  - DOC',
        '  - PDF',
        '  - DOCX',
        '  - TXT'
      ];
    }
  });
  }
}
