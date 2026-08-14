import { defineField, defineType } from 'sanity'

export const manorCupSeasonPrediction = defineType({
  name: 'manorCupSeasonPrediction',
  title: 'Manor Cup Season Prediction',
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
      name: 'participant',
      title: 'Participant',
      type: 'string',
      options: {
        list: [
          { title: 'Connor', value: 'Connor' },
          { title: 'Jack', value: 'Jack' },
          { title: 'James', value: 'James' },
          { title: 'John', value: 'John' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'leaguePosition',
      title: 'League Position Prediction',
      type: 'string',
    }),
    defineField({
      name: 'playerOfSeason',
      title: 'Player of the Season Prediction',
      type: 'string',
    }),
    defineField({
      name: 'topScorer',
      title: 'Top Scorer Prediction',
      type: 'string',
    }),
    defineField({
      name: 'randomPrediction',
      title: 'Random Prediction',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      participant: 'participant',
      season: 'season',
      media: 'avatar',
    },
    prepare({ participant, season, media }) {
      return {
        title: participant,
        subtitle: season,
        media,
      }
    },
  },
})
