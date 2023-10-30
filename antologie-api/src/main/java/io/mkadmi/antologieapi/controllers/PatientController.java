package io.mkadmi.antologieapi.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import io.mkadmi.antologieapi.dto.PatientResponseDTO;
import io.mkadmi.antologieapi.services.RDFService;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/patients")
@Api(value = "Patients Ontology API", tags = "Patients")
public class PatientController {
    @Autowired
    RDFService rdfService;

    @GetMapping("/list")
    public ResponseEntity<List<PatientResponseDTO>> listPatients() {

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

        var result = rdfService.queryRDFJson(query);
        List<PatientResponseDTO> patientList = rdfService.convertJsonToListOfType(result, PatientResponseDTO.class);
        return ResponseEntity.ok(patientList);
    }
}
