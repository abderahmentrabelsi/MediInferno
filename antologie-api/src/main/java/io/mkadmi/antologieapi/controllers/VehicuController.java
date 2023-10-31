package io.mkadmi.antologieapi.controllers;

import io.mkadmi.antologieapi.dto.VehicleResponseDTO;
import io.mkadmi.antologieapi.dto.VehicleStatsDTO;
import io.mkadmi.antologieapi.services.RDFService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/vehic")
@CrossOrigin("*")
public class VehicuController {

    @Autowired
    RDFService rdfService;

    @GetMapping("/all")
    public ResponseEntity<List<VehicleResponseDTO>> getAllVehicles() {
        String sparqlQuery = "PREFIX sante: <http://www.semanticweb.org/msi/ontologies/2023/9/sante_ont#> " +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "SELECT ?vehicle ?transporte ?ammene ?estResrvee ?aPourConducteur ?aPourNbrPlaces " +
                "WHERE { " +
                "  ?vehicle sante:transporte ?transporte. " +
                "  ?vehicle sante:ammene ?ammene. " +
                "  ?vehicle sante:estResrvee ?estResrvee. " +
                "  ?vehicle sante:aPourConducteur ?aPourConducteur. " +
                "  ?vehicle sante:aPourNbrPlaces ?aPourNbrPlaces. " +
                "}";
        return ResponseEntity.ok(rdfService.queryToList(sparqlQuery, VehicleResponseDTO.class));
    }

    @GetMapping("/stats")
    public ResponseEntity<VehicleStatsDTO> getVehicleStats() {
        String sparqlQuery = "PREFIX sante: <http://www.semanticweb.org/msi/ontologies/2023/9/sante_ont#> " +
                "SELECT (COUNT(?vehicle) as ?totalVehicles) (MAX(?aPourNbrPlaces) as ?minPlaces) (MIN(?aPourNbrPlaces) as ?maxPlaces) (AVG(?aPourNbrPlaces) as ?avgPlaces) " +
                "WHERE { " +
                "  ?vehicle sante:aPourNbrPlaces ?aPourNbrPlaces. " +
                "}";
        var stats = rdfService.queryToObject(sparqlQuery, VehicleStatsDTO.class);
        return ResponseEntity.ok(stats);
    }


}
