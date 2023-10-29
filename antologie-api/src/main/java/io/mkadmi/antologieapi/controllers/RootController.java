package io.mkadmi.antologieapi.controllers;

import io.mkadmi.antologieapi.dto.QueryDTO;
import io.mkadmi.antologieapi.services.RDFService;
import io.mkadmi.antologieapi.utils.JSONConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;

@Controller()
@RequestMapping("/sparql")
public class RootController {
    @Autowired
    private RDFService rdfService;

    @PostMapping("/raw")
    public ResponseEntity<String> queryRDFRaw(@RequestBody QueryDTO payload) throws IOException {
        String result = rdfService.queryRDFRaw(payload.getQuery());
        return ResponseEntity.ok(result);
    }

    @PostMapping("/formatted")
    public ResponseEntity<String> queryRDFFormatted(@RequestBody QueryDTO payload) throws IOException {
        String result = rdfService.queryRDFRaw(payload.getQuery());
        return ResponseEntity.ok(JSONConverter.convertSPARQLtoRegularJSON(result));
    }
}
