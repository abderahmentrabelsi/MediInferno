package io.mkadmi.antologieapi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class EtablissementDeSanteDTO {
    @JsonProperty("aPourNomEtab")
    private String aPourNomEtab;

    @JsonProperty("aDesServiceDurg")
    private String aDesServiceDurg;

    @JsonProperty("telephone")
    private String telephone;

    @JsonProperty("capacite")
    private int capacite;

    @JsonProperty("tauxDeReduction")
    private double tauxDeReduction;
}
