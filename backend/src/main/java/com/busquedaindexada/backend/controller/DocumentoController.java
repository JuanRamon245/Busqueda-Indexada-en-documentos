package com.busquedaindexada.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/documentos")
public class DocumentoController {

    @GetMapping
    public String listar() {
        return "Perfil Foto";
    }

    @PostMapping("/upload")
    public ResponseEntity<String> subirArchivo(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Archivo vacío");
        }

        List<String> tiposPermitidos = List.of(
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "text/plain");

        String tipoArchivo = file.getContentType();
        String nombreArchivo = file.getOriginalFilename();
        long tamaño = file.getSize();

        System.out.println("Archivo recibido: " + nombreArchivo + " (" + tamaño + " bytes)");
        System.out.println("Tipo MIME: " + tipoArchivo);

        if (!tiposPermitidos.contains(tipoArchivo)) {
            return ResponseEntity
                    .badRequest()
                    .body("Archivo no compatible. Solo se permiten archivos de texto como PDF, DOC, DOCX o TXT.");
        }

        return ResponseEntity.ok("Archivo '" + nombreArchivo + "' subido correctamente.");
    }
}