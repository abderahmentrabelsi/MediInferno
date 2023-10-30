package io.mkadmi.antologieapi.dto;

import lombok.Data;

@Data
public class EtablissementStatsDTO {
    private long totalEtablissements;
    private int maxCapacity;
    private int minCapacity;
}
