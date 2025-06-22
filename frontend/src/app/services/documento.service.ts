import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DocumentoService {
 private apiUrl = 'http://localhost:8080/api/documentos';

 archivoSeleccionado?: File;

  constructor(private http: HttpClient) {}

  getDocumentos(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }

  subirArchivo(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post('http://localhost:8080/api/documentos/upload', formData, { responseType: 'text' });
  }

  extraerTexto(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post('http://localhost:8080/api/documentos/extraer-texto', formData, { responseType: 'text' });
  }


}