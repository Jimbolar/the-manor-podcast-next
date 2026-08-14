import { sanityFetch } from '@/sanity/lib/live'
import { manorCupFixturesQuery, manorCupSeasonPredictionsQuery } from '@/sanity/lib/queries'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SeasonPredictions from '@/components/manor-cup/SeasonPredictions'
import ScorePredictionsTable from '@/components/manor-cup/ScorePredictionsTable'
import LeagueTable from '@/components/manor-cup/LeagueTable'
import type { FixtureWithPredictions } from '@/lib/manorCupScoring'
import type { SeasonPredictionData } from '@/components/manor-cup/SeasonPredictions'

export const metadata = {
  title: 'The Manor Cup | The Manor Podcast',
  description: 'Score predictions competition between the hosts of The Manor Podcast.',
}

const CURRENT_SEASON = '2026/27'

export default async function ManorCupPage() {
  const [{ data: fixtures }, { data: seasonPredictions }] = await Promise.all([
    sanityFetch({ query: manorCupFixturesQuery, params: { season: CURRENT_SEASON } }),
    sanityFetch({ query: manorCupSeasonPredictionsQuery, params: { season: CURRENT_SEASON } }),
  ])

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-950 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-12">

          {/* Page heading */}
          <div className="mb-12 border-b border-gray-800 pb-8">
            <h1
              className="text-yellow-400 leading-none mb-3"
              style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}
            >
              The Manor Cup
            </h1>
            <p className="text-gray-400 text-lg">
              Who knows Oxford United best? Season predictions and score-by-score competition
              between the hosts of The Manor Podcast.
            </p>
          </div>

          {/* Section 1: Season Predictions */}
          <div className="mb-16">
            <SeasonPredictions predictions={seasonPredictions as SeasonPredictionData[]} />
          </div>

          {/* Section 2: League Table */}
          <div className="mb-16">
            <LeagueTable fixtures={fixtures as FixtureWithPredictions[]} />
          </div>

          {/* Section 3: Score Predictions */}
          <div className="mb-16">
            <ScorePredictionsTable fixtures={fixtures as FixtureWithPredictions[]} />
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
