package io.mkadmi.antologieapi.dto;

import lombok.Data;

@Data
public class PatientResponseDTO {
    public String patient;
    public String nom;
    public String dateDeNaissance;
    public int age;
    public String adresse;
    public String aConsulté;
    public String aMaladie;
    public String dossierMédical;
}
