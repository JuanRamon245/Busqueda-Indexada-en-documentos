package com.busquedaindexada.backend.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.hwpf.HWPFDocument;
import org.apache.poi.hwpf.extractor.WordExtractor;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
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

    private final Path directorioSubidas = Paths.get("uploads");

    public DocumentoController() {
        try {
            Files.createDirectories(directorioSubidas); // crea el directorio si no existe
        } catch (IOException e) {
            throw new RuntimeException("No se pudo crear el directorio para subir archivos", e);
        }
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
        String nombreArchivo = Path.of(file.getOriginalFilename()).getFileName().toString();

        System.out.println("Archivo recibido: " + nombreArchivo + " (" + file.getSize() + " bytes)");
        System.out.println("Tipo MIME: " + tipoArchivo);

        if (!tiposPermitidos.contains(tipoArchivo)) {
            return ResponseEntity
                    .badRequest()
                    .body("Archivo no compatible. Solo se permiten archivos de texto como PDF, DOC, DOCX o TXT.");
        }

        try {
            Path rutaArchivo = directorioSubidas.resolve(nombreArchivo);
            Files.copy(file.getInputStream(), rutaArchivo, StandardCopyOption.REPLACE_EXISTING);
            return ResponseEntity.ok(nombreArchivo); // Devuelve solo el nombre para que el frontend lo use
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error al guardar el archivo.");
        }
    }

    @GetMapping("/archivo/{nombreArchivo:.+}")
    public ResponseEntity<Resource> verArchivo(@PathVariable String nombreArchivo) {
        try {
            Path rutaArchivo = directorioSubidas.resolve(nombreArchivo).normalize();
            Resource recurso = new UrlResource(rutaArchivo.toUri());

            if (!recurso.exists()) {
                return ResponseEntity.notFound().build();
            }

            String tipoMime = Files.probeContentType(rutaArchivo);
            tipoMime = tipoMime != null ? tipoMime : "application/octet-stream";

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(tipoMime))
                    .body(recurso);

        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/extraer-texto")
    public ResponseEntity<String> extraerTexto(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Archivo vacío");
        }

        try {
            String tipo = file.getContentType();
            String textoExtraido = "";

            switch (tipo) {
                case "application/pdf":
                    try (PDDocument pdf = PDDocument.load(file.getInputStream())) {
                        PDFTextStripper stripper = new PDFTextStripper();
                        textoExtraido = stripper.getText(pdf);
                    }
                    break;

                case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    try (XWPFDocument docx = new XWPFDocument(file.getInputStream())) {
                        XWPFWordExtractor extractor = new XWPFWordExtractor(docx);
                        textoExtraido = extractor.getText();
                    }
                    break;

                case "application/msword":
                    try (HWPFDocument doc = new HWPFDocument(file.getInputStream())) {
                        WordExtractor extractor = new WordExtractor(doc);
                        textoExtraido = extractor.getText();
                    }
                    break;

                case "text/plain":
                    textoExtraido = new String(file.getBytes());
                    break;

                default:
                    return ResponseEntity.badRequest().body("Tipo de archivo no soportado");
            }

            return ResponseEntity.ok(textoExtraido);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error al procesar el archivo: " + e.getMessage());
        }
    }
}