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
@RequestMapping("/equipment")
@CrossOrigin("*")
public class EquipmentController {

    @Autowired
    RDFService rdfService;

    @GetMapping("/list")
    public ResponseEntity<JsonNode> listEquipment() {

        //language=SPARQL
        String query = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "PREFIX sante: <http://www.semanticweb.org/msi/ontologies/2023/9/sante_ont#>\n" +
                "\n" +
                "SELECT ?nom ?docteur \n" +
                "WHERE {\n" +
                "  ?equipement rdf:type/rdfs:subClassOf* sante:Equipement_Medical ;\n" +
                "                            sante:aPourNom ?nom ;\n" +
                "                            sante:utilisePar ?doc .\n" +
                "\n" +
                "  ?doc sante:aPourNom ?docteur .\n" +
                "}\n";

        return ResponseEntity.ok(rdfService.queryRDFJson(query));
    }
    @GetMapping("/getByName/{name}")
    public ResponseEntity<JsonNode> getByName(@PathVariable("name") String name) {

        //language=SPARQL
        String query = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "PREFIX sante: <http://www.semanticweb.org/msi/ontologies/2023/9/sante_ont#>\n" +
                "\n" +
                "SELECT ?nom ?docteur \n" +
                "WHERE {\n" +
                "  ?equipement rdf:type/rdfs:subClassOf* sante:Equipement_Medical ;\n" +
                "                            sante:aPourNom ?nom ;\n" +
                "                            sante:utilisePar ?doc .\n" +
                "\n" +
                "  ?doc sante:aPourNom ?docteur .\n" +
                "  FILTER (str(?nom) = \"" + name + "\")\n" +
                "}\n";

        return ResponseEntity.ok(rdfService.queryRDFJson(query));
    }

}
