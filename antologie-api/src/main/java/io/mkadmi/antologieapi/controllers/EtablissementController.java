package io.mkadmi.antologieapi.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import io.mkadmi.antologieapi.services.RDFService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/etablissement")
public class EtablissementController {
    @Autowired
    RDFService rdfService;

    @GetMapping("/list")
    public ResponseEntity<JsonNode> listEtablissement() {
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

        return ResponseEntity.ok(rdfService.queryRDFJson(query));
    }

}
