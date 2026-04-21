import Link from 'next/link'
import { urlFor } from '@/sanity/lib/urlFor'

type Post = {
  _id: string
  title: string
  slug: { current: string }
  author?: string
  publishedAt?: string
  excerpt?: string
  mainImage?: any
}

export default function PostCard({ post }: { post: Post }) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group flex flex-col bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-yellow-400 transition-all duration-200"
    >
      {post.mainImage ? (
        <img
          src={urlFor(post.mainImage).width(600).height(340).url()}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
          <span className="text-gray-600 text-4xl font-bold tracking-widest">OUFC</span>
        </div>
      )}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <h3 className="text-yellow-400 text-2xl leading-tight group-hover:underline">
          {post.title}
        </h3>
        <p className="text-gray-500 text-xs uppercase tracking-wide">
          {formattedDate && <span>{formattedDate}</span>}
          {post.author && <span> · {post.author}</span>}
        </p>
        {post.excerpt && (
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mt-1">
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  )
}
