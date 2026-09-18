import { groq } from 'next-sanity'

export const postsQuery = groq`*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(coalesce(publishedAt, _createdAt) desc) {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  _createdAt,
  "authorName": author->name,
  "authorImage": author->image
}`

export const postQuery = groq`*[_type == "post" && (slug.current in [$slug, $decodedSlug, $normalizedSlug, $spacedSlug, $underscoredSlug] || slug in [$slug, $decodedSlug, $normalizedSlug, $spacedSlug, $underscoredSlug]) && !(_id in path("drafts.**"))][0] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  body,
  publishedAt,
  _createdAt,
  "authorName": author->name,
  "authorImage": author->image,
  "categories": categories[]->title,
  seoTitle,
  metaDescription,
  excerpt,
  focusKeyword,
  ogImage
}`

export const postByIdQuery = groq`*[_type == "post" && _id == $id && !(_id in path("drafts.**"))][0] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  body,
  publishedAt,
  _createdAt,
  "authorName": author->name,
  "authorImage": author->image,
  "categories": categories[]->title,
  seoTitle,
  metaDescription,
  excerpt,
  focusKeyword,
  ogImage
}`

export const allPostSlugsQuery = groq`*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]{
  _id,
  "slug": slug.current
}`

export const postPathsQuery = groq`*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]{
  "slug": slug.current
}`

export const latestPostsQuery = groq`*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(coalesce(publishedAt, _createdAt) desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  _createdAt,
  "authorName": author->name,
  "authorImage": author->image
}`

export const latestPostsByCategoryQuery = groq`*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**")) && $category in categories[]->title] | order(coalesce(publishedAt, _createdAt) desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  _createdAt,
  "authorName": author->name,
  "authorImage": author->image
}`
