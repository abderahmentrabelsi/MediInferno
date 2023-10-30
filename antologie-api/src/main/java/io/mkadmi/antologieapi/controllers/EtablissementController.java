package io.mkadmi.antologieapi.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import io.mkadmi.antologieapi.dto.EtablissementDeSanteDTO;
import io.mkadmi.antologieapi.services.RDFService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;


import java.util.List;


@RestController
@RequestMapping("/etablissement")
public class EtablissementController {
    @Autowired
    RDFService rdfService;

    @GetMapping("/list")
    public ResponseEntity<List<EtablissementDeSanteDTO>> listEtablissement() {
        // SPARQL query
        String query =
                "PREFIX sante: <http://www.semanticweb.org/msi/ontologies/2023/9/sante_ont#>\n" +
                        "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "SELECT ?aPourNomEtab ?aDesServiceDurg ?telephone ?capacite ?tauxDeReduction " +
                        "WHERE {" +
                        "  ?etablissement_de_sante rdf:type sante:Etablissement_de_sante." +
                        "  ?etablissement_de_sante sante:aPourNomEtab ?aPourNomEtab." +
                        "  ?etablissement_de_sante sante:aDesServiceDurg ?aDesServiceDurg." +
                        "  ?etablissement_de_sante sante:aPourNuméroDeTéléphone ?telephone." +
                        "  ?etablissement_de_sante sante:aUneCapacite ?capacite." +
                        "  ?etablissement_de_sante sante:apourTauxDeReduction ?tauxDeReduction." +
                        "}";

        var etablissementList = rdfService.queryToList(query, EtablissementDeSanteDTO.class);
        return ResponseEntity.ok(etablissementList);
    }

    @GetMapping("/search")
    public ResponseEntity<List<EtablissementDeSanteDTO>> searchEtablissement(@RequestParam String name) {
        String query = String.format(
                "PREFIX sante: <http://www.semanticweb.org/msi/ontologies/2023/9/sante_ont#>\n" +
                        "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "SELECT ?aPourNomEtab ?aDesServiceDurg ?telephone ?capacite ?tauxDeReduction " +
                        "WHERE {" +
                        "  ?etablissement_de_sante rdf:type sante:Etablissement_de_sante." +
                        "  ?etablissement_de_sante sante:aPourNomEtab ?aPourNomEtab." +
                        "  ?etablissement_de_sante sante:aDesServiceDurg ?aDesServiceDurg." +
                        "  ?etablissement_de_sante sante:aPourNuméroDeTéléphone ?telephone." +
                        "  ?etablissement_de_sante sante:aUneCapacite ?capacite." +
                        "  ?etablissement_de_sante sante:apourTauxDeReduction ?tauxDeReduction." +
                        "  FILTER(?aPourNomEtab = \"%s\")" +
                        "}", name);

        var etablissementList = rdfService.queryToList(query, EtablissementDeSanteDTO.class);
        return ResponseEntity.ok(etablissementList);
    }
    @GetMapping("/stats")
    public ResponseEntity<JsonNode> getEtablissementStats() {
        String query = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX sante: <http://www.semanticweb.org/msi/ontologies/2023/9/sante_ont#>\n" +
                "SELECT (COUNT(?etablissement_de_sante) as ?totalEtablissements) (MAX(?capacite) as ?maxCapacity) (MIN(?capacite) as ?minCapacity)\n" +
                "WHERE {\n" +
                "  ?etablissement_de_sante rdf:type sante:Etablissement_de_sante.\n" +
                "  ?etablissement_de_sante sante:aUneCapacite ?capacite.\n" +
                "}";

        JsonNode stats = rdfService.queryRDFJson(query);
        return ResponseEntity.ok(stats);
    }


}
