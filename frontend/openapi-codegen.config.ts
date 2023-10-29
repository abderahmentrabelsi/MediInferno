import {
  generateSchemaTypes,
  generateReactQueryComponents
} from '@openapi-codegen/typescript';
import { defineConfig } from '@openapi-codegen/cli';
export default defineConfig({
  dark: {
    from: {
      source: 'url',
      url: 'http://localhost:8089/v3/api-docs'
    },
    outputDir: './api',
    to: async (context) => {
      const filenamePrefix = 'api';
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix
      });
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles
      });
    }
  },
  tickets: {
    from: {
      source: 'url',
      url: 'http://localhost:8089/v3/api-docs'
    },
    outputDir: './app/tickets/_api',
    to: async (context) => {
      const filenamePrefix = 'ticket';
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix
      });
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles
      });
    }
  }
});
