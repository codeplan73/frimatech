import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {productType} from './productType'
import {productCategoryType} from './productCategoryType'
import {trainingType} from './trainingType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, productType, productCategoryType, trainingType],
}
