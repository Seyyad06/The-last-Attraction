import { useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowLeft, ArrowRight, Play, Pause, X, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gallery, images } from '@/lib/film-data';
import trailerVideo from '@/assets/last_attraction_trailer_v2.mp4';

const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export function FilmOverlays({ trailer, closeTrailer, selected, select }: { trailer: boolean; closeTrailer: () => void; selected: number | null; select: (value: number | null) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  useEffect(() => { if (!trailer) { setTime(0); setPlaying(true); setMuted(false); } }, [trailer]);
  useEffect(() => {
    if (selected === null) return;
    const key = (event: KeyboardEvent) => { if (event.key === 'ArrowRight') select((selected + 1) % gallery.length); if (event.key === 'ArrowLeft') select((selected + gallery.length - 1) % gallery.length); };
    window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key);
  }, [selected, select]);
  const still = selected !== null ? gallery[selected] : undefined;
  const togglePlay = () => { const v = videoRef.current; if (!v) return; if (v.paused) void v.play(); else v.pause(); };
  const toggleMute = () => { const v = videoRef.current; if (!v) return; v.muted = !v.muted; setMuted(v.muted); };
  const seek = (event: React.MouseEvent<HTMLProgressElement>) => {
    const v = videoRef.current; if (!v || !duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    v.currentTime = ((event.clientX - rect.left) / rect.width) * duration;
  };
  return <>
    <Dialog.Root open={trailer} onOpenChange={open => { if (!open) closeTrailer(); }}>
      <Dialog.Portal><Dialog.Overlay className="film-overlay" /><Dialog.Content className="trailer-dialog">
        <Dialog.Title className="sr-only">The Last Attraction — official trailer</Dialog.Title>
        <Dialog.Description className="trailer-label">BLACKWOOD PICTURES <span>OFFICIAL TRAILER · {fmt(duration)}</span></Dialog.Description>
        <Dialog.Close asChild><Button variant="cinemaIcon" className="modal-close" aria-label="Close trailer"><X /></Button></Dialog.Close>
        <div className="storyboard">
          <video
            ref={videoRef}
            src={trailerVideo}
            poster={images.hero}
            playsInline
            preload="auto"
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: '#000' }}
            onLoadedMetadata={event => {
              const v = event.currentTarget;
              setDuration(v.duration);
              v.play().catch(() => { v.muted = true; setMuted(true); v.play().catch(() => {}); });
            }}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onTimeUpdate={event => setTime(event.currentTarget.currentTime)}
          />
        </div>
        <div className="trailer-controls">
          <Button variant="cinemaIcon" aria-label={playing ? 'Pause trailer' : 'Play trailer'} onClick={togglePlay}>{playing ? <Pause /> : <Play />}</Button>
          <span>{fmt(time)} / {fmt(duration)}</span>
          <progress value={time} max={duration || 1} aria-label="Trailer progress" onClick={seek} style={{ cursor: 'pointer' }} />
          <Button variant="cinemaIcon" onClick={toggleMute} aria-label={muted ? 'Unmute trailer' : 'Mute trailer'}>{muted ? <VolumeX /> : <Volume2 />}</Button>
        </div>
      </Dialog.Content></Dialog.Portal>
    </Dialog.Root>
    <Dialog.Root open={selected !== null} onOpenChange={open => { if (!open) select(null); }}>
      <Dialog.Portal><Dialog.Overlay className="film-overlay" /><Dialog.Content className="gallery-dialog">
        <Dialog.Close asChild><Button variant="cinemaIcon" className="modal-close" aria-label="Close gallery"><X /></Button></Dialog.Close>
        <Dialog.Title className="sr-only">{still?.title ?? 'Movie still'}</Dialog.Title>
        <Dialog.Description className="sr-only">{still?.subtitle}</Dialog.Description>
        {still && <img src={still.image} alt={still.subtitle} />}
        <div className="lightbox-bottom"><Button variant="cinemaIcon" aria-label="Previous image" onClick={() => select(((selected ?? 0) + 7) % 8)}><ArrowLeft /></Button><div><h3>{still?.title}</h3><p>{String((selected ?? 0) + 1).padStart(2, '0')} / 08 — {still?.subtitle}</p></div><Button variant="cinemaIcon" aria-label="Next image" onClick={() => select(((selected ?? 0) + 1) % 8)}><ArrowRight /></Button></div>
      </Dialog.Content></Dialog.Portal>
    </Dialog.Root>
  </>;
}