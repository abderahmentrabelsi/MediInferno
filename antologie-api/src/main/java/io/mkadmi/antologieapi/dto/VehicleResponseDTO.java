package io.mkadmi.antologieapi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class VehicleResponseDTO {
    @JsonProperty("vehicle")
    private String vehicle;

    @JsonProperty("transporte")
    private String transporte;

    @JsonProperty("ammene")
    private String ammene;

    @JsonProperty("estResrvee")
    private String estResrvee;

    @JsonProperty("aPourConducteur")
    private String aPourConducteur;

    @JsonProperty("aPourNbrPlaces")
    private int aPourNbrPlaces;
}