package io.mkadmi.antologieapi.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import io.mkadmi.antologieapi.services.RDFService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/etablissement")
public class EtablissementController {
    @Autowired
    RDFService rdfService;

    @GetMapping("/list")
    public ResponseEntity<JsonNode> listEtablissement() {

        //language=SPARQL
        String query =
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "SELECT ?etablissement WHERE {" +
                        "  ?etablissement rdf:type <http://www.semanticweb.org/msi/ontologies/2023/9/sante_ont#Etablissement_de_sante> ." +
                        "}";

        return ResponseEntity.ok(rdfService.queryRDFJson(query));
    }
}
