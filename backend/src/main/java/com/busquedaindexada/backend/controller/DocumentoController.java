package com.busquedaindexada.backend.controller;

import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/documentos")
public class DocumentoController {

    @GetMapping
    public String listar() {
        return "Lista de documentos";
    }
}