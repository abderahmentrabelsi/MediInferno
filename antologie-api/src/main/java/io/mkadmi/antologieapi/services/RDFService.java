package io.mkadmi.antologieapi.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.mkadmi.antologieapi.utils.JSONConverter;
import jakarta.annotation.PostConstruct;
import lombok.SneakyThrows;
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
import java.util.ArrayList;
import java.util.List;

@Service
public class RDFService {
    @Autowired
    private RepositoryConnection repositoryConnection;

    @Autowired
    private ResourceLoader resourceLoader;

    @Autowired
    ObjectMapper objectMapper;

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

    public String queryRDFRaw(String sparqlQuery) {
        TupleQuery tupleQuery = repositoryConnection.prepareTupleQuery(QueryLanguage.SPARQL, sparqlQuery);
        StringWriter stringWriter = new StringWriter();
        SPARQLResultsJSONWriter jsonWriter = new SPARQLResultsJSONWriter(stringWriter);
        tupleQuery.evaluate(jsonWriter);
        return stringWriter.toString();
    }

    @SneakyThrows
    public String queryRDFPrettyString(String sparqlQuery) {
        String result = queryRDFRaw(sparqlQuery);
        return JSONConverter.convertSPARQLtoRegularJSON(result);
    }

    @SneakyThrows
    public JsonNode queryRDFJson(String sparqlQuery, boolean cleanRefs) {
        String result = this.queryRDFPrettyString(sparqlQuery);
        JsonNode rootNode = objectMapper.readTree(result);

        if (cleanRefs) {
            cleanJsonReferences(rootNode);
        }

        return rootNode;
    }

    private void cleanJsonReferences(JsonNode node) {
        if (node.isObject()) {
            ObjectNode objectNode = (ObjectNode) node;
            objectNode.fields().forEachRemaining(entry -> {
                String key = entry.getKey();
                JsonNode value = entry.getValue();
                if (value.isTextual()) {
                    String textValue = value.textValue();
                    if (textValue.contains("#")) {
                        objectNode.put(key, textValue.split("#")[1]);
                    }
                } else {
                    cleanJsonReferences(value);
                }
            });
        } else if (node.isArray()) {
            for (JsonNode arrayElem : node) {
                cleanJsonReferences(arrayElem);
            }
        }
    }

    // Overload to keep backward compatibility
    public JsonNode queryRDFJson(String sparqlQuery) {
        return queryRDFJson(sparqlQuery, true);
    }

    public <T> List<T> convertJsonToListOfType(JsonNode jsonNode, Class<T> type) {
        List<T> resultList = new ArrayList<>();
        ObjectMapper localMapper = new ObjectMapper();

        for (JsonNode node : jsonNode) {
            try {
                T item = localMapper.treeToValue(node, type);
                resultList.add(item);
            } catch (JsonProcessingException e) {
                throw new RuntimeException("Failed to convert JSON to " + type.getName(), e);
            }
        }

        return resultList;
    }

    public <T> T queryToObject(String query, Class<T> type) {
        return queryToList(query, type).get(0);
    }

    public <T> List<T> queryToList(String query, Class<T> type) {
        var res = this.queryRDFJson(query);
        return this.convertJsonToListOfType(res, type);
    }
}
