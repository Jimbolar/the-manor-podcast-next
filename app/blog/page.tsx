import { sanityFetch } from '@/sanity/lib/live'
import { postsQuery } from '@/sanity/lib/queries'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostCard from '@/components/PostCard'

export const metadata = {
  title: 'Blog | The Manor Podcast',
}

const mockPost = {
  _id: 'mock-1',
  title: 'Oxford United 2–1 Bristol City: Back to winning ways at the Kassam',
  slug: { current: '#' },
  author: 'JamSebRob',
  publishedAt: '2026-04-19T16:00:00Z',
  excerpt: 'A scrappy but deserved win. United were sloppy in the first half but a clinical second-half turnaround — including a thunderbolt from Forde — sent the Kassam home happy.',
  mainImage: null,
}

export default async function BlogPage() {
  const { data: posts } = await sanityFetch({ query: postsQuery })
  const displayPosts = posts.length > 0 ? posts : [mockPost]

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-950 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-yellow-400 text-6xl mb-2">Blog</h1>
          <p className="text-gray-500 mb-10 text-lg">Analysis, opinions, and post-match takes from The Manor Podcast.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPosts.map((post: any) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
