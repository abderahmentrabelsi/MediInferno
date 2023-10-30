import {
  generateSchemaTypes,
  generateReactQueryComponents
} from '@openapi-codegen/typescript';
import { defineConfig } from '@openapi-codegen/cli';
export default defineConfig({
  antologie: {
    from: {
      source: 'url',
      url: 'http://localhost:8020/v3/api-docs'
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
  }
});
