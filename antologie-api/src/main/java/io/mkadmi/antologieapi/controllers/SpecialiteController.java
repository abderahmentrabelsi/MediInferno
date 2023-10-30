package io.mkadmi.antologieapi.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import io.mkadmi.antologieapi.services.RDFService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/specialite")
@CrossOrigin("*")
public class SpecialiteController {

    @Autowired
    RDFService rdfService;

    @GetMapping("/list")
    public ResponseEntity<JsonNode> listSpecialite() {
        String query = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> "
                + "PREFIX sante: <http://www.semanticweb.org/msi/ontologies/2023/9/sante_ont#> "
                + "SELECT ?specialite ?etablissementName ?aPourDesSpecialiste "
                + "WHERE { "
                + "  ?specialite rdf:type/rdfs:subClassOf* sante:specialite. "
                + "  OPTIONAL { "
                + "    ?specialite sante:usedby ?etablissement. "
                + "    ?etablissement sante:aPourNomEtab ?etablissementName. "
                + "  } "
                + "  OPTIONAL { "
                + "    ?specialite sante:aPourDesSpecialiste ?aPourDesSpecialiste. "
                + "  } "
                + "}";
        return ResponseEntity.ok(rdfService.queryRDFJson(query));
    }
    @GetMapping("/search-by-etablissement")
    public ResponseEntity<JsonNode> searchByEtablissement(@RequestParam String etablissementName) {
        String query = String.format("PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> "
                + "PREFIX sante: <http://www.semanticweb.org/msi/ontologies/2023/9/sante_ont#> "
                + "SELECT ?specialite "
                + "WHERE { "
                + "  ?etablissement sante:usedby ?specialite. "
                + "  ?specialite rdf:type/rdfs:subClassOf* sante:specialite. "
                + "  OPTIONAL { "
                + "    ?etablissement sante:aPourNomEtab ?aPourNomEtab. "
                + "  } "
                + "  FILTER(str(?aPourNomEtab) = \"%s\") "
                + "}", etablissementName);

        return ResponseEntity.ok(rdfService.queryRDFJson(query));
    }

    @GetMapping("/stats")
    public ResponseEntity<JsonNode> getSpecialiteStats() {
        String query = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX sante: <http://www.semanticweb.org/msi/ontologies/2023/9/sante_ont#>\n" +
                "SELECT (COUNT(?specialite) as ?totalSpecialites) (MIN(?aPourDesSpecialiste) as ?minSpecialistes) (MAX(?aPourDesSpecialiste) as ?maxSpecialistes)\n" +
                "WHERE {\n" +
                "  ?specialite rdf:type/rdfs:subClassOf* sante:specialite.\n" +
                "  ?specialite sante:aPourDesSpecialiste ?aPourDesSpecialiste.\n" +
                "}";
        return ResponseEntity.ok(rdfService.queryRDFJson(query));
    }

}
