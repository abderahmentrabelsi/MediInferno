package io.mkadmi.antologieapi.dto;

import lombok.Data;

@Data
public class PatientStatsDTO {
    private int totalPatients;
    private int minAge;
    private int maxAge;
}
