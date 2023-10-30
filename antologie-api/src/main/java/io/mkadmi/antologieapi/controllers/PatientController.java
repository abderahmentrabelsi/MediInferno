package io.mkadmi.antologieapi.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import io.mkadmi.antologieapi.services.RDFService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/patients")
public class PatientController {
    @Autowired
    RDFService rdfService;

    @GetMapping("/list")
    public ResponseEntity<JsonNode> listPatients() {

        //language=SPARQL
        String query =  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "PREFIX sante: <http://www.semanticweb.org/msi/ontologies/2023/9/sante_ont#>\n" +
                        "SELECT ?patient ?nom ?dateDeNaissance ?age ?adresse ?aConsulté ?aMaladie ?dossierMédical\n" +
                        "WHERE {\n" +
                        "  ?patient rdf:type sante:Patient.\n" +
                        "  ?patient sante:aPourNom ?nom.\n" +
                        "  ?patient sante:aPourDateDeNaissance ?dateDeNaissance.\n" +
                        "  ?patient sante:aPourAge ?age.\n" +
                        "  ?patient sante:apourAdresse ?adresse.\n" +
                        "  OPTIONAL { ?patient sante:aConsulté ?aConsulté. }\n" +
                        "  OPTIONAL { ?patient sante:aMaladie ?aMaladie. }\n" +
                        "  OPTIONAL { ?patient sante:aUnNuméroDeDossierMédical ?dossierMédical. }\n" +
                        "}";

        return ResponseEntity.ok(rdfService.queryRDFJson(query));
    }
}
