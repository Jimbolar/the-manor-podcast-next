/**
 * Import Oxford United 2026/27 fixtures into Sanity as manorCupFixture documents.
 *
 * Usage:
 *   node scripts/importFixtures.mjs [path/to/fixtures.csv]
 *
 * Defaults to: oufc-2627-fixtures.csv (relative to project root)
 *
 * Requires a SANITY_API_TOKEN with write access in your .env.local:
 *   SANITY_API_TOKEN=sk...
 */

import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import readline from 'readline'
import dotenv from 'dotenv'

dotenv.config({ path: resolve(dirname(fileURLToPath(import.meta.url)), '..', '.env.local') })

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

// ── Config ────────────────────────────────────────────────────────────────────

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-20'
const TOKEN = process.env.SANITY_API_TOKEN

if (!PROJECT_ID) {
  console.error('❌  Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local')
  process.exit(1)
}
if (!TOKEN) {
  console.error('❌  Missing SANITY_API_TOKEN in .env.local')
  console.error('    Create a token at https://sanity.io/manage → project → API → Tokens')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token: TOKEN,
  useCdn: false,
})

// ── CSV parsing ───────────────────────────────────────────────────────────────

/**
 * Parse DD/MM/YYYY → ISO 8601 datetime (noon UTC so timezones don't shift the date).
 */
function parseDate(raw) {
  const [day, month, year] = raw.trim().split('/')
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T12:00:00Z`
}

async function readFixtures(csvPath) {
  const fixtures = []
  const rl = readline.createInterface({
    input: createReadStream(csvPath),
    crlfDelay: Infinity,
  })

  let isHeader = true
  for await (const line of rl) {
    if (isHeader) { isHeader = false; continue }
    const trimmed = line.trim()
    if (!trimmed) continue

    const parts = trimmed.split(',')
    if (parts.length < 3) {
      console.warn(`⚠️  Skipping malformed line: ${line}`)
      continue
    }

    const [date, homeTeam, awayTeam] = parts.map(p => p.trim())
    fixtures.push({ date: parseDate(date), homeTeam, awayTeam })
  }

  return fixtures
}

// ── Import ────────────────────────────────────────────────────────────────────

async function importFixtures(csvPath) {
  console.log(`\nReading: ${csvPath}`)
  const fixtures = await readFixtures(csvPath)
  console.log(`Found ${fixtures.length} fixtures.\n`)

  // Check for existing fixtures to avoid duplicates
  const existing = await client.fetch(
    `*[_type == "manorCupFixture" && season == "2026/27"]{ _id, date, homeTeam, awayTeam }`
  )
  const existingKeys = new Set(
    existing.map(f => `${f.date}|${f.homeTeam}|${f.awayTeam}`)
  )

  let created = 0
  let skipped = 0

  for (const fixture of fixtures) {
    const key = `${fixture.date}|${fixture.homeTeam}|${fixture.awayTeam}`

    if (existingKeys.has(key)) {
      console.log(`  ⏭  Skipping (already exists): ${fixture.homeTeam} vs ${fixture.awayTeam}`)
      skipped++
      continue
    }

    const doc = {
      _type: 'manorCupFixture',
      season: '2026/27',
      competition: 'League One',
      date: fixture.date,
      homeTeam: fixture.homeTeam,
      awayTeam: fixture.awayTeam,
    }

    await client.create(doc)
    console.log(`  ✅  Created: ${fixture.homeTeam} vs ${fixture.awayTeam}  (${fixture.date.slice(0, 10)})`)
    created++
  }

  console.log(`\nDone. Created: ${created}  Skipped: ${skipped}`)
}

// ── Entry point ───────────────────────────────────────────────────────────────

const csvArg = process.argv[2]
const csvPath = csvArg
  ? resolve(process.cwd(), csvArg)
  : resolve(ROOT, 'oufc-2627-fixtures.csv')

importFixtures(csvPath).catch(err => {
  console.error('❌  Import failed:', err.message)
  process.exit(1)
})
