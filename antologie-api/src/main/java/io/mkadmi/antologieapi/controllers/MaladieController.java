package io.mkadmi.antologieapi.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import io.mkadmi.antologieapi.services.RDFService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/maladies")
public class MaladieController {

    @Autowired
    RDFService rdfService;

    @GetMapping("/list")
    public ResponseEntity<JsonNode> listMaladies() {

        // SPARQL query with provided prefixes
        String query = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "PREFIX sante: <http://www.semanticweb.org/msi/ontologies/2023/9/sante_ont#>\n\n" +
                "SELECT ?maladie ?aPoursymptome ?aTraitement\n" +
                "WHERE {\n" +
                "  ?maladie rdf:type sante:Maladie ;\n" +
                "          sante:aPourSymptomes ?aPoursymptome ;\n" +
                "          sante:aUnTraitement ?aTraitement .\n" +
                "}";

        return ResponseEntity.ok(rdfService.queryRDFJson(query));
    }
}
