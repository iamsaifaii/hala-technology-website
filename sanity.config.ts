import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'
import { monochromeTheme } from './src/sanity/theme'

export default defineConfig({
  name: 'default',
  title: 'Hala Technology Studio',

  projectId,
  dataset,
  apiVersion,

  basePath: '/studio',

  plugins: [
    structureTool({ structure }),
  ],

  schema,

  theme: monochromeTheme,
})

