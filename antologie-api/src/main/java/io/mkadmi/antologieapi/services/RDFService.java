package io.mkadmi.antologieapi.services;

import jakarta.annotation.PostConstruct;
import org.eclipse.rdf4j.query.QueryLanguage;
import org.eclipse.rdf4j.query.TupleQuery;
import org.eclipse.rdf4j.query.resultio.sparqljson.SPARQLResultsJSONWriter;
import org.eclipse.rdf4j.repository.RepositoryConnection;
import org.eclipse.rdf4j.repository.RepositoryException;
import org.eclipse.rdf4j.rio.RDFFormat;
import org.eclipse.rdf4j.rio.RDFParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;

@Service
public class RDFService {
    @Autowired
    private RepositoryConnection repositoryConnection;

    @Autowired
    private ResourceLoader resourceLoader;

    public void loadRDF() throws IOException, RDFParseException, RepositoryException {
        Resource resource = resourceLoader.getResource("classpath:WebSemantique.rdf");
        try (InputStream inputStream = resource.getInputStream()) {
            repositoryConnection.add(inputStream, "", RDFFormat.RDFXML);
        }
    }
    @PostConstruct
    public void init() throws IOException, RDFParseException, RepositoryException {
        loadRDF();
    }

    public String queryRDF(String sparqlQuery) throws IOException {
        TupleQuery tupleQuery = repositoryConnection.prepareTupleQuery(QueryLanguage.SPARQL, sparqlQuery);
        StringWriter stringWriter = new StringWriter();
        SPARQLResultsJSONWriter jsonWriter = new SPARQLResultsJSONWriter(stringWriter);
        tupleQuery.evaluate(jsonWriter);
        return stringWriter.toString();
    }


}
