package io.mkadmi.antologieapi.dto;

import lombok.Data;

@Data
public class EtablissementReductionStatsDTO {
    private long totalEtablissements;
    private double maxReduction;
    private double minReduction;
    private double avgReduction;
}