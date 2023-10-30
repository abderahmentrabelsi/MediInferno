package io.mkadmi.antologieapi.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import io.mkadmi.antologieapi.services.RDFService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/medicalLabo")
@CrossOrigin("*")
public class MedicalLaboController {

    @Autowired
    RDFService rdfService;

    @GetMapping("/list")
    public ResponseEntity<JsonNode> listMedicalLabo() {

        //language=SPARQL
        String query = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "PREFIX sante: <http://www.semanticweb.org/msi/ontologies/2023/9/sante_ont#>\n" +
                "\n" +
                "SELECT ?aPourNom ?aTechniciens ?aEquipement ?aProduitNom\n" +
                "WHERE {\n" +
                "  ?MedicalLab rdf:type/rdfs:subClassOf* sante:Medical_Labo ;\n" +
                "              sante:aPourNom ?aPourNom ;\n" +
                "              sante:aTechniciens ?aTechniciens ;\n" +
                "              sante:aEquipement ?aEquipement ;\n" +
                "              sante:aProduit ?aProduit .\n" +
                "              ?aProduit sante:aPourNom ?aProduitNom .\n" +
                "}";

        return ResponseEntity.ok(rdfService.queryRDFJson(query));
    }

    @GetMapping("/getByName/{name}")
    public ResponseEntity<JsonNode> getMedicalLaboByName(@PathVariable("name") String name) {

        //language=SPARQL
        String query = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "PREFIX sante: <http://www.semanticweb.org/msi/ontologies/2023/9/sante_ont#>\n" +
                "\n" +
                "SELECT ?aPourNom ?aTechniciens ?aEquipement ?aProduitNom\n" +
                "WHERE {\n" +
                "  ?MedicalLab rdf:type/rdfs:subClassOf* sante:Medical_Labo ;\n" +
                "              sante:aPourNom ?aPourNom ;\n" +
                "              sante:aTechniciens ?aTechniciens ;\n" +
                "              sante:aEquipement ?aEquipement ;\n" +
                "              sante:aProduit ?aProduit .\n" +
                "              ?aProduit sante:aPourNom ?aProduitNom .\n" +
                "  FILTER (str(?aPourNom) = \"" + name + "\")\n" +
                "}";

        return ResponseEntity.ok(rdfService.queryRDFJson(query));
    }

}
