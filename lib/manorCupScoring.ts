/**
 * Manor Cup scoring logic.
 * Single source of truth for all point calculations and league table derivation.
 * The CMS stores fixtures, predictions, and actual scores.
 * This module derives all points and standings purely from that data.
 */

export type ScorePrediction = {
  homeScore: number | null | undefined
  awayScore: number | null | undefined
} | null | undefined

export type PredictionResult = 'exact' | 'correct' | 'incorrect' | 'unplayed'

export type PredictionScore = {
  result: PredictionResult
  points: number
}

type MatchOutcome = 'home' | 'draw' | 'away'

function getMatchOutcome(home: number, away: number): MatchOutcome {
  if (home > away) return 'home'
  if (home === away) return 'draw'
  return 'away'
}

/**
 * Calculate the score and result for a single prediction against the actual score.
 * Returns 'unplayed' when no actual score has been entered, or when no prediction exists.
 */
export function calculatePrediction(
  actualHomeScore: number | null | undefined,
  actualAwayScore: number | null | undefined,
  prediction: ScorePrediction,
): PredictionScore {
  // No actual score yet — match not played or not entered
  if (actualHomeScore == null || actualAwayScore == null) {
    return { result: 'unplayed', points: 0 }
  }

  // No prediction entered for this participant
  if (!prediction || prediction.homeScore == null || prediction.awayScore == null) {
    return { result: 'unplayed', points: 0 }
  }

  const { homeScore: ph, awayScore: pa } = prediction

  // Exact score match — 3 points
  if (ph === actualHomeScore && pa === actualAwayScore) {
    return { result: 'exact', points: 3 }
  }

  // Correct result (win/draw/loss) but wrong score — 1 point
  if (getMatchOutcome(ph, pa) === getMatchOutcome(actualHomeScore, actualAwayScore)) {
    return { result: 'correct', points: 1 }
  }

  // Wrong result — 0 points
  return { result: 'incorrect', points: 0 }
}

export type ParticipantKey = 'connor' | 'jack' | 'james' | 'john'

export const PARTICIPANT_KEYS: ParticipantKey[] = ['connor', 'jack', 'james', 'john']

export const PARTICIPANT_DISPLAY: Record<ParticipantKey, string> = {
  connor: 'Connor',
  jack: 'Jack',
  james: 'James',
  john: 'John',
}

export type FixtureWithPredictions = {
  _id: string
  season: string
  date: string
  homeTeam: string
  awayTeam: string
  competition?: string | null
  actualHomeScore?: number | null
  actualAwayScore?: number | null
  connorPrediction?: ScorePrediction
  jackPrediction?: ScorePrediction
  jamesPrediction?: ScorePrediction
  johnPrediction?: ScorePrediction
}

export type ParticipantStats = {
  participant: ParticipantKey
  displayName: string
  exact: number
  correct: number
  incorrect: number
  played: number
  totalPoints: number
}

/**
 * Derive the full league table from raw fixture data.
 * Sorted by total points (desc), then exact scores (desc), then name (asc).
 */
export function calculateLeagueTable(fixtures: FixtureWithPredictions[]): ParticipantStats[] {
  const stats: Record<ParticipantKey, ParticipantStats> = {
    connor: { participant: 'connor', displayName: 'Connor', exact: 0, correct: 0, incorrect: 0, played: 0, totalPoints: 0 },
    jack: { participant: 'jack', displayName: 'Jack', exact: 0, correct: 0, incorrect: 0, played: 0, totalPoints: 0 },
    james: { participant: 'james', displayName: 'James', exact: 0, correct: 0, incorrect: 0, played: 0, totalPoints: 0 },
    john: { participant: 'john', displayName: 'John', exact: 0, correct: 0, incorrect: 0, played: 0, totalPoints: 0 },
  }

  for (const fixture of fixtures) {
    for (const key of PARTICIPANT_KEYS) {
      const predKey = `${key}Prediction` as keyof FixtureWithPredictions
      const prediction = fixture[predKey] as ScorePrediction
      const score = calculatePrediction(fixture.actualHomeScore, fixture.actualAwayScore, prediction)

      if (score.result !== 'unplayed') {
        stats[key].played++
        stats[key].totalPoints += score.points
        if (score.result === 'exact') stats[key].exact++
        else if (score.result === 'correct') stats[key].correct++
        else stats[key].incorrect++
      }
    }
  }

  return Object.values(stats).sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints
    if (b.exact !== a.exact) return b.exact - a.exact
    return a.displayName.localeCompare(b.displayName)
  })
}
