import Image from 'next/image'
import { urlFor } from '@/sanity/lib/urlFor'

export type SeasonPredictionData = {
  _id: string
  participant: string
  avatar?: {
    asset?: { _ref: string }
    [key: string]: unknown
  } | null
  leaguePosition?: string | null
  playerOfSeason?: string | null
  topScorer?: string | null
  randomPrediction?: string | null
}

const PARTICIPANT_ORDER = ['Connor', 'Jack', 'James', 'John']

function PredictionRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-gray-500 text-xs uppercase tracking-widest">{label}</span>
      <span className="text-gray-100 text-sm leading-snug">
        {value ?? <span className="text-gray-600 italic">TBC</span>}
      </span>
    </div>
  )
}

function ParticipantCard({ prediction }: { prediction: SeasonPredictionData }) {
  const { participant, avatar, leaguePosition, playerOfSeason, topScorer, randomPrediction } = prediction
  const avatarUrl = avatar ? urlFor(avatar).width(80).height(80).url() : null

  return (
    <article className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden flex flex-col">
      {/* Card header */}
      <div className="bg-gray-800 px-5 py-4 flex items-center gap-4">
        {avatarUrl ? (
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-yellow-400 shrink-0">
            <Image
              src={avatarUrl}
              alt={`${participant}'s avatar`}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
        ) : (
          <div
            className="w-14 h-14 rounded-full border-2 border-yellow-400 bg-gray-700 flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <span className="text-yellow-400 text-xl font-bold">{participant[0]}</span>
          </div>
        )}
        <h3 className="text-yellow-400 text-3xl leading-none">{participant}</h3>
      </div>

      {/* Prediction fields */}
      <div className="px-5 py-4 flex flex-col gap-4 flex-1">
        <PredictionRow label="League Position" value={leaguePosition} />
        <PredictionRow label="Player of the Season" value={playerOfSeason} />
        <PredictionRow label="Top Scorer" value={topScorer} />
        <PredictionRow label="Random Prediction" value={randomPrediction} />
      </div>
    </article>
  )
}

export default function SeasonPredictions({ predictions }: { predictions: SeasonPredictionData[] }) {
  // Sort by defined participant order
  const sorted = [...predictions].sort(
    (a, b) => PARTICIPANT_ORDER.indexOf(a.participant) - PARTICIPANT_ORDER.indexOf(b.participant),
  )

  return (
    <section aria-labelledby="season-predictions-heading">
      <h2 id="season-predictions-heading" className="text-yellow-400 text-5xl mb-6">
        2026/27 Season Predictions
      </h2>

      {sorted.length === 0 ? (
        <p className="text-gray-500">Season predictions have not been entered yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {sorted.map((p) => (
            <ParticipantCard key={p._id} prediction={p} />
          ))}
        </div>
      )}
    </section>
  )
}
