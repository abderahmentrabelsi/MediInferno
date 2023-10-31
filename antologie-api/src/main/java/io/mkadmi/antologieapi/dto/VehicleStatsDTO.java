package io.mkadmi.antologieapi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class VehicleStatsDTO {
    @JsonProperty("totalVehicles")
    private long totalVehicles;

    @JsonProperty("minPlaces")
    private int minPlaces;

    @JsonProperty("maxPlaces")
    private int maxPlaces;

    @JsonProperty("avgPlaces")
    private double avgPlaces;
}