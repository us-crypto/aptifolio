import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  ExternalLink,
  Eye,
  FileText,
  Github,
  Globe,
  GraduationCap,
  House,
  Mail,
  MapPin,
  User,
  Wrench,
} from "lucide-react";
import { GitHubGraph } from "@/components/github-graph";
import { SpotifyDock } from "@/components/spotify-dock";
import {
  about,
  education,
  experience,
  post,
  profile,
  projects,
  sections,
  skills,
} from "@/data/portfolio";

const mobileNav = [
  { id: "top", label: "Home", icon: House },
  { id: "about", label: "About", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: Code2 },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "github", label: "GitHub", icon: Github },
];

function useViews() {
  const [views, setViews] = useState(0);
  useEffect(() => {
    const stored = Number(localStorage.getItem("ms-views") || "0");
    let next = Number.isFinite(stored) && stored >= 0 ? stored : 0;
    if (!sessionStorage.getItem("ms-viewed")) {
      next += 1;
      localStorage.setItem("ms-views", String(next));
      sessionStorage.setItem("ms-viewed", "1");
    }
    setViews(next);
  }, []);
  return views;
}

function Heading({ id, children }: { id: string; children: string }) {
  return (
    <div id={id} className="scroll-mt-24">
      <h2 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">{children}</h2>
      <div className="section-rule mt-2" />
    </div>
  );
}
function Identity({ align }: { align: "start" | "center" }) {
  const centered = align === "center";
  const badge = (
    <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-[11px] font-bold tracking-[0.16em] text-fg uppercase">
      <span className="relative flex size-2.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-fg opacity-70" />
        <span className="relative size-2.5 rounded-full bg-fg" />
      </span>
      Open to work
    </span>
  );
  return (
    <div className={centered ? "flex flex-col items-center text-center" : ""}>
      <img
        src={profile.avatar}
        alt={profile.name}
        className={`rounded-full border border-line object-cover shadow-xl ${centered ? "size-32" : "size-28 xl:size-32"}`}
      />
      {centered ? <div className="mt-5">{badge}</div> : null}
      <h1 className={`font-bold tracking-tight text-fg ${centered ? "mt-4 text-4xl" : "mt-6 text-4xl xl:text-5xl"}`}>
        {profile.name}
      </h1>
      <p
        className={`mt-3 font-medium text-fg ${
          centered
            ? "inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-sm"
            : "text-lg xl:text-xl"
        }`}
      >
        {centered ? <Briefcase className="size-4" /> : null}
        {profile.role}
      </p>
      {centered ? null : <div className="mt-4">{badge}</div>}
      <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted">
        <MapPin className="size-4" />
        {profile.location}
      </p>
    </div>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function Socials({ labeled }: { labeled?: boolean }) {
  const icons = [
    { href: profile.github, label: "GitHub", icon: Github, external: true },
    { href: profile.x, label: "X", icon: XIcon, external: true },
    { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
    { href: profile.resume, label: "Resume", icon: FileText, external: true },
  ];
  const labeledItems = [
    { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
    { href: profile.x, label: "X", icon: XIcon, external: true },
    { href: profile.github, label: "GitHub", icon: Github, external: true },
    { href: profile.resume, label: "Resume", icon: FileText, external: true },
  ];
  const items = labeled ? labeledItems : icons;
  if (!labeled) {
    return (
      <div className="flex items-center gap-4 text-muted">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            aria-label={item.label}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noreferrer" : undefined}
            className="transition-colors hover:text-fg"
          >
            <item.icon className="size-5" />
          </a>
        ))}
      </div>
    );
  }
  return (
    <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noreferrer" : undefined}
          className="inline-flex items-center justify-center gap-2 text-sm font-medium text-fg"
        >
          <item.icon className="size-4" />
          {item.label}
        </a>
      ))}
    </div>
  );
}

function Sections({ scope }: { scope: string }) {
  const id = (name: string) => `${scope}${name}`;
  return (
    <div className="space-y-24">
      <section className="rise">
        <Heading id={id("about")}>About</Heading>
        <div className="mt-6 max-w-xl space-y-4 text-sm leading-relaxed text-muted sm:text-base">
          {about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            Open to freelance, contract, or full-time.{" "}
            <a href={profile.whatsapp} className="text-accent underline underline-offset-4" target="_blank" rel="noreferrer">
              Message me on WhatsApp
            </a>
            .
          </p>
        </div>
      </section>

      <section className="rise space-y-10">
        <Heading id={id("experience")}>Experience</Heading>
        {experience.map((job) => (
          <article key={job.role}>
            <a href={job.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2">
              <h3 className="text-xl font-semibold text-fg">{job.role}</h3>
              <ExternalLink className="size-4 text-fg transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <p className="mt-1 font-medium text-fg">{job.company}</p>
            <p className="mt-1 text-sm text-muted">{job.period}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="rise">
        <div className="flex items-end gap-3">
          <Heading id={id("projects")}>Projects</Heading>
          <span className="mb-1 text-lg text-muted">({projects.length})</span>
        </div>
        <div className="mt-8 space-y-8">
          {projects.map((project) => (
            <article key={project.name} className="group overflow-hidden rounded-2xl border border-line bg-card transition-colors hover:border-accent">
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={project.image}
                  alt=""
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-bold tracking-wider text-fg uppercase backdrop-blur-md">
                  <span className={`size-2 rounded-full bg-fg ${project.status === "Live" ? "animate-pulse" : "opacity-60"}`} />
                  {project.status}
                </span>
              </div>
              <div className="space-y-4 p-5">
                <p className="text-xs text-muted">
                  {project.category} <span className="px-1">•</span> {project.date}
                </p>
                <h3 className="text-2xl font-bold text-fg">{project.name}</h3>
                <p className="text-sm leading-relaxed text-muted">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="rounded-full border border-line px-3 py-1 text-xs text-fg">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-5 border-t border-line pt-4">
                  {project.website ? (
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-fg"
                    >
                      <Globe className="size-4" />
                      Website
                    </a>
                  ) : null}
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-fg"
                    >
                      <Github className="size-4" />
                      GitHub
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rise space-y-8">
        <Heading id={id("education")}>Education</Heading>
        {education.map((item) => (
          <article key={item.school}>
            <h3 className="text-xl font-bold text-fg">{item.school}</h3>
            <p className="mt-1 text-sm text-muted">{item.period}</p>
            <p className="mt-3 text-sm text-muted">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="rise">
        <Heading id={id("skills")}>Skills</Heading>
        <div className="mt-6 flex max-w-xl flex-wrap gap-3">
          {skills.map((skill) => (
            <span key={skill} className="rounded-full border border-line px-4 py-2 text-sm text-fg">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="rise">
        <Heading id={id("github")}>GitHub Activity</Heading>
        <div className="mt-6">
          <GitHubGraph />
        </div>
      </section>

      <section className="rise">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Heading id={id("blog")}>Blog</Heading>
            <p className="mt-4 text-sm text-muted">Here I share my articles and thoughts.</p>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-fg">
            View all posts
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <Link
          to="/blog/$slug"
          params={{ slug: post.slug }}
          className="group mt-6 block overflow-hidden rounded-2xl border border-line bg-card transition-colors hover:border-accent"
        >
          <img src={post.cover} alt="" className="aspect-[16/10] w-full object-cover object-top" />
          <div className="space-y-3 p-5">
            <p className="text-[11px] tracking-[0.18em] text-muted uppercase">
              {post.minutes} min <span className="px-1">•</span> {post.dateLabel}
            </p>
            <h3 className="text-2xl font-bold text-fg">{post.title}</h3>
            <p className="text-sm leading-relaxed text-muted">{post.excerpt}</p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-fg">
              Read article
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </section>
    </div>
  );
}

export function PortfolioHome() {
  const scroller = useRef<HTMLElement>(null);
  const [active, setActive] = useState("about");
  const views = useViews();

  useEffect(() => {
    const root = scroller.current;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    const host: HTMLElement | Window = desktop && root ? root : window;
    const onScroll = () => {
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      const ids = ["about", "experience", "projects", "education", "skills", "github", "blog"];
      let current = "about";
      const origin = desktop && root ? root.getBoundingClientRect().top : 0;
      const prefix = desktop ? "" : "m-";
      for (const id of ids) {
        const el = document.getElementById(`${prefix}${id}`);
        if (!el) continue;
        if (el.getBoundingClientRect().top - origin < 180) current = id;
      }
      setActive(current);
    };
    onScroll();
    host.addEventListener("scroll", onScroll, { passive: true });
    return () => host.removeEventListener("scroll", onScroll);
  }, []);

  const jump = (id: string) => {
    if (id === "top") {
      scroller.current?.scrollTo({ top: 0, behavior: "smooth" });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    const el = document.getElementById(desktop ? id : `m-${id}`);
    const root = scroller.current;
    if (desktop && root && el) {
      const top = el.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop - 24;
      root.scrollTo({ top, behavior: "smooth" });
      return;
    }
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const footer = (
    <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-sm text-muted">
      <p>© 2026 Maverick Smith</p>
      <p className="inline-flex items-center gap-2">
        <Eye className="size-4" />
        {views.toLocaleString()} views
      </p>
    </footer>
  );

  return (
    <div className="app-root">
      <div className="stack">
        <nav className="sticky top-0 z-30 flex items-center justify-between border-b border-line/40 bg-black/75 px-3 py-3 backdrop-blur-md">
          {mobileNav.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-label={item.label}
              onClick={() => jump(item.id)}
              className={`flex size-11 items-center justify-center ${
                active === item.id || (item.id === "top" && active === "about") ? "text-fg" : "text-fg/70"
              }`}
            >
              <item.icon className="size-5" />
            </button>
          ))}
        </nav>
        <div id="top" className="px-5 pt-10 pb-16">
          <Identity align="center" />
          <Socials labeled />
          <div className="mt-8 flex justify-center">
            <SpotifyDock />
          </div>
          <div className="mt-14">
            <Sections scope="m-" />
            {footer}
          </div>
        </div>
      </div>

      <div className="desk">
        <aside className="desk-side no-scrollbar">
          <Identity align="start" />
          <nav className="my-10 flex flex-col" aria-label="Sections">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                data-active={active === section.id}
                onClick={() => jump(section.id)}
                className="nav-link group flex items-center py-3 text-left"
              >
                <span className="nav-tick mr-4" />
                <span
                  className={`text-xs font-bold tracking-[0.22em] uppercase transition-colors ${
                    active === section.id ? "text-fg" : "text-muted group-hover:text-fg"
                  }`}
                >
                  {section.label}
                </span>
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Socials />
            <SpotifyDock />
          </div>
        </aside>
        <main ref={scroller} className="desk-main no-scrollbar">
          <Sections scope="" />
          {footer}
        </main>
      </div>
    </div>
  );
}
