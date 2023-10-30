package io.mkadmi.antologieapi.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import io.mkadmi.antologieapi.services.RDFService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/product")
public class ProductController {
    @Autowired
    RDFService rdfService;

    @GetMapping("/list")
    public ResponseEntity<JsonNode> listProduct() {

        //language=SPARQL
        String query=
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                        "PREFIX sante: <http://www.semanticweb.org/msi/ontologies/2023/9/sante_ont#>\n" +
                        "SELECT ?aPourNom ?aAvecDosage ?aDesEffetsSecondaires ?aDesInstructions ?pharmacieName\n" +
                        "WHERE {\n" +
                        "  ?produit_pharmaceutique rdf:type/rdfs:subClassOf* sante:Produit_Pharmaceutique ;\n" +
                        "                        sante:aPourNom ?aPourNom ;\n" +
                        "                        sante:aAvecDosage ?aAvecDosage ;\n" +
                        "                        sante:aDesEffetsSecondaires ?aDesEffetsSecondaires ;\n" +
                        "                        sante:aDesInstructions ?aDesInstructions ;\n" +
                        "                        sante:Pharmacies_prop ?aPharmacie .\n" +
                        "                        ?aPharmacie sante:aPourNom ?pharmacieName .\n" +
                        "}";

        return ResponseEntity.ok(rdfService.queryRDFJson(query));
    }
}
