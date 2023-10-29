package io.mkadmi.antologieapi.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import io.mkadmi.antologieapi.services.RDFService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/prof")
public class ProfController {
    @Autowired
    RDFService rdfService;

    @GetMapping("/list")
    public ResponseEntity<JsonNode> listEtablissement() {

        //language=SPARQL
        String query =
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                        "PREFIX sante: <http://www.semanticweb.org/msi/ontologies/2023/9/sante_ont#>\n" +
                        "SELECT ?nom ?specialite ?age ?experience ?adresse ?patientName\n" +
                        "WHERE {\n" +
                        "  ?professionnel_de_la_sante rdf:type sante:Professionnel_de_la_sante ;\n" +
                        "                            sante:aPourNom ?nom ;\n" +
                        "                            sante:aPourSpecialite ?specialite ;\n" +
                        "                            sante:aPourAge ?age ;\n" +
                        "                            sante:aPourExperience ?experience ;\n" +
                        "                            sante:apourAdresse ?adresse ;\n" +
                       "                            sante:aConsulté ?patient .\n" +
                        "\n" +
                        "  ?patient sante:aPourNom ?patientName .\n" +
                        "}";

        return ResponseEntity.ok(rdfService.queryRDFJson(query));
    }
}
