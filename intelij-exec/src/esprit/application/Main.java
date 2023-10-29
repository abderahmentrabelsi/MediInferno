package esprit.application;

import esprit.tools.JenaEngine;
import org.apache.jena.rdf.model.*;

public class Main {
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        String NS = "";
// lire le model a partir d'une ontologie
        Model model = JenaEngine.readModel("data/WebSemantique.rdf");
        if (model != null) {
//lire le Namespace de l’ontologie
            NS = model.getNsPrefixURI("");
// apply our rules on the owlInferencedModel
            Model inferedModel =

                    JenaEngine.readInferencedModelFromRuleFile(model, "data/rules.txt");
// query on the model after inference
            System.out.println(JenaEngine.executeQueryFile(inferedModel,

                    "data/queryProfessionnels.txt"));

            System.out.println(JenaEngine.executeQueryFile(inferedModel,

                    "data/queryProduit.txt"));

            System.out.println(JenaEngine.executeQueryFile(inferedModel,

                    "data/queryMaladie.txt"));

            System.out.println(JenaEngine.executeQueryFile(inferedModel,

                    "data/queryPatient.txt"));

        } else {
            System.out.println("Error when reading model from ontology");
        }
    }
}
