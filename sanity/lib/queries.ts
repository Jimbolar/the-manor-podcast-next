export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  author,
  publishedAt,
  excerpt,
  mainImage,
}`

export const latestPostsQuery = `*[_type == "post"] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  author,
  publishedAt,
  excerpt,
  mainImage,
}`

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  author,
  publishedAt,
  excerpt,
  mainImage,
  body[] {
    ...,
    _type == "image" => {
      ...,
      asset->
    }
  },
}`

// ── Manor Cup ─────────────────────────────────────────────────────────────────

export const manorCupFixturesQuery = `*[_type == "manorCupFixture" && season == $season] | order(date asc) {
  _id,
  season,
  date,
  homeTeam,
  awayTeam,
  competition,
  actualHomeScore,
  actualAwayScore,
  connorPrediction,
  jackPrediction,
  jamesPrediction,
  johnPrediction,
}`

export const manorCupSeasonPredictionsQuery = `*[_type == "manorCupSeasonPrediction" && season == $season] | order(participant asc) {
  _id,
  season,
  participant,
  avatar,
  leaguePosition,
  playerOfSeason,
  topScorer,
  randomPrediction,
}`
