package io.mkadmi.antologieapi.dto;

import lombok.Data;

@Data
public class EtablissementDeSanteDTO {
    private String aPourNomEtab;
    private String aDesServiceDurg;
    private String telephone;
    private int capacite;
    private double tauxDeReduction;
}
