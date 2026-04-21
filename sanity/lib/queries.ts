export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  author,
  publishedAt,
  excerpt,
  mainImage,
}`

export const latestPostsQuery = `*[_type == "post"] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  author,
  publishedAt,
  excerpt,
  mainImage,
}`

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  author,
  publishedAt,
  excerpt,
  mainImage,
  body,
}`
