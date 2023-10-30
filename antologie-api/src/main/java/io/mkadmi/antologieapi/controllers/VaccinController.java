package io.mkadmi.antologieapi.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import io.mkadmi.antologieapi.services.RDFService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/vaccins")
@CrossOrigin("*")
public class VaccinController {

    @Autowired
    RDFService rdfService;

    @GetMapping("/list")
    public ResponseEntity<JsonNode> listVaccin() {

        //language=SPARQL
        String query = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "PREFIX sante: <http://www.semanticweb.org/msi/ontologies/2023/9/sante_ont#>\n\n" +
                "SELECT ?vaccin ?aPournom ?aPourinjection  ?aDeseffetsecondaires\n" +
                "WHERE {\n" +
                "  ?vaccin rdf:type/rdfs:subClassOf* sante:Vaccin ;\n" +
                "          sante:aPourNom ?aPournom ;\n" +
                "          sante:aPourInjection ?aPourinjection ;\n" +
                "          sante:aDesEffetsSecondaires ?aDeseffetsecondaires ;\n" +
                "}";

        return ResponseEntity.ok(rdfService.queryRDFJson(query));
    }
}
