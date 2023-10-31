package io.mkadmi.antologieapi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SpecialiteStatsResponseDTO {
    @JsonProperty("totalSpecialites")
    private long totalSpecialites;

    @JsonProperty("minSpecialistes")
    private int minSpecialistes;

    @JsonProperty("maxSpecialistes")
    private int maxSpecialistes;
}