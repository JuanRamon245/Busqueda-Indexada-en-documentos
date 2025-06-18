package com.busquedaindexada.backend.controller;

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

        try {
            String nombreArchivo = file.getOriginalFilename();
            long tamaño = file.getSize();
            System.out.println("Archivo recibido: " + nombreArchivo + " (" + tamaño + " bytes)");

            return ResponseEntity.ok("Archivo '" + nombreArchivo + "' subido correctamente.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al subir el archivo: " + e.getMessage());
        }
    }
}