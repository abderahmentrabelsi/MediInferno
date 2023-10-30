package io.mkadmi.antologieapi.controllers;

import io.mkadmi.antologieapi.dto.PatientResponseDTO;
import io.mkadmi.antologieapi.dto.PatientStatsDTO;
import io.mkadmi.antologieapi.services.RDFService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;


import java.util.List;

@RestController
@RequestMapping("/patients")
@Api(value = "Patients Ontology", tags = "Patients")
public class PatientController {
    @Autowired
    RDFService rdfService;

    @GetMapping("/list")
    public ResponseEntity<List<PatientResponseDTO>> listPatients(@RequestParam(required = false) String q) {
        String query;

        if (q == null || q.isEmpty()) {
            //language=SPARQL
            query = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
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
        } else {
            //language=SPARQL
            query = String.format(
                    "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                            "PREFIX sante: <http://www.semanticweb.org/msi/ontologies/2023/9/sante_ont#>\n" +
                            "SELECT ?patient ?nom ?dateDeNaissance ?age ?adresse ?aConsulté ?aMaladie ?dossierMédical\n" +
                            "WHERE {\n" +
                            "  ?patient rdf:type sante:Patient.\n" +
                            "  ?patient sante:aPourNom ?nom.\n" +
                            "  FILTER(?nom = \"%s\")\n" +
                            "  ?patient sante:aPourDateDeNaissance ?dateDeNaissance.\n" +
                            "  ?patient sante:aPourAge ?age.\n" +
                            "  ?patient sante:apourAdresse ?adresse.\n" +
                            "  OPTIONAL { ?patient sante:aConsulté ?aConsulté. }\n" +
                            "  OPTIONAL { ?patient sante:aMaladie ?aMaladie. }\n" +
                            "  OPTIONAL { ?patient sante:aUnNuméroDeDossierMédical ?dossierMédical. }\n" +
                            "}", q
            );
        }

        List<PatientResponseDTO> patientList = rdfService.queryToList(query, PatientResponseDTO.class);
        return ResponseEntity.ok(patientList);
    }

    @GetMapping("/stats")
    public ResponseEntity<PatientStatsDTO> getPatientStats() {
        //language=SPARQL
        String query = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX sante: <http://www.semanticweb.org/msi/ontologies/2023/9/sante_ont#>\n" +
                "SELECT (COUNT(?patient) as ?totalPatients) (MIN(?age) as ?minAge) (MAX(?age) as ?maxAge)\n" +
                "WHERE {\n" +
                "  ?patient rdf:type sante:Patient.\n" +
                "  ?patient sante:aPourNom ?nom.\n" +
                "  ?patient sante:aPourDateDeNaissance ?dateDeNaissance.\n" +
                "  ?patient sante:aPourAge ?age.\n" +
                "  ?patient sante:apourAdresse ?adresse.\n" +
                "}";

        var stats = rdfService.queryToObject(query, PatientStatsDTO.class);
        return ResponseEntity.ok(stats);
    }
}
