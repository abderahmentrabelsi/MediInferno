package io.mkadmi.antologieapi.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import io.mkadmi.antologieapi.services.RDFService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/traitements")  // Update the endpoint to match "traitements"
public class TraitementController {
    @Autowired
    RDFService rdfService;

    @GetMapping("/list")  // You can keep the same endpoint path "/list" or update it if needed
    public ResponseEntity<JsonNode> listTraitements() {

        // Updated SPARQL query for Traitement
        // PREFIX declarations remain the same
        String query = "PREFIX sante: <http://www.semanticweb.org/msi/ontologies/2023/9/sante_ont#>\n" +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "SELECT ?aPourNomTrait ?aPourMateriels ?aPourDureeTrait ?aPourMedicaments ?aPourUnProfDeSante\n" +
                "WHERE {\n" +
                "  ?traitement rdf:type/rdfs:subClassOf* sante:Traitement.\n" +
                "  ?traitement sante:aPourNomTrait ?aPourNomTrait.\n" +
                "  ?traitement sante:aPourMateriels ?aPourMateriels.\n" +
                "  ?traitement sante:aPourDureeTrait ?aPourDureeTrait.\n" +
                "  ?traitement sante:aPourMedicaments ?aPourMedicaments.\n" +
                "  ?traitement sante:aPourUnProfDeSante ?aPourUnProfDeSante.\n" +
                "}";

        return ResponseEntity.ok(rdfService.queryRDFJson(query));
    }

    @GetMapping("/listByProfessor/{professorName}")
    public ResponseEntity<JsonNode> listTraitementsByProfessor(@PathVariable String professorName) {
        // Updated SPARQL query for Traitement filtered by professor name
        String query = "PREFIX sante: <http://www.semanticweb.org/msi/ontologies/2023/9/sante_ont#>\n" +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "SELECT ?aPourNomTrait ?aPourMateriels ?aPourDureeTrait ?aPourMedicaments ?aPourUnProfDeSante\n" +
                "WHERE {\n" +
                "  ?traitement rdf:type/rdfs:subClassOf* sante:Traitement.\n" +
                "  ?traitement sante:aPourNomTrait ?aPourNomTrait.\n" +
                "  ?traitement sante:aPourMateriels ?aPourMateriels.\n" +
                "  ?traitement sante:aPourDureeTrait ?aPourDureeTrait.\n" +
                "  ?traitement sante:aPourMedicaments ?aPourMedicaments.\n" +
                "  ?traitement sante:aPourUnProfDeSante ?aPourUnProfDeSante.\n" +
                "  FILTER(STR(?aPourUnProfDeSante) = \"" + professorName + "\")\n" +
                "}";

        return ResponseEntity.ok(rdfService.queryRDFJson(query));
    }


    @GetMapping("/list/{traitName}")
    public ResponseEntity<JsonNode> findTraitementByTraitName(@PathVariable String traitName) {
        try {
            // SPARQL query to find a specific treatment by aPourNomTrait
            String query = "PREFIX sante: <http://www.semanticweb.org/msi/ontologies/2023/9/sante_ont#>\n" +
                    "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                    "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                    "SELECT ?aPourNomTrait ?aPourMateriels ?aPourDureeTrait ?aPourMedicaments ?aPourUnProfDeSante\n" +
                    "WHERE {\n" +
                    "  ?traitement rdf:type/rdfs:subClassOf* sante:Traitement.\n" +
                    "  ?traitement sante:aPourNomTrait ?aPourNomTrait.\n" +
                    "  ?traitement sante:aPourMateriels ?aPourMateriels.\n" +
                    "  ?traitement sante:aPourDureeTrait ?aPourDureeTrait.\n" +
                    "  ?traitement sante:aPourMedicaments ?aPourMedicaments.\n" +
                    "  ?traitement sante:aPourUnProfDeSante ?aPourUnProfDeSante.\n" +
                    "  FILTER(STR(?aPourNomTrait) = \"" + traitName + "\")\n" +
                    "}";

            return ResponseEntity.ok(rdfService.queryRDFJson(query));
        } catch (Exception e) {
            return ResponseEntity.status(500).build(); // Return a 500 Internal Server Error response
        }
    }



}
