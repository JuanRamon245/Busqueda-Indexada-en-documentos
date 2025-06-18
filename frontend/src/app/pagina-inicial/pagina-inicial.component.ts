import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-pagina-inicial',
  imports: [NgIf],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.scss'
})
export class PaginaInicialComponent {
  mensaje: string = '';

  constructor(private http: HttpClient) {}

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
    const formData = new FormData();
    formData.append('file', archivo);

    this.http.post('http://localhost:8080/api/documentos/upload', formData, { responseType: 'text' })
      .subscribe({
        next: res => this.mensaje = res,
        error: err => this.mensaje = 'Error al subir el archivo'
      });
  }
}
