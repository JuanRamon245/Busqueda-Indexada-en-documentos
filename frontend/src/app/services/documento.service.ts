import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DocumentoService {
 private apiUrl = 'http://localhost:8080/api/documentos';

  constructor(private http: HttpClient) {}

  getDocumentos(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }

}