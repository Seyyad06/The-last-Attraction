import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowUpRight, Play, Menu, X, Instagram, Youtube, Music2, Check, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FilmOverlays } from '@/components/film-overlays';
import { cast, details, gallery, images, navigation } from '@/lib/film-data';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'The Last Attraction | Official Movie Website | December 17, 2026' },
    { name: 'description', content: 'Every attraction has a secret. Enter the world of The Last Attraction, a fictional horror mystery from Blackwood Pictures. In theaters December 17, 2026.' },
    { property: 'og:title', content: 'The Last Attraction — Every attraction has a secret.' },
    { property: 'og:description', content: 'Five friends. One golden ticket. A park that never forgot. Discover the fictional film, cast, and cinematic stills. December 17, 2026.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

function Index() {
  const [trailer, setTrailer] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [email, setEmail] = useState('');
  const [newsletter, setNewsletter] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('revealed'); reveal.unobserve(entry.target); } }), { threshold: .08 });
    document.querySelectorAll('.reveal').forEach(element => reveal.observe(element));
    const sections = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }), { rootMargin: '-20% 0px -55% 0px' });
    navigation.forEach(([id]) => { const element = document.getElementById(id); if (element) sections.observe(element); });
    return () => { window.removeEventListener('scroll', onScroll); reveal.disconnect(); sections.disconnect(); };
  }, []);
  useEffect(() => { if (!menu) return; const before = document.body.style.overflow; document.body.style.overflow = 'hidden'; const key = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenu(false); }; window.addEventListener('keydown', key); return () => { document.body.style.overflow = before; window.removeEventListener('keydown', key); }; }, [menu]);
  async function join(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setNewsletter('saving');
    try { const { error } = await supabase.from('film_newsletter').insert({ email: email.trim().toLowerCase() }); if (error && error.code !== '23505') throw error; setNewsletter('success'); } catch { setNewsletter('error'); }
  }
  const openTrailer = () => { setMenu(false); setTrailer(true); };
  return <div className="movie-site">
    <a href="#main" className="skip-link">Skip to content</a>
    <header className={`movie-nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <a href="#home" className="nav-wordmark" aria-label="The Last Attraction home">THE LAST<span>ATTRACTION</span></a>
      <nav aria-label="Main navigation" className="desktop-nav">{navigation.map(([id, name]) => <a href={`#${id}`} key={id} className={active === id ? 'active' : ''}>{name}</a>)}</nav>
      <Button variant="cinema" className="nav-trailer" onClick={openTrailer}><Play /> Watch trailer</Button>
      <Button variant="cinemaIcon" className="mobile-toggle" aria-label={menu ? 'Close navigation' : 'Open navigation'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</Button>
    </header>
    {menu && <div className="mobile-menu"><nav aria-label="Mobile navigation">{navigation.map(([id, name], index) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}><span>0{index + 1}</span>{name}<ArrowUpRight /></a>)}</nav><Button variant="cinema" onClick={openTrailer}><Play /> Watch trailer</Button><p>THE GATES OPEN DECEMBER 17</p></div>}
    <main id="main">
      <section id="home" className="movie-hero">
        <img className="hero-image" src={images.hero} alt="An abandoned carousel and Ferris wheel under a full moon, with fog over the wet amusement park" width={1920} height={1088} fetchPriority="high" />
        <div className="hero-shade" /><div className="fog-layer" />
        <div className="hero-content"><p className="eyebrow hero-eyebrow">A BLACKWOOD PICTURES FILM</p><h1><span>THE LAST</span><strong>ATTRACTION</strong></h1><p className="hero-tagline">Every attraction has a secret.</p><div className="hero-actions"><Button variant="cinema" onClick={openTrailer}><Play /> Watch trailer</Button><Button variant="cinemaOutline" asChild><a href="#story">Explore the film <ArrowUpRight /></a></Button></div><p className="release-line">IN THEATERS <strong>DECEMBER 17, 2026</strong></p><div className="hero-meta"><span>HORROR / MYSTERY / THRILLER</span><i /><span>1H 48MIN</span><span className="rating">PG-13</span></div></div>
        <a href="#story" className="scroll-cue"><span>THE NIGHT IS JUST BEGINNING</span><ArrowDown /></a><span className="hero-side-note">SOME PLACES SHOULD STAY FORGOTTEN.</span>
      </section>
      <section id="story" className="story-section section-pad"><div className="story-background"><img src={images.entry} alt="Five friends standing before the illuminated gates" loading="lazy" /></div><div className="section-inner story-inner reveal"><div className="section-index"><span>01</span> THE STORY</div><div className="story-copy"><p className="eyebrow">FIVE FRIENDS. ONE TICKET. NO WAY BACK.</p><h2>THE PARK NEVER<br /><em>FORGOT THEM.</em></h2><p>For decades, the gates stood closed. The rides fell silent. And the world forgot what happened here.</p><p>When five teenage friends step inside an abandoned amusement park, a night of exploration takes a darker turn. An old golden ticket. A flickering light. A carousel that begins to turn.</p><p>The park is waking up. And it knows they’re here.</p>{expanded && <div className="extended-story"><p>Distorted carnival music echoes through empty paths. Behind the forgotten attractions, hidden rooms begin to reveal themselves — and every discovery draws the friends deeper into the darkness.</p><p>They came looking for an adventure. But the park was abandoned for a reason. And the golden ticket may have been waiting for them all along.</p></div>}<Button variant="cinemaText" onClick={() => setExpanded(!expanded)}>{expanded ? 'Close the story' : 'Discover the story'}<ArrowUpRight /></Button></div></div></section>
      <section id="trailer" className="trailer-section section-pad"><div className="section-inner reveal"><div className="section-heading"><div><p className="eyebrow">YOUR FIRST LOOK INTO THE DARKNESS</p><h2>THE OFFICIAL TRAILER</h2><p className="section-subtitle">Some places should stay forgotten.</p></div><span className="section-number">02 / TRAILER</span></div><Button variant="cinemaIcon" className="trailer-poster" aria-label="Watch the trailer storyboard" onClick={openTrailer}><img src={images.friends} alt="The five friends at the park entrance, Daniel holding the golden ticket" loading="lazy" width={1920} height={1088} /><span className="poster-shade" /><span className="big-play"><Play /></span><span className="trailer-poster-caption"><span>THE LAST ATTRACTION<small>OFFICIAL TRAILER</small></span><span>ENTER IF YOU DARE <ArrowUpRight /></span></span></Button><p className="media-disclaimer">Official trailer · Watch now</p></div></section>
      <section id="cast" className="cast-section section-pad"><div className="section-inner reveal"><div className="section-heading"><div><p className="eyebrow">THEY CAME TOGETHER. WILL THEY LEAVE TOGETHER?</p><h2>MEET THE CAST</h2></div><span className="section-number">03 / THE FIVE</span></div><div className="cast-grid">{cast.map(person => <article className="cast-card" key={person.actor}><div className="cast-portrait"><img src={person.image} alt={`${person.actor} as ${person.character}`} loading="lazy" /><span className="portrait-shade" /><span className="cast-age">{person.age} / {person.character.split(' ')[0].toUpperCase()}</span></div><div className="cast-info"><h3>{person.actor}</h3><p className="character-name">AS {person.character.toUpperCase()}</p><p className="character-role">{person.role}</p><details><summary>Actor biography <Plus /></summary><p>{person.bio}</p></details></div></article>)}</div><p className="media-disclaimer">Fictional cast and characters. Original cinematic concept portraits.</p></div></section>
      <section id="gallery" className="gallery-section section-pad"><div className="section-inner reveal"><div className="section-heading"><div><p className="eyebrow">SOME THINGS ARE BETTER LEFT UNSEEN</p><h2>GLIMPSES OF THE PARK</h2></div><span className="section-number">04 / GALLERY</span></div><div className="gallery-grid">{gallery.map((still, index) => <Button key={still.title} variant="cinemaIcon" className={`gallery-tile gallery-tile-${index}`} onClick={() => setSelected(index)} aria-label={`View ${still.subtitle}`}><img src={still.image} alt={still.subtitle} loading="lazy" /><span className="gallery-tile-shade" /><span className="gallery-caption"><span><small>0{index + 1} / MOVIE STILL</small>{still.title}</span><Plus /></span></Button>)}</div></div></section>
      <section id="film" className="film-section section-pad"><div className="section-inner film-inner reveal"><div><p className="eyebrow">BEHIND THE DARKNESS</p><h2>THE FILM</h2><p className="film-quote">“Every attraction<br />has a secret.”</p><span className="studio-lockup">BLACKWOOD<small>PICTURES</small></span></div><dl className="film-details">{details.map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl></div></section>
      <section className="reviews-section"><div className="section-inner reveal"><p className="eyebrow review-label">WHISPERS FROM THE DARK</p><div className="review-grid">{[['An atmospheric nightmare from beginning to end.', 'THE NIGHTLY REVIEW'], ['A haunting return to classic amusement-park horror.', 'CINEMA WEEKLY'], ['Dark, mysterious and relentlessly suspenseful.', 'SCREEN JOURNAL']].map(([quote, author]) => <figure key={author}><span className="quote-mark">“</span><blockquote>{quote}</blockquote><figcaption>— {author}</figcaption></figure>)}</div><p className="media-disclaimer">Fictional promotional reviews. Publications and quotations are not real critic endorsements.</p></div></section>
      <section className="newsletter-section section-pad"><img className="newsletter-background" src={images.hero} alt="" loading="lazy" /><div className="newsletter-shade" /><div className="newsletter-inner reveal"><p className="eyebrow">YOUR TICKET TO THE UNKNOWN</p><h2>ENTER THE PARK</h2><p>Sign up for exclusive trailers, posters, behind-the-scenes<br className="desktop-break" /> footage and movie updates.</p>{newsletter === 'success' ? <div className="newsletter-success" role="status"><Check /><span>You’re on the list. We’ll see you at the gates.</span></div> : <form onSubmit={join}><label htmlFor="newsletter-email" className="sr-only">Email address</label><input id="newsletter-email" type="email" placeholder="Your email address" autoComplete="email" required maxLength={254} value={email} onChange={event => setEmail(event.target.value)} /><Button variant="cinema" disabled={newsletter === 'saving'} type="submit">{newsletter === 'saving' ? 'Joining…' : 'Join the list'}<ArrowUpRight /></Button></form>}{newsletter === 'error' && <p className="form-error" role="alert">The gates aren’t opening right now. Please try again.</p>}<small>By joining, you agree to receive movie updates from Blackwood Pictures.<br />Your email stays private. Unsubscribe from future emails at any time.</small></div></section>
    </main>
    <footer className="movie-footer"><div className="section-inner"><div className="footer-top"><div><a href="#home" className="footer-wordmark">THE LAST ATTRACTION</a><p>Every attraction has a secret.</p></div><div className="social-links">{[['Instagram', Instagram, 'https://www.instagram.com/'], ['YouTube', Youtube, 'https://www.youtube.com/'], ['TikTok', Music2, 'https://www.tiktok.com/'], ['X', X, 'https://x.com/']].map(([name, Icon, href]) => { const SocialIcon = Icon as typeof Instagram; return <Button key={String(name)} variant="cinemaIcon" asChild><a href={String(href)} aria-label={`${String(name)} — platform homepage`} target="_blank" rel="noopener noreferrer" title={String(name)}><SocialIcon /></a></Button>; })}</div></div><nav className="footer-nav" aria-label="Footer navigation">{navigation.map(([id, name]) => <a key={id} href={`#${id}`}>{name === 'About the Film' ? 'About' : name}</a>)}</nav><div className="footer-bottom"><p>© 2026 Blackwood Pictures. All Rights Reserved.</p><p>A FICTIONAL MOTION PICTURE · SOCIAL LINKS LEAD TO PLATFORM HOMEPAGES</p><span className="rating">PG-13</span></div></div></footer>
    <FilmOverlays trailer={trailer} closeTrailer={() => setTrailer(false)} selected={selected} select={setSelected} />
  </div>;
}
