import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { post, profile } from "@/data/portfolio";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [{ title: `Blog | ${profile.name}` }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <div className="app-root mx-auto min-h-screen max-w-3xl px-5 py-12 sm:px-8">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
        <ArrowLeft className="size-4" />
        Back to Portfolio
      </Link>
      <h1 className="mt-10 text-5xl font-bold tracking-tight text-fg sm:text-6xl">Blog</h1>
      <p className="mt-4 text-lg text-muted">
        Thoughts, articles and shared knowledge by {profile.name} .
      </p>
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="group mt-10 block overflow-hidden rounded-3xl border border-line bg-card"
      >
        <img src={post.cover} alt="" className="aspect-[16/9] w-full object-cover object-top" />
        <div className="space-y-3 p-6">
          <p className="text-[11px] tracking-[0.18em] text-muted uppercase">
            {post.minutes} min read <span className="px-2">•</span> {post.dateFull}
          </p>
          <h2 className="text-3xl font-bold text-fg">{post.title}</h2>
          <p className="text-muted">{post.excerpt}</p>
          <div className="flex items-center justify-between border-t border-line pt-4">
            <div className="flex items-center gap-3">
              <img src={profile.avatar} alt="" className="size-10 rounded-full object-cover" />
              <p className="max-w-56 text-xs font-semibold tracking-wide text-fg uppercase">{post.author}</p>
            </div>
            <span className="text-sm font-semibold tracking-widest text-fg">READ →</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
