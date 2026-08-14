import { type SchemaTypeDefinition } from 'sanity'
import { post } from './post'
import { manorCupFixture } from './manorCupFixture'
import { manorCupSeasonPrediction } from './manorCupSeasonPrediction'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, manorCupFixture, manorCupSeasonPrediction],
}
