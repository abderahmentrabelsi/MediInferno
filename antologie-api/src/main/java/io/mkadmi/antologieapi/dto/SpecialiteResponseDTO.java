package io.mkadmi.antologieapi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SpecialiteResponseDTO {
    @JsonProperty("specialite")
    private String specialite;

    @JsonProperty("etablissementName")
    private String etablissementName;

    @JsonProperty("aPourDesSpecialiste")
    private String aPourDesSpecialiste;
}