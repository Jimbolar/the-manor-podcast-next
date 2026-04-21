A website for *The Manor Podcast*
Live URL: https://themanorpodcast.co.uk/

## Summary of technologies used

- **Next.js 16** — React framework with App Router
- **React 19** — UI library
- **TypeScript** — type-safe JavaScript
- **Tailwind CSS v4** — utility-first CSS framework
- **Sanity v5** — headless CMS for content management
- **Sanity Studio** — embedded CMS editor available at `/studio`
- **next-sanity** — Sanity integration for Next.js
- **@portabletext/react** — renders Sanity rich text content
- **Netlify** — hosting and deployment (with `@netlify/plugin-nextjs`)

---

## Getting started

### Prerequisites

- Node.js v18 or higher

### Install dependencies

```bash
npm install
```

### Environment variables

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

You can find your project ID at [sanity.io/manage](https://www.sanity.io/manage).

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project structure

```
app/              # Next.js App Router pages
  blog/           # Blog listing and individual post pages
  studio/         # Embedded Sanity Studio (at /studio)
components/       # Shared UI components
sanity/
  schemaTypes/    # Sanity content schemas
  lib/            # Sanity client, queries, and helpers
public/images/    # Static assets
```

---

## Content management

Content is managed via Sanity Studio:

- **Locally:** [http://localhost:3000/studio](http://localhost:3000/studio)
- **In production:** [https://themanorpodcast.co.uk/studio](https://themanorpodcast.co.uk/studio)

Access requires a Sanity account with membership of the project. To invite editors, go to [sanity.io/manage](https://www.sanity.io/manage) → your project → **Members**.

---

## Deployment

The site is hosted on Netlify and **automatically deploys on every push to `main`**.

### Required environment variables in Netlify

| Key | Description |
|-----|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (e.g. `production`) |

### CORS

Any new domain must be added to the Sanity project's CORS origins at [sanity.io/manage](https://www.sanity.io/manage) → **API → CORS origins** (with **Allow credentials** enabled).

---

## Dependencies

Run the following to check for outdated packages or vulnerabilities:

```bash
npm outdated
npm audit
```
