/* ---------- Netflix data store ----------
 * Comprehensive data keyed by dataSource strings.
 * Page blocks reference these via `dataSource: 'netflix.xxx'`.
 */

export type NetflixTitle = {
  id: string;
  title: string;
  year: string;
  seasons: string;
  genre: string;
  rating: string;
  match: string;
  thumbnail: string;
};

export type NetflixTitleDetail = {
  id: string;
  title: string;
  year: string;
  seasons: string;
  genre: string;
  rating: string;
  imdb: string;
  description: string;
  cast: string[];
  tags: string[];
};

export type NetflixEpisode = {
  id: string;
  number: number;
  title: string;
  duration: string;
  description: string;
};

export type NetflixCategory = {
  id: string;
  name: string;
  icon: string;
};

export type NetflixProfile = {
  id: string;
  name: string;
  initials: string;
  isKids: boolean;
};

export type NetflixMyListItem = {
  id: string;
  title: string;
  seasons: string;
  genre: string;
};

export type NetflixTrendingItem = {
  id: string;
  title: string;
  year: string;
  seasons: string;
  genre: string;
  rank: number;
};

export type NetflixNewRelease = {
  id: string;
  title: string;
  year: string;
  type: string;
  genre: string;
};

export const NETFLIX_DATA: Record<string, any> = {
  /* 1. Titles */
  'netflix.titles': [
    { id: 'nt1', title: 'Stranger Things', year: '2016', seasons: '4 Seasons', genre: 'Sci-Fi', rating: 'TV-14', match: '97%', thumbnail: 'https://picsum.photos/seed/nflx1/300/170' },
    { id: 'nt2', title: 'Wednesday', year: '2022', seasons: '1 Season', genre: 'Comedy', rating: 'TV-14', match: '95%', thumbnail: 'https://picsum.photos/seed/nflx2/300/170' },
    { id: 'nt3', title: 'The Witcher', year: '2019', seasons: '3 Seasons', genre: 'Fantasy', rating: 'TV-MA', match: '93%', thumbnail: 'https://picsum.photos/seed/nflx3/300/170' },
    { id: 'nt4', title: 'Bridgerton', year: '2020', seasons: '3 Seasons', genre: 'Romance', rating: 'TV-MA', match: '91%', thumbnail: 'https://picsum.photos/seed/nflx4/300/170' },
    { id: 'nt5', title: 'Squid Game', year: '2021', seasons: '2 Seasons', genre: 'Thriller', rating: 'TV-MA', match: '96%', thumbnail: 'https://picsum.photos/seed/nflx5/300/170' },
    { id: 'nt6', title: 'Money Heist', year: '2017', seasons: '5 Seasons', genre: 'Crime', rating: 'TV-MA', match: '90%', thumbnail: 'https://picsum.photos/seed/nflx6/300/170' },
    { id: 'nt7', title: 'The Crown', year: '2016', seasons: '6 Seasons', genre: 'Drama', rating: 'TV-MA', match: '89%', thumbnail: 'https://picsum.photos/seed/nflx7/300/170' },
    { id: 'nt8', title: 'Better Call Saul', year: '2015', seasons: '6 Seasons', genre: 'Crime', rating: 'TV-MA', match: '94%', thumbnail: 'https://picsum.photos/seed/nflx8/300/170' },
    { id: 'nt9', title: 'Peaky Blinders', year: '2013', seasons: '6 Seasons', genre: 'Crime', rating: 'TV-MA', match: '92%', thumbnail: 'https://picsum.photos/seed/nflx9/300/170' },
    { id: 'nt10', title: 'Dark', year: '2017', seasons: '3 Seasons', genre: 'Sci-Fi', rating: 'TV-MA', match: '88%', thumbnail: 'https://picsum.photos/seed/nflx10/300/170' },
    { id: 'nt11', title: 'Black Mirror', year: '2011', seasons: '6 Seasons', genre: 'Sci-Fi', rating: 'TV-MA', match: '85%', thumbnail: 'https://picsum.photos/seed/nflx11/300/170' },
    { id: 'nt12', title: 'Ozark', year: '2017', seasons: '4 Seasons', genre: 'Crime', rating: 'TV-MA', match: '87%', thumbnail: 'https://picsum.photos/seed/nflx12/300/170' },
  ] as NetflixTitle[],

  /* 2. Title detail */
  'netflix.title.detail': {
    id: 'nt1',
    title: 'Stranger Things',
    year: '2022',
    seasons: '4 Seasons',
    genre: 'Sci-Fi · Horror · Drama',
    rating: 'TV-14',
    imdb: '8.7',
    description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
    cast: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder', 'David Harbour', 'Gaten Matarazzo'],
    tags: ['Sci-Fi', 'Horror', 'Drama', 'Mystery', 'Netflix Original'],
  } as NetflixTitleDetail,

  /* 3. Title episodes */
  'netflix.title.episodes': [
    { id: 'ep1', number: 1, title: 'The Hellfire Club', duration: '56m', description: 'A shocking discovery leads the gang to a new threat as they navigate high school.' },
    { id: 'ep2', number: 2, title: 'Vecna\'s Curse', duration: '63m', description: 'A new foe surfaces as Dustin and Steve investigate a mysterious house in the woods.' },
    { id: 'ep3', number: 3, title: 'The Monster and the Superhero', duration: '58m', description: 'An unlikely hero emerges as the group searches for a way to stop the new threat.' },
    { id: 'ep4', number: 4, title: 'Dear Billy', duration: '61m', description: 'Max faces her fears as the group races against time to save a friend.' },
    { id: 'ep5', number: 5, title: 'The Nina Project', duration: '64m', description: 'Joyce and Murray make a daring rescue while Eleven faces a painful memory.' },
    { id: 'ep6', number: 6, title: 'The Dive', duration: '57m', description: 'The group hatches a risky plan to infiltrate the Upside Down.' },
    { id: 'ep7', number: 7, title: 'The Massacre at Hawkins Lab', duration: '68m', description: 'Eleven confronts a dark truth about her past as the team closes in on the enemy.' },
    { id: 'ep8', number: 8, title: 'Papa', duration: '65m', description: 'A rescue mission goes awry as the gang fights to survive an escalating threat.' },
    { id: 'ep9', number: 9, title: 'The Piggyback', duration: '85m', description: 'The final battle begins as the group risks everything to save Hawkins and each other.' },
    { id: 'ep10', number: 10, title: 'The Battle of Starcourt', duration: '52m', description: 'The Mind Flayer descends on the mall as the group fights to save Hawkins.' },
    { id: 'ep11', number: 11, title: 'The Bite', duration: '49m', description: 'A deadly threat closes in as the group scrambles to protect their own.' },
    { id: 'ep12', number: 12, title: 'The Gate', duration: '55m', description: 'Eleven and the gang make a last stand to close the gate to the Upside Down.' },
  ] as NetflixEpisode[],

  /* 4. Categories */
  'netflix.categories': [
    { id: 'cat1', name: 'Action', icon: 'Swords' },
    { id: 'cat2', name: 'Comedy', icon: 'Laugh' },
    { id: 'cat3', name: 'Drama', icon: 'Drama' },
    { id: 'cat4', name: 'Horror', icon: 'Ghost' },
    { id: 'cat5', name: 'Sci-Fi', icon: 'Rocket' },
    { id: 'cat6', name: 'Documentary', icon: 'Film' },
    { id: 'cat7', name: 'Thriller', icon: 'Eye' },
    { id: 'cat8', name: 'Romance', icon: 'Heart' },
    { id: 'cat9', name: 'Crime', icon: 'Search' },
    { id: 'cat10', name: 'Fantasy', icon: 'Sparkles' },
  ] as NetflixCategory[],

  /* 5. My List */
  'netflix.mylist': [
    { id: 'ml1', title: 'Stranger Things', seasons: '4 Seasons', genre: 'Sci-Fi' },
    { id: 'ml2', title: 'Wednesday', seasons: '1 Season', genre: 'Comedy' },
    { id: 'ml3', title: 'The Crown', seasons: '6 Seasons', genre: 'Drama' },
    { id: 'ml4', title: 'Better Call Saul', seasons: '6 Seasons', genre: 'Crime' },
    { id: 'ml5', title: 'Peaky Blinders', seasons: '6 Seasons', genre: 'Crime' },
    { id: 'ml6', title: 'Dark', seasons: '3 Seasons', genre: 'Sci-Fi' },
    { id: 'ml7', title: 'The Witcher', seasons: '3 Seasons', genre: 'Fantasy' },
    { id: 'ml8', title: 'Mindhunter', seasons: '2 Seasons', genre: 'Crime' },
    { id: 'ml9', title: 'Ozark', seasons: '4 Seasons', genre: 'Crime' },
    { id: 'ml10', title: 'Black Mirror', seasons: '6 Seasons', genre: 'Sci-Fi' },
  ] as NetflixMyListItem[],

  /* 6. Trending */
  'netflix.trending': [
    { id: 'tr1', title: 'Wednesday', year: '2022', seasons: '1 Season', genre: 'Comedy', rank: 1 },
    { id: 'tr2', title: 'The Witcher', year: '2019', seasons: '3 Seasons', genre: 'Fantasy', rank: 2 },
    { id: 'tr3', title: 'Bridgerton', year: '2020', seasons: '3 Seasons', genre: 'Romance', rank: 3 },
    { id: 'tr4', title: 'Squid Game', year: '2021', seasons: '2 Seasons', genre: 'Thriller', rank: 4 },
    { id: 'tr5', title: 'Money Heist', year: '2017', seasons: '5 Seasons', genre: 'Crime', rank: 5 },
    { id: 'tr6', title: 'Stranger Things', year: '2016', seasons: '4 Seasons', genre: 'Sci-Fi', rank: 6 },
    { id: 'tr7', title: 'The Crown', year: '2016', seasons: '6 Seasons', genre: 'Drama', rank: 7 },
    { id: 'tr8', title: 'Dark', year: '2017', seasons: '3 Seasons', genre: 'Sci-Fi', rank: 8 },
    { id: 'tr9', title: 'Peaky Blinders', year: '2013', seasons: '6 Seasons', genre: 'Crime', rank: 9 },
    { id: 'tr10', title: 'Black Mirror', year: '2011', seasons: '6 Seasons', genre: 'Sci-Fi', rank: 10 },
  ] as NetflixTrendingItem[],

  /* 7. New Releases */
  'netflix.newReleases': [
    { id: 'nr1', title: 'Rebel Moon', year: '2023', type: 'Movie', genre: 'Sci-Fi' },
    { id: 'nr2', title: 'Leave the World Behind', year: '2023', type: 'Movie', genre: 'Thriller' },
    { id: 'nr3', title: 'The Crown', year: '2023', type: 'Series', genre: 'Drama' },
    { id: 'nr4', title: 'Berlin', year: '2023', type: 'Series', genre: 'Crime' },
    { id: 'nr5', title: 'Percy Jackson', year: '2023', type: 'Series', genre: 'Fantasy' },
    { id: 'nr6', title: 'The Fall of the House of Usher', year: '2023', type: 'Series', genre: 'Horror' },
    { id: 'nr7', title: 'All the Light We Cannot See', year: '2023', type: 'Series', genre: 'Drama' },
    { id: 'nr8', title: 'The Killer', year: '2023', type: 'Movie', genre: 'Thriller' },
    { id: 'nr9', title: 'Lift', year: '2024', type: 'Movie', genre: 'Action' },
    { id: 'nr10', title: 'Griselda', year: '2024', type: 'Series', genre: 'Crime' },
  ] as NetflixNewRelease[],

  /* 8. Profiles */
  'netflix.profiles': [
    { id: 'p1', name: 'Alex', initials: 'A', isKids: false },
    { id: 'p2', name: 'Jordan', initials: 'J', isKids: false },
    { id: 'p3', name: 'Sam', initials: 'S', isKids: false },
    { id: 'p4', name: 'Kids', initials: 'K', isKids: true },
    { id: 'p5', name: 'Taylor', initials: 'T', isKids: false },
  ] as NetflixProfile[],
};
