import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Calendar, Clock, Github, Link2, Mail } from "lucide-react";
import { about, post, profile } from "@/data/portfolio";

export const Route = createFileRoute("/blog/$slug")({
  head: () => ({
    meta: [{ title: `${post.title} | ${profile.name}` }],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const [copied, setCopied] = useState(false);

  if (slug !== post.slug) {
    return (
      <div className="app-root mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-3xl font-bold text-fg">Article not found</h1>
        <Link to="/blog" className="mt-6 inline-flex text-accent">
          Back to Blog
        </Link>
      </div>
    );
  }

  const copy = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <article className="app-root mx-auto min-h-screen max-w-3xl px-5 py-12 sm:px-8">
      <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
        <ArrowLeft className="size-4" />
        Back to Blog
      </Link>
      <p className="mt-10 flex flex-wrap items-center gap-4 text-[11px] tracking-[0.18em] text-muted uppercase">
        <span className="inline-flex items-center gap-2">
          <Calendar className="size-3.5" />
          {post.dateFull}
        </span>
        <span className="inline-flex items-center gap-2">
          <Clock className="size-3.5" />
          {post.minutes} min read
        </span>
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-fg sm:text-6xl">{post.title}</h1>
      <p className="mt-4 text-xl text-muted">{post.subtitle}</p>
      <div className="mt-8 flex items-center justify-between gap-4 border-y border-line py-4">
        <div className="flex items-center gap-3">
          <img src={profile.avatar} alt="" className="size-11 rounded-full object-cover" />
          <div>
            <p className="text-sm font-semibold text-fg">{post.author}</p>
            <p className="text-[11px] tracking-[0.16em] text-muted uppercase">Author</p>
          </div>
        </div>
        <button type="button" onClick={copy} className="inline-flex items-center gap-2 text-sm text-fg" aria-label="Copy link">
          <Link2 className="size-4" />
          {copied ? "Copied" : ""}
        </button>
      </div>
      <img src={post.cover} alt="" className="mt-8 w-full rounded-3xl border border-line object-cover" />
      <div className="mt-8 space-y-6 text-base leading-relaxed text-fg sm:text-lg">
        {post.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-12 border-t border-line pt-8">
        <div className="flex items-center gap-4">
          <img src={profile.avatar} alt="" className="size-16 rounded-full object-cover" />
          <div>
            <p className="font-bold text-fg">Written by {profile.name}</p>
            <p className="mt-1 max-w-md text-sm text-muted">{aboutSnippet}</p>
            <Link to="/" className="mt-2 inline-flex text-sm font-semibold text-fg">
              View Portfolio →
            </Link>
          </div>
        </div>
        <div className="mt-8 flex gap-4 text-fg">
          <a href={profile.github} aria-label="GitHub" target="_blank" rel="noreferrer">
            <Github className="size-5" />
          </a>
          <a href={profile.x} aria-label="X" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <Mail className="size-5" />
          </a>
        </div>
      </div>
    </article>
  );
}

const aboutSnippet = about[0].length > 140 ? `${about[0].slice(0, 137)}...` : about[0];
