import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DocumentoService } from './services/documento.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent implements OnInit {
  title = 'frontend';

  respuesta: string = 'Cargando...';

  constructor(private documentoService: DocumentoService) {}

  ngOnInit(): void {
    this.documentoService.getDocumentos().subscribe({
      next: (res) => this.respuesta = res,
      error: (err) => console.error('Error:', err)
    });
  }
}
