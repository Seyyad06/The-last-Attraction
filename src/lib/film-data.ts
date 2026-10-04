import hero from '@/assets/park-hero.jpg';
import friends from '@/assets/five-friends.jpg';
import entry from '@/assets/park-entry.jpg';
import entrance from '@/assets/entrance.jpg';
import ticket from '@/assets/ticket.jpg';
import carousel from '@/assets/carousel.jpg';
import wheel from '@/assets/ferris-wheel.jpg';
import coaster from '@/assets/roller-coaster.jpg';
import corridor from '@/assets/corridor.jpg';
import ethan from '@/assets/ethan.jpg';
import ryan from '@/assets/ryan.jpg';
import daniel from '@/assets/daniel.jpg';
import alex from '@/assets/alex.jpg';
import jake from '@/assets/jake.jpg';

export const images = { hero, friends, entry, ticket };
export const navigation = [['home', 'Home'], ['story', 'The Story'], ['trailer', 'Trailer'], ['cast', 'Cast'], ['gallery', 'Gallery'], ['film', 'About the Film']] as const;
export const cast = [
  { actor: 'Noah Bennett', character: 'Ethan Carter', age: 16, image: ethan, role: 'The curious leader. Always searching for answers, even when the questions should be left alone.', bio: 'Bennett brings a quiet intensity and natural curiosity to Ethan in his fictional feature-film debut.' },
  { actor: 'Lucas Hayes', character: 'Ryan Miller', age: 16, image: ryan, role: 'The fearless best friend. A sharp wit, an adventurous spirit, and a loyalty that never falters.', bio: 'Hayes balances quick-fire humor with vulnerability as Ethan’s fiercely loyal best friend.' },
  { actor: 'Mason Reed', character: 'Daniel Brooks', age: 17, image: daniel, role: 'The silent observer. He sees the details everyone else misses. And something is very wrong.', bio: 'Reed gives a restrained, observant performance as the first friend to sense the park’s hidden pattern.' },
  { actor: 'Liam Parker', character: 'Alex Turner', age: 16, image: alex, role: 'The restless spirit. The first to laugh. The first to realize this is no ordinary adventure.', bio: 'Parker lends warmth and restless energy to Alex, whose humor hides a growing sense of dread.' },
  { actor: 'Owen Mitchell', character: 'Jake Wilson', age: 17, image: jake, role: 'The protector. Strong enough to stand his ground. But some things cannot be fought.', bio: 'Mitchell anchors the group as Jake, bringing a protective presence and understated emotional depth.' },
];
export const gallery = [
  { image: entrance, title: 'The gates are open', subtitle: 'The abandoned park entrance' },
  { image: entry, title: 'Five friends. One way in.', subtitle: 'Approaching the park' },
  { image: ticket, title: 'Admit one', subtitle: 'The golden ticket' },
  { image: carousel, title: 'One more ride', subtitle: 'The forgotten carousel' },
  { image: wheel, title: 'Midnight at the wheel', subtitle: 'The Ferris wheel' },
  { image: coaster, title: 'Beyond the fog', subtitle: 'The abandoned roller coaster' },
  { image: corridor, title: 'Do not look back', subtitle: 'Inside the attraction' },
  { image: friends, title: 'It was waiting for them', subtitle: 'Something in the darkness' },
];
export const details = [['Release Date', 'December 17, 2026'], ['Genre', 'Horror / Mystery / Thriller'], ['Runtime', '1h 48min'], ['Rating', 'PG-13'], ['Director', 'Ethan Cole'], ['Writers', 'Daniel Mercer & Ryan Blake'], ['Production', 'Blackwood Pictures']];