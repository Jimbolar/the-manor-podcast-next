import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { latestPostsQuery } from '@/sanity/lib/queries'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostCard from '@/components/PostCard'
import EmbedFrame from '@/components/EmbedFrame'

const socials = [
  { href: 'https://open.spotify.com/show/4sHlCqZdGmDPA83giKkNSt', src: '/images/spotify-icon-yellow.png', alt: 'Spotify' },
  { href: 'https://twitter.com/themanorpodcast', src: '/images/twitter-icon-yellow.png', alt: 'X / Twitter' },
  { href: 'https://bsky.app/profile/themanorpodcast.bsky.social', src: '/images/bluesky-yellow.png', alt: 'Bluesky' },
  { href: 'https://podcasts.apple.com/gb/podcast/tmanor-oxford-united-podcast/id1475037095', src: '/images/apple-icon-yellow.png', alt: 'Apple Podcasts' },
]

export default async function HomePage() {
  const latestPosts = await client.fetch(latestPostsQuery)

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-950">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="border-b border-gray-800">
          <div className="max-w-5xl mx-auto px-4 py-14 flex flex-col lg:flex-row items-center lg:items-start gap-12">

            {/* Left: tagline + about + socials + Apple CTA */}
            <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">
              <div>
                <h1 className="text-yellow-400 leading-none mb-5" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}>
                  Informal.<br />Analytical.<br />Inconsistent.
                </h1>
                <p className="text-gray-300 text-lg leading-relaxed">
                  <strong className="text-white">The Manor Podcast</strong> is an extremely unofficial,
                  proudly informal Oxford United podcast brought to you by a handful of OUFC exiles
                  scattered across the UK.
                </p>
              </div>

              {/* Social icons */}
              <div className="flex gap-4 justify-center lg:justify-start">
                {socials.map(({ href, src, alt }) => (
                  <a key={alt} href={href} target="_blank" rel="noopener noreferrer"
                    className="opacity-70 hover:opacity-100 transition-opacity">
                    <Image src={src} alt={alt} width={36} height={36} />
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Spotify embed */}
            <div className="w-full lg:w-[420px] shrink-0">
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-3 text-center lg:text-left">Latest episode</p>
              <EmbedFrame
                src="https://open.spotify.com/embed/show/4sHlCqZdGmDPA83giKkNSt?utm_source=generator&theme=0"
                title="The Manor Podcast on Spotify"
                height={352}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                className="border border-gray-800"
              />
            </div>
          </div>
        </section>

        {/* ── Latest YouTube ────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-4 py-12 border-b border-gray-800">
          <h2 className="text-white text-4xl mb-6">Latest Video</h2>
          <EmbedFrame
            src="https://www.youtube.com/embed/9vJA9iSZ4vU?si=jBNdaL-1k7irHlT_"
            title="The Manor Podcast — YouTube"
            height={480}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            className="border border-gray-800"
          />
        </section>

        {/* ── Latest match reports ──────────────────────────────── */}
        {(() => {
          const mockPost = {
            _id: 'mock-1',
            title: 'Oxford United 2–1 Bristol City: Back to winning ways at the Kassam',
            slug: { current: '#' },
            author: 'JamSebRob',
            publishedAt: '2026-04-19T16:00:00Z',
            excerpt: 'A scrappy but deserved win. United were sloppy in the first half but a clinical second-half turnaround — including a thunderbolt from Forde — sent the Kassam home happy.',
            mainImage: null,
          }
          const posts = latestPosts.length > 0 ? latestPosts : [mockPost]
          return (
            <section className="max-w-5xl mx-auto px-4 py-12 pb-16">
              <div className="flex items-baseline justify-between mb-6 border-b border-gray-800 pb-3">
                <h2 className="text-white text-4xl">Latest Blog Posts</h2>
                <Link href="/blog" className="text-yellow-400 text-sm uppercase tracking-widest hover:underline">
                  All posts →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post: any) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            </section>
          )
        })()}

      </main>
      <Footer />
    </>
  )
}
