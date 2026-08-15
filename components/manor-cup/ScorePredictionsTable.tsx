import {
  calculatePrediction,
  PARTICIPANT_KEYS,
  PARTICIPANT_DISPLAY,
  type FixtureWithPredictions,
  type PredictionResult,
  type ScorePrediction,
} from '@/lib/manorCupScoring'

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  })
}

// ── Prediction cell ───────────────────────────────────────────────────────────

const CELL_STYLES: Record<PredictionResult, string> = {
  exact:
    'bg-green-900/50 border border-green-600/60 text-green-200',
  correct:
    'bg-amber-900/50 border border-amber-600/60 text-amber-200',
  incorrect:
    'bg-red-900/50 border border-red-600/60 text-red-200',
  unplayed:
    'text-gray-400',
}

const POINTS_LABEL: Record<PredictionResult, string | null> = {
  exact: '3 pts',
  correct: '1 pt',
  incorrect: '0 pts',
  unplayed: null,
}

const RESULT_LABEL: Record<PredictionResult, string> = {
  exact: 'Exact score',
  correct: 'Correct result',
  incorrect: 'Wrong result',
  unplayed: 'Not yet scored',
}

function PredictionCell({
  prediction,
  actualHomeScore,
  actualAwayScore,
  participantName,
}: {
  prediction: ScorePrediction
  actualHomeScore: number | null | undefined
  actualAwayScore: number | null | undefined
  participantName: string
}) {
  const { result, points } = calculatePrediction(actualHomeScore, actualAwayScore, prediction)
  const scoreStr = prediction?.homeScore != null && prediction?.awayScore != null
    ? `${prediction.homeScore}–${prediction.awayScore}`
    : null
  const ptsLabel = POINTS_LABEL[result]

  const ariaLabel = scoreStr
    ? `${participantName}: predicted ${scoreStr}, ${RESULT_LABEL[result]}${ptsLabel ? `, ${ptsLabel}` : ''}`
    : `${participantName}: no prediction`

  return (
    <td className="px-2 py-2 text-center" aria-label={ariaLabel}>
      {scoreStr ? (
        <div className={`inline-flex flex-col items-center rounded px-2 py-1 min-w-[52px] ${CELL_STYLES[result]}`}>
          <span className="font-semibold text-sm tabular-nums">{scoreStr}</span>
          {ptsLabel && (
            <span className="text-xs leading-tight mt-0.5 opacity-90">{ptsLabel}</span>
          )}
        </div>
      ) : (
        <span className="text-gray-600 text-sm">—</span>
      )}
    </td>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ScorePredictionsTable({ fixtures }: { fixtures: FixtureWithPredictions[] }) {
  return (
    <section aria-labelledby="score-predictions-heading">
      <h2 id="score-predictions-heading" className="text-yellow-400 text-5xl mb-4">
        The Manor Cup - Score Predictions (26/27)
      </h2>

      {/* Legend */}
      <div className="mb-6 flex flex-wrap gap-4 text-xs text-gray-400" aria-label="Scoring key">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm bg-green-600/70 border border-green-500" aria-hidden="true" />
          <span>Exact score (3 pts)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm bg-amber-600/70 border border-amber-500" aria-hidden="true" />
          <span>Correct result (1 pt)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm bg-red-700/70 border border-red-500" aria-hidden="true" />
          <span>Wrong result (0 pts)</span>
        </div>
      </div>

      {fixtures.length === 0 ? (
        <p className="text-gray-500">No fixtures have been added yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-sm border-collapse min-w-[520px]" aria-label="Score predictions table">
            <thead>
              <tr className="bg-gray-800 text-gray-400 uppercase text-xs tracking-widest">
                <th
                  scope="col"
                  className="sticky left-0 z-10 bg-gray-800 px-4 py-3 text-left font-semibold min-w-[160px]"
                >
                  Fixture
                </th>
                <th scope="col" className="px-3 py-3 text-center font-semibold whitespace-nowrap">
                  Result
                </th>
                {PARTICIPANT_KEYS.map((key) => (
                  <th
                    key={key}
                    scope="col"
                    className="px-3 py-3 text-center font-semibold"
                  >
                    {PARTICIPANT_DISPLAY[key]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fixtures.map((fixture, idx) => {
                const actualScore =
                  fixture.actualHomeScore != null && fixture.actualAwayScore != null
                    ? `${fixture.actualHomeScore}–${fixture.actualAwayScore}`
                    : null
                const isEven = idx % 2 === 0
                return (
                  <tr
                    key={fixture._id}
                    className={isEven ? 'bg-gray-900/60' : 'bg-gray-900/30'}
                  >
                    {/* Fixture */}
                    <td className="sticky left-0 z-10 px-4 py-3 text-left bg-inherit">
                      <span className="text-gray-100 font-medium leading-tight block">
                        {fixture.homeTeam} vs {fixture.awayTeam}
                      </span>
                      <span className="text-gray-500 text-xs mt-0.5 block">
                        {formatDate(fixture.date)}
                        {fixture.competition && ` · ${fixture.competition}`}
                      </span>
                    </td>

                    {/* Actual result */}
                    <td className="px-3 py-3 text-center">
                      {actualScore ? (
                        <span className="text-white font-semibold tabular-nums">{actualScore}</span>
                      ) : (
                        <span className="text-gray-600 text-xs uppercase tracking-wider">TBP</span>
                      )}
                    </td>

                    {/* Participant predictions */}
                    {PARTICIPANT_KEYS.map((key) => {
                      const predKey = `${key}Prediction` as keyof FixtureWithPredictions
                      return (
                        <PredictionCell
                          key={key}
                          prediction={fixture[predKey] as ScorePrediction}
                          actualHomeScore={fixture.actualHomeScore}
                          actualAwayScore={fixture.actualAwayScore}
                          participantName={PARTICIPANT_DISPLAY[key]}
                        />
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

    </section>
  )
}
