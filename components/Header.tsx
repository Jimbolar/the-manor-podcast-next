import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="w-full bg-gray-950 border-b border-gray-800">
      <div
        className="relative w-full h-56 bg-gray-900 flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: 'url(/images/the-manor-web-banner.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <Image
          src="/images/the-manor-new-web.png"
          alt="The Manor Podcast"
          width={320}
          height={240}
          className="relative z-10 drop-shadow-xl"
          priority
        />
      </div>
      <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-center gap-8 text-sm uppercase tracking-widest">
        <Link href="/" className="text-gray-300 hover:text-yellow-400 transition-colors">Home</Link>
        <Link href="/blog" className="text-gray-300 hover:text-yellow-400 transition-colors">Blog</Link>
        <a href="https://open.spotify.com/show/4sHlCqZdGmDPA83giKkNSt" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-400 transition-colors">Listen</a>
      </nav>
    </header>
  )
}
