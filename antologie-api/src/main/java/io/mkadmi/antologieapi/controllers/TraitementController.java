package io.mkadmi.antologieapi.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import io.mkadmi.antologieapi.services.RDFService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/traitements")  // Update the endpoint to match "traitements"
public class TraitementController {
    @Autowired
    RDFService rdfService;

    @GetMapping("/list")  // You can keep the same endpoint path "/list" or update it if needed
    public ResponseEntity<JsonNode> listTraitements() {

        // Updated SPARQL query for Traitement
        // PREFIX declarations remain the same
        String query =  "PREFIX sante: <http://www.semanticweb.org/msi/ontologies/2023/9/sante_ont#>\n" +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "SELECT ?aPourNomTrait ?aPourMateriels ?aPourDureeTrait ?aPourMedicaments ?aPourUnProfDeSante\n" +
                "WHERE {\n" +
                "  ?traitement rdf:type sante:Traitement.\n" +
                "  ?traitement sante:aPourNomTrait ?aPourNomTrait.\n" +
                "  ?traitement sante:aPourMateriels ?aPourMateriels.\n" +
                "  ?traitement sante:aPourDureeTrait ?aPourDureeTrait.\n" +
                "  ?traitement sante:aPourMedicaments ?aPourMedicaments.\n" +
                "  ?traitement sante:aPourUnProfDeSante ?aPourUnProfDeSante.\n" +
                "}";

        return ResponseEntity.ok(rdfService.queryRDFJson(query));
    }
}
