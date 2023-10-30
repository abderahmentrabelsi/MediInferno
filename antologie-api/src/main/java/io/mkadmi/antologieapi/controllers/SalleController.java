package io.mkadmi.antologieapi.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import io.mkadmi.antologieapi.services.RDFService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/salles")  // Update the endpoint to match "salles" or your desired path
public class SalleController {
    @Autowired
    RDFService rdfService;

    @GetMapping("/list")
    public ResponseEntity<JsonNode> listSalles() {

        // Updated SPARQL query for Salle with the specified properties
        // PREFIX declarations remain the same
        String query = "PREFIX sante: <http://www.semanticweb.org/msi/ontologies/2023/9/sante_ont#>\n" +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "SELECT ?salle ?aPourNbrDePations ?estReservee ?faittravailler ?abrite ?contient\n" +
                "WHERE {\n" +
                "  ?salle rdf:type/rdfs:subClassOf* sante:Salle.\n" +
                "  OPTIONAL { ?salle sante:aPourNbrDePations ?aPourNbrDePations. }\n" +
                "  OPTIONAL { ?salle sante:estReservee ?estReservee. }\n" +
                "  OPTIONAL { ?salle sante:faittravailler ?faittravailler. }\n" +
                "  OPTIONAL { ?salle sante:abrite ?abrite. }\n" +
                "  OPTIONAL { ?salle sante:contient ?contient. }\n" +
                "}";

        return ResponseEntity.ok(rdfService.queryRDFJson(query));
    }


}
