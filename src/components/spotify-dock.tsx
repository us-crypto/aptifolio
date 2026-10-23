import { useState } from "react";
import { Music2, X } from "lucide-react";
import { spotifyPlaylist } from "@/data/portfolio";

export function SpotifyDock() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative z-40 flex flex-col items-start gap-2">
      {open ? (
        <div className="absolute bottom-14 left-1/2 z-40 w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-line bg-black/90 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between px-3 py-2 text-xs tracking-wide text-muted uppercase">
            <span>On rotation</span>
            <button type="button" aria-label="Close player" onClick={() => setOpen(false)} className="p-1 text-fg">
              <X className="size-4" />
            </button>
          </div>
          <iframe
            title="Spotify playlist"
            src={`https://open.spotify.com/embed/playlist/${spotifyPlaylist}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="border-0"
          />
        </div>
      ) : null}
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Hide playlist" : "Open playlist"}
        onClick={() => setOpen((value) => !value)}
        className="flex size-12 items-center justify-center rounded-full border border-line bg-black/80 text-fg shadow-lg backdrop-blur-md transition-transform hover:scale-105"
      >
        <Music2 className="size-5" />
      </button>
    </div>
  );
}
