import { Component, OnInit } from '@angular/core';
import { SafeUrlPipe } from "../safe-url.pipe";
import { NgIf, NgFor } from '@angular/common';
import { DocumentoService } from '../services/documento.service';


@Component({
  selector: 'app-mostrar-archivo',
  imports: [NgIf, SafeUrlPipe],
  templateUrl: './mostrar-archivo.component.html',
  styleUrl: './mostrar-archivo.component.scss'
})

export class MostrarArchivoComponent implements OnInit {
  textoExtraido: string = '';

  constructor(private documentoService: DocumentoService) {}


  ngOnInit(): void {
    const archivo = this.documentoService.archivoSeleccionado;
    if (!archivo) {
      this.textoExtraido = 'No hay archivo cargado.';
      return;
    }

    this.documentoService.extraerTexto(archivo).subscribe({
      next: texto => {
        this.textoExtraido = texto;
      },
      error: err => {
        this.textoExtraido = 'Error al leer el archivo.';
      }
    });
  }
}
