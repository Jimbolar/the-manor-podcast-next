import { defineField, defineType } from 'sanity'

const scorePredictionFields = [
  defineField({ name: 'homeScore', title: 'Home Score', type: 'number' }),
  defineField({ name: 'awayScore', title: 'Away Score', type: 'number' }),
]

export const manorCupFixture = defineType({
  name: 'manorCupFixture',
  title: 'Manor Cup Fixture',
  type: 'document',
  fields: [
    defineField({
      name: 'season',
      title: 'Season',
      type: 'string',
      initialValue: '2026/27',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'homeTeam',
      title: 'Home Team',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'awayTeam',
      title: 'Away Team',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'competition',
      title: 'Competition',
      type: 'string',
      initialValue: 'Championship',
    }),
    defineField({
      name: 'actualHomeScore',
      title: 'Actual Home Score',
      type: 'number',
    }),
    defineField({
      name: 'actualAwayScore',
      title: 'Actual Away Score',
      type: 'number',
    }),
    defineField({
      name: 'connorPrediction',
      title: "Connor's Prediction",
      type: 'object',
      fields: scorePredictionFields,
    }),
    defineField({
      name: 'jackPrediction',
      title: "Jack's Prediction",
      type: 'object',
      fields: scorePredictionFields,
    }),
    defineField({
      name: 'jamesPrediction',
      title: "James's Prediction",
      type: 'object',
      fields: scorePredictionFields,
    }),
    defineField({
      name: 'johnPrediction',
      title: "John's Prediction",
      type: 'object',
      fields: scorePredictionFields,
    }),
  ],
  orderings: [
    {
      title: 'Date, Ascending',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      homeTeam: 'homeTeam',
      awayTeam: 'awayTeam',
      date: 'date',
      season: 'season',
    },
    prepare({ homeTeam, awayTeam, date, season }) {
      const dateStr = date
        ? new Date(date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        : ''
      return {
        title: `${homeTeam} vs ${awayTeam}`,
        subtitle: `${season} · ${dateStr}`,
      }
    },
  },
})
