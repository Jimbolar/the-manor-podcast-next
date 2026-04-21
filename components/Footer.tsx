import Image from 'next/image'
import Link from 'next/link'

const socials = [
  { href: 'https://open.spotify.com/show/4sHlCqZdGmDPA83giKkNSt', src: '/images/spotify-icon-yellow.png', alt: 'Spotify' },
  { href: 'https://twitter.com/themanorpodcast', src: '/images/twitter-icon-yellow.png', alt: 'X / Twitter' },
  { href: 'https://bsky.app/profile/themanorpodcast.bsky.social', src: '/images/bluesky-yellow.png', alt: 'Bluesky' },
  { href: 'https://podcasts.apple.com/gb/podcast/tmanor-oxford-united-podcast/id1475037095', src: '/images/apple-icon-yellow.png', alt: 'Apple Podcasts' },
]

const hosts = [
  { handle: 'JamSebRob' },
  { handle: 'Johnhud7' },
  { handle: 'Connor_Penfold' },
  { handle: 'CaptainOx' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-16 py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
        <div className="flex gap-5">
          {socials.map(({ href, src, alt }) => (
            <a key={alt} href={href} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
              <Image src={src} alt={alt} width={36} height={36} />
            </a>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-400">
          {hosts.map(({ handle }) => (
            <a
              key={handle}
              href={`https://twitter.com/${handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition-colors"
            >
              @{handle}
            </a>
          ))}
        </div>
        <p className="text-gray-600 text-xs">The Manor Podcast · OUFC</p>
      </div>
    </footer>
  )
}
