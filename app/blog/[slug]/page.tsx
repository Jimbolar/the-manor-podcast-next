import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { postBySlugQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/urlFor'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await client.fetch(postBySlugQuery, { slug })
  if (!post) return {}
  return {
    title: `${post.title} | The Manor Podcast`,
    description: post.excerpt,
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await client.fetch(postBySlugQuery, { slug })

  if (!post) notFound()

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-950 min-h-screen">
        <article className="max-w-3xl mx-auto px-4 py-12">

          <Link href="/blog" className="text-yellow-400 text-sm uppercase tracking-widest hover:underline mb-8 inline-block">
            ← Match Reports
          </Link>

          <h1 className="text-white text-5xl leading-tight mb-4">{post.title}</h1>

          <p className="text-gray-500 text-sm uppercase tracking-wide mb-8">
            {formattedDate && <span>{formattedDate}</span>}
            {post.author && <span> · {post.author}</span>}
          </p>

          {post.mainImage && (
            <img
              src={urlFor(post.mainImage).width(900).height(500).url()}
              alt={post.title}
              className="w-full rounded-xl mb-10 object-cover"
            />
          )}

          {post.excerpt && (
            <p className="text-gray-300 text-xl leading-relaxed border-l-4 border-yellow-400 pl-5 mb-10 italic">
              {post.excerpt}
            </p>
          )}

          {post.body && (
            <div className="prose-manor">
              <PortableText value={post.body} />
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  )
}
