import { calculateLeagueTable, type FixtureWithPredictions } from '@/lib/manorCupScoring'

const POSITION_LABELS = ['1st', '2nd', '3rd', '4th']

export default function LeagueTable({ fixtures }: { fixtures: FixtureWithPredictions[] }) {
  const table = calculateLeagueTable(fixtures)
  const leader = table[0]?.totalPoints ?? 0

  return (
    <section aria-labelledby="league-table-heading">
      <h2 id="league-table-heading" className="text-yellow-400 text-5xl mb-6">
        The Manor Cup - League Table (26/27)
      </h2>

      {fixtures.length === 0 ? (
        <p className="text-gray-500">League table will appear once fixtures are added.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table
            className="w-full text-sm border-collapse"
            aria-label="Manor Cup league table"
          >
            <thead>
              <tr className="bg-gray-800 text-gray-400 uppercase text-xs tracking-widest">
                <th scope="col" className="px-4 py-3 text-left font-semibold w-12">
                  Pos
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">
                  Player
                </th>
                <th scope="col" className="px-4 py-3 text-center font-semibold whitespace-nowrap" title="Matches scored">
                  Played
                </th>
                <th scope="col" className="px-4 py-3 text-center font-semibold whitespace-nowrap" title="Exact score predictions (3 pts each)">
                  Exact
                </th>
                <th scope="col" className="px-4 py-3 text-center font-semibold whitespace-nowrap" title="Correct result predictions (1 pt each)">
                  Correct
                </th>
                <th scope="col" className="px-4 py-3 text-center font-semibold whitespace-nowrap" title="Wrong result predictions">
                  Wrong
                </th>
                <th scope="col" className="px-4 py-3 text-center font-semibold">
                  Points
                </th>
              </tr>
            </thead>
            <tbody>
              {table.map((row, idx) => {
                const isLeader = row.totalPoints === leader && leader > 0

                return (
                  <tr
                    key={row.participant}
                    className={[
                      idx % 2 === 0 ? 'bg-gray-900/60' : 'bg-gray-900/30',
                      isLeader ? 'border-l-2 border-yellow-400' : '',
                    ].join(' ')}
                    aria-label={
                      `${row.displayName}: position ${idx + 1}, ` +
                      `${row.played} played, ` +
                      `${row.exact} exact, ` +
                      `${row.correct} correct, ` +
                      `${row.totalPoints} points`
                    }
                  >
                    <td className="px-4 py-3 text-gray-400 tabular-nums">
                      {POSITION_LABELS[idx] ?? `${idx + 1}`}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-semibold ${isLeader ? 'text-yellow-400' : 'text-gray-100'}`}>
                        {row.displayName}
                      </span>
                      {isLeader && (
                        <span className="ml-2 text-yellow-400 text-xs uppercase tracking-wider" aria-label="Current leader">
                          Leader
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-300 tabular-nums">{row.played}</td>
                    <td className="px-4 py-3 text-center text-green-400 tabular-nums font-medium">{row.exact}</td>
                    <td className="px-4 py-3 text-center text-amber-400 tabular-nums font-medium">{row.correct}</td>
                    <td className="px-4 py-3 text-center text-red-400 tabular-nums">{row.incorrect}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-white font-bold text-base tabular-nums">{row.totalPoints}</span>
                    </td>
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
