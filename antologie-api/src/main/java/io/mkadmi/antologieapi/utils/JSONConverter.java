package io.mkadmi.antologieapi.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
public class JSONConverter {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static String convertSPARQLtoRegularJSON(String sparqlJson) {
        try {
            JsonNode root = objectMapper.readTree(sparqlJson);
            ArrayNode bindings = (ArrayNode) root.path("results").path("bindings");
            ArrayNode resultArray = objectMapper.createArrayNode();

            for (JsonNode binding : bindings) {
                ObjectNode itemObject = objectMapper.createObjectNode();
                binding.fieldNames().forEachRemaining(field -> {
                    String value = binding.path(field).path("value").asText();
                    itemObject.put(field, value);
                });
                resultArray.add(itemObject);
            }

            return objectMapper.writeValueAsString(resultArray);
        } catch (Exception e) {
            throw new RuntimeException("Failed to convert SPARQL JSON to regular JSON", e);
        }
    }
}
