import { SectionHeading } from '@/components/site/section-heading'
import { BlogPagination } from '@/components/blog/blog-pagination'
import { BlogToolbar } from '@/components/blog/blog-toolbar'
import { FeaturedPost, PostGrid } from '@/components/blog/post-card'
import { getAllPosts, POSTS_PER_PAGE } from '@/lib/blog'

export function getBlogPageCount() {
  const rest = getAllPosts().filter((p) => !p.featured)
  return Math.max(1, Math.ceil(rest.length / POSTS_PER_PAGE))
}

export function BlogIndex({ page }: { page: number }) {
  const all = getAllPosts()
  const featured = all.find((p) => p.featured)
  const rest = all.filter((p) => p !== featured)
  const totalPages = getBlogPageCount()
  const pagePosts = rest.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <SectionHeading
        as="h1"
        align="left"
        eyebrow="Blog"
        title="News from AbstractOS"
        description="Release notes, engineering deep dives, design stories and community updates from the people building AbstractOS."
      />

      <div className="mt-10 flex flex-col gap-10">
        <BlogToolbar />
        {page === 1 && featured && <FeaturedPost post={featured} />}
        <section aria-labelledby="latest-heading" className="flex flex-col gap-6">
          <h2 id="latest-heading" className="text-xl font-semibold">
            {page === 1 ? 'Latest posts' : `Posts — page ${page}`}
          </h2>
          <PostGrid posts={pagePosts} />
        </section>
      </div>

      <BlogPagination page={page} totalPages={totalPages} />
    </div>
  )
}
