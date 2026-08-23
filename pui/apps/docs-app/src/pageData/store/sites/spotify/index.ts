/* ---------- Spotify data store ----------
 * Comprehensive music streaming data keyed by dataSource strings.
 * Page blocks reference these via `dataSource: 'spotify.xxx'`.
 */

export type SpotifyPlaylist = {
  id: string;
  name: string;
  description: string;
  cover: string;
  trackCount: number;
  owner: string;
  duration: string;
  color: string;
};

export type SpotifyAlbumTrack = {
  id: string;
  trackNumber: number;
  title: string;
  duration: string;
  plays: string;
  explicit: boolean;
};

export type SpotifyAlbumDetail = {
  id: string;
  title: string;
  artist: string;
  year: number;
  cover: string;
  genre: string;
  totalTracks: number;
  totalDuration: string;
  label: string;
  description: string;
  color: string;
  tracks: SpotifyAlbumTrack[];
};

export type SpotifyArtistInfo = {
  id: string;
  name: string;
  handle: string;
  monthlyListeners: string;
  followers: string;
  verified: boolean;
  bio: string;
  image: string;
  banner: string;
  genre: string;
  topCities: string[];
};

export type SpotifyArtistAlbum = {
  id: string;
  title: string;
  year: number;
  type: 'Album' | 'EP' | 'Single';
  cover: string;
  trackCount: number;
};

export type SpotifyTrack = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  plays: string;
  cover: string;
  explicit: boolean;
};

export type SpotifyPodcast = {
  id: string;
  title: string;
  host: string;
  description: string;
  cover: string;
  episodes: number;
  category: string;
  rating: number;
};

export type SpotifyRecentItem = {
  id: string;
  title: string;
  artist: string;
  type: 'track' | 'album' | 'playlist' | 'podcast';
  cover: string;
  playedAt: string;
  duration: string;
};

export type SpotifyCategory = {
  id: string;
  name: string;
  icon: string;
  color: string;
  playlistCount: number;
};

export const SPOTIFY_DATA: Record<string, any> = {
  /* 0. Hero playlists — curated subset for the home hero */
  'spotify.hero.playlists': [
    { id: 'pl1', name: 'Today\'s Top Hits', cover: 'https://picsum.photos/seed/pl1/80/80' },
    { id: 'pl7', name: 'Discover Weekly', cover: 'https://picsum.photos/seed/pl7/80/80' },
    { id: 'pl8', name: 'Daily Mix 1', cover: 'https://picsum.photos/seed/pl8/80/80' },
    { id: 'pl4', name: 'Chill Vibes', cover: 'https://picsum.photos/seed/pl4/80/80' },
    { id: 'pl2', name: 'RapCaviar', cover: 'https://picsum.photos/seed/pl2/80/80' },
    { id: 'pl10', name: 'Lo-Fi Beats', cover: 'https://picsum.photos/seed/pl10/80/80' },
  ],

  /* 1. Playlists — 12+ playlists */
  'spotify.playlists': [
    { id: 'pl1', name: 'Today\'s Top Hits', description: 'The hottest tracks right now — updated weekly.', cover: 'https://picsum.photos/seed/pl1/300/300', trackCount: 50, owner: 'Spotify', duration: '2h 45m', color: '#1db954' },
    { id: 'pl2', name: 'RapCaviar', description: 'The most influential voices in hip-hop.', cover: 'https://picsum.photos/seed/pl2/300/300', trackCount: 45, owner: 'Spotify', duration: '2h 20m', color: '#e91429' },
    { id: 'pl3', name: 'Rock Classics', description: 'The greatest rock songs of all time.', cover: 'https://picsum.photos/seed/pl3/300/300', trackCount: 80, owner: 'Spotify', duration: '5h 12m', color: '#cf6f1a' },
    { id: 'pl4', name: 'Chill Vibes', description: 'Kick back to the best new and recent chill hits.', cover: 'https://picsum.photos/seed/pl4/300/300', trackCount: 65, owner: 'Spotify', duration: '3h 30m', color: '#509bf5' },
    { id: 'pl5', name: 'All Out 2010s', description: 'The biggest songs of the 2010s.', cover: 'https://picsum.photos/seed/pl5/300/300', trackCount: 100, owner: 'Spotify', duration: '6h 15m', color: '#777777' },
    { id: 'pl6', name: 'Mega Hit Mix', description: 'A mega mix of 75 favorites from the last few years.', cover: 'https://picsum.photos/seed/pl6/300/300', trackCount: 75, owner: 'Spotify', duration: '4h 20m', color: '#1db954' },
    { id: 'pl7', name: 'Discover Weekly', description: 'Your weekly mixtape of fresh music. Enjoy new discoveries.', cover: 'https://picsum.photos/seed/pl7/300/300', trackCount: 30, owner: 'Spotify', duration: '2h 05m', color: '#509bf5' },
    { id: 'pl8', name: 'Daily Mix 1', description: 'The Weeknd, Drake, SZA and more.', cover: 'https://picsum.photos/seed/pl8/300/300', trackCount: 50, owner: 'Spotify', duration: '2h 50m', color: '#e91429' },
    { id: 'pl9', name: 'Jazz Vibes', description: 'The essential jazz tracks, old and new.', cover: 'https://picsum.photos/seed/pl9/300/300', trackCount: 60, owner: 'Spotify', duration: '4h 00m', color: '#8d67ab' },
    { id: 'pl10', name: 'Lo-Fi Beats', description: 'Beats to relax, study, and focus.', cover: 'https://picsum.photos/seed/pl10/300/300', trackCount: 90, owner: 'Spotify', duration: '5h 30m', color: '#477d95' },
    { id: 'pl11', name: 'Acoustic Hits', description: 'Relaxing acoustic covers and originals.', cover: 'https://picsum.photos/seed/pl11/300/300', trackCount: 40, owner: 'Spotify', duration: '2h 15m', color: '#dc148c' },
    { id: 'pl12', name: 'Workout Twerkout', description: 'High-energy hits to power your workout.', cover: 'https://picsum.photos/seed/pl12/300/300', trackCount: 55, owner: 'Spotify', duration: '3h 10m', color: '#1db954' },
  ] as SpotifyPlaylist[],

  /* 2. Album detail — single album with tracks */
  'spotify.album.detail': {
    id: 'al1',
    title: 'After Hours',
    artist: 'The Weeknd',
    year: 2020,
    cover: 'https://picsum.photos/seed/afterhours/500/500',
    genre: 'R&B / Pop',
    totalTracks: 14,
    totalDuration: '47 min 32 sec',
    label: 'Republic Records',
    description:
      'After Hours is the fourth studio album by Canadian singer The Weeknd. The album explores themes of heartbreak, escapism, and self-reflection, blending synth-pop, R&B, and new wave influences into a cinematic dark-pop experience.',
    color: '#e91429',
    tracks: [
      { id: 't1', trackNumber: 1, title: 'Alone Again', duration: '4:10', plays: '234M', explicit: false },
      { id: 't2', trackNumber: 2, title: 'Too Late', duration: '3:59', plays: '187M', explicit: true },
      { id: 't3', trackNumber: 3, title: 'Hardest to Love', duration: '2:59', plays: '412M', explicit: false },
      { id: 't4', trackNumber: 4, title: 'Scared to Live', duration: '3:24', plays: '156M', explicit: false },
      { id: 't5', trackNumber: 5, title: 'Snowchild', duration: '4:07', plays: '198M', explicit: false },
      { id: 't6', trackNumber: 6, title: 'Escape from LA', duration: '5:07', plays: '167M', explicit: true },
      { id: 't7', trackNumber: 7, title: 'Heartless', duration: '3:18', plays: '567M', explicit: true },
      { id: 't8', trackNumber: 8, title: 'Faith', duration: '4:43', plays: '145M', explicit: true },
      { id: 't9', trackNumber: 9, title: 'Blinding Lights', duration: '3:20', plays: '1.2B', explicit: false },
      { id: 't10', trackNumber: 10, title: 'In Your Eyes', duration: '3:57', plays: '389M', explicit: false },
      { id: 't11', trackNumber: 11, title: 'Save Your Tears', duration: '3:35', plays: '892M', explicit: false },
      { id: 't12', trackNumber: 12, title: 'Repeat After Me', duration: '3:15', plays: '98M', explicit: false },
      { id: 't13', trackNumber: 13, title: 'After Hours', duration: '6:01', plays: '234M', explicit: false },
      { id: 't14', trackNumber: 14, title: 'Until I Bleed Out', duration: '3:10', plays: '76M', explicit: false },
    ] as SpotifyAlbumTrack[],
  } as SpotifyAlbumDetail,

  /* 2b. Album tracks — flat array extracted from album detail for item templates */
  'spotify.album.tracks': [
    { id: 't1', trackNumber: 1, title: 'Alone Again', duration: '4:10', plays: '234M', explicit: false },
    { id: 't2', trackNumber: 2, title: 'Too Late', duration: '3:59', plays: '187M', explicit: true },
    { id: 't3', trackNumber: 3, title: 'Hardest to Love', duration: '2:59', plays: '412M', explicit: false },
    { id: 't4', trackNumber: 4, title: 'Scared to Live', duration: '3:24', plays: '156M', explicit: false },
    { id: 't5', trackNumber: 5, title: 'Snowchild', duration: '4:07', plays: '198M', explicit: false },
    { id: 't6', trackNumber: 6, title: 'Escape from LA', duration: '5:07', plays: '167M', explicit: true },
    { id: 't7', trackNumber: 7, title: 'Heartless', duration: '3:18', plays: '567M', explicit: true },
    { id: 't8', trackNumber: 8, title: 'Faith', duration: '4:43', plays: '145M', explicit: true },
    { id: 't9', trackNumber: 9, title: 'Blinding Lights', duration: '3:20', plays: '1.2B', explicit: false },
    { id: 't10', trackNumber: 10, title: 'In Your Eyes', duration: '3:57', plays: '389M', explicit: false },
    { id: 't11', trackNumber: 11, title: 'Save Your Tears', duration: '3:35', plays: '892M', explicit: false },
    { id: 't12', trackNumber: 12, title: 'Repeat After Me', duration: '3:15', plays: '98M', explicit: false },
    { id: 't13', trackNumber: 13, title: 'After Hours', duration: '6:01', plays: '234M', explicit: false },
    { id: 't14', trackNumber: 14, title: 'Until I Bleed Out', duration: '3:10', plays: '76M', explicit: false },
  ] as SpotifyAlbumTrack[],

  /* 3. Artist info — artist profile */
  'spotify.artist.info': {
    id: 'ar1',
    name: 'The Weeknd',
    handle: 'The Weeknd',
    monthlyListeners: '108.4M',
    followers: '45.2M',
    verified: true,
    bio:
      'Abel Tesfaye, known professionally as The Weeknd, is a Canadian singer-songwriter and record producer. Known for his versatility and dark lyricism, his music explores escapism, romance, and melancholia. He is one of the most-streamed artists of all time.',
    image: 'https://picsum.photos/seed/weeknd/400/400',
    banner: 'linear-gradient(135deg, #e91429 0%, #1a1a1a 100%)',
    genre: 'R&B / Pop / Synth-wave',
    topCities: ['Toronto, CA', 'Los Angeles, US', 'New York, US', 'London, GB', 'São Paulo, BR'],
  } as SpotifyArtistInfo,

  /* 3b. Artist top cities — flat array for item templates */
  'spotify.artist.topCities': [
    'Toronto, CA',
    'Los Angeles, US',
    'New York, US',
    'London, GB',
    'São Paulo, BR',
  ],

  /* 4. Artist albums — 12+ albums */
  'spotify.artist.albums': [
    { id: 'aa1', title: 'After Hours', year: 2020, type: 'Album', cover: 'https://picsum.photos/seed/afterhours/300/300', trackCount: 14 },
    { id: 'aa2', title: 'Starboy', year: 2016, type: 'Album', cover: 'https://picsum.photos/seed/starboy/300/300', trackCount: 18 },
    { id: 'aa3', title: 'Beauty Behind the Madness', year: 2015, type: 'Album', cover: 'https://picsum.photos/seed/bbtm/300/300', trackCount: 14 },
    { id: 'aa4', title: 'Kiss Land', year: 2013, type: 'Album', cover: 'https://picsum.photos/seed/kissland/300/300', trackCount: 12 },
    { id: 'aa5', title: 'House of Balloons', year: 2011, type: 'Album', cover: 'https://picsum.photos/seed/hob/300/300', trackCount: 9 },
    { id: 'aa6', title: 'Thursday', year: 2011, type: 'Album', cover: 'https://picsum.photos/seed/thursday/300/300', trackCount: 9 },
    { id: 'aa7', title: 'Echoes of Silence', year: 2011, type: 'Album', cover: 'https://picsum.photos/seed/echoes/300/300', trackCount: 9 },
    { id: 'aa8', title: 'My Dear Melancholy,', year: 2018, type: 'EP', cover: 'https://picsum.photos/seed/mdm/300/300', trackCount: 6 },
    { id: 'aa9', title: 'Dawn FM', year: 2022, type: 'Album', cover: 'https://picsum.photos/seed/dawnfm/300/300', trackCount: 16 },
    { id: 'aa10', title: 'Blinding Lights', year: 2019, type: 'Single', cover: 'https://picsum.photos/seed/blinding/300/300', trackCount: 1 },
    { id: 'aa11', title: 'Save Your Tears (Remix)', year: 2021, type: 'Single', cover: 'https://picsum.photos/seed/sytr/300/300', trackCount: 1 },
    { id: 'aa12', title: 'One Right Now', year: 2021, type: 'Single', cover: 'https://picsum.photos/seed/orn/300/300', trackCount: 1 },
    { id: 'aa13', title: 'Die For You (Remix)', year: 2023, type: 'Single', cover: 'https://picsum.photos/seed/dfy/300/300', trackCount: 1 },
  ] as SpotifyArtistAlbum[],

  /* 5. Tracks — 15+ tracks */
  'spotify.tracks': [
    { id: 'tr1', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', plays: '1.2B', cover: 'https://picsum.photos/seed/afterhours/200/200', explicit: false },
    { id: 'tr2', title: 'Save Your Tears', artist: 'The Weeknd', album: 'After Hours', duration: '3:35', plays: '892M', cover: 'https://picsum.photos/seed/afterhours/200/200', explicit: false },
    { id: 'tr3', title: 'Starboy', artist: 'The Weeknd, Daft Punk', album: 'Starboy', duration: '3:50', plays: '745M', cover: 'https://picsum.photos/seed/starboy/200/200', explicit: true },
    { id: 'tr4', title: 'The Hills', artist: 'The Weeknd', album: 'Beauty Behind the Madness', duration: '4:02', plays: '678M', cover: 'https://picsum.photos/seed/bbtm/200/200', explicit: true },
    { id: 'tr5', title: 'Can\'t Feel My Face', artist: 'The Weeknd', album: 'Beauty Behind the Madness', duration: '3:35', plays: '612M', cover: 'https://picsum.photos/seed/bbtm/200/200', explicit: false },
    { id: 'tr6', title: 'Heartless', artist: 'The Weeknd', album: 'After Hours', duration: '3:18', plays: '567M', cover: 'https://picsum.photos/seed/afterhours/200/200', explicit: true },
    { id: 'tr7', title: 'Pray for Me', artist: 'The Weeknd, Kendrick Lamar', album: 'Black Panther', duration: '3:31', plays: '434M', cover: 'https://picsum.photos/seed/pray/200/200', explicit: true },
    { id: 'tr8', title: 'Hardest to Love', artist: 'The Weeknd', album: 'After Hours', duration: '2:59', plays: '412M', cover: 'https://picsum.photos/seed/afterhours/200/200', explicit: false },
    { id: 'tr9', title: 'In Your Eyes', artist: 'The Weeknd', album: 'After Hours', duration: '3:57', plays: '389M', cover: 'https://picsum.photos/seed/afterhours/200/200', explicit: false },
    { id: 'tr10', title: 'I Feel It Coming', artist: 'The Weeknd, Daft Punk', album: 'Starboy', duration: '4:57', plays: '345M', cover: 'https://picsum.photos/seed/starboy/200/200', explicit: false },
    { id: 'tr11', title: 'Call Out My Name', artist: 'The Weeknd', album: 'My Dear Melancholy,', duration: '3:48', plays: '321M', cover: 'https://picsum.photos/seed/mdm/200/200', explicit: true },
    { id: 'tr12', title: 'Die For You', artist: 'The Weeknd', album: 'Starboy', duration: '4:20', plays: '298M', cover: 'https://picsum.photos/seed/starboy/200/200', explicit: false },
    { id: 'tr13', title: 'Take My Breath', artist: 'The Weeknd', album: 'Dawn FM', duration: '5:39', plays: '234M', cover: 'https://picsum.photos/seed/dawnfm/200/200', explicit: false },
    { id: 'tr14', title: 'Sacrifice', artist: 'The Weeknd', album: 'Dawn FM', duration: '3:08', plays: '198M', cover: 'https://picsum.photos/seed/dawnfm/200/200', explicit: false },
    { id: 'tr15', title: 'Out of Time', artist: 'The Weeknd', album: 'Dawn FM', duration: '3:34', plays: '156M', cover: 'https://picsum.photos/seed/dawnfm/200/200', explicit: false },
    { id: 'tr16', title: 'Is There Someone Else', artist: 'The Weeknd', album: 'Dawn FM', duration: '3:00', plays: '134M', cover: 'https://picsum.photos/seed/dawnfm/200/200', explicit: false },
  ] as SpotifyTrack[],

  /* 6. Podcasts — 10+ podcasts */
  'spotify.podcasts': [
    { id: 'po1', title: 'The Joe Rogan Experience', host: 'Joe Rogan', description: 'Long-form conversations with fascinating people.', cover: 'https://picsum.photos/seed/jre/300/300', episodes: 2167, category: 'Comedy', rating: 4.5 },
    { id: 'po2', title: 'Crime Junkie', host: 'Ashley Flowers & Brit Prawat', description: 'True crime stories told weekly.', cover: 'https://picsum.photos/seed/crime/300/300', episodes: 412, category: 'True Crime', rating: 4.8 },
    { id: 'po3', title: 'The Daily', host: 'Michael Barbaro', description: 'This is how the news should sound. Twenty minutes a day, five days a week.', cover: 'https://picsum.photos/seed/daily/300/300', episodes: 1245, category: 'News', rating: 4.6 },
    { id: 'po4', title: 'SmartLess', host: 'Jason Bateman, Sean Hayes, Will Arnett', description: 'Surprise interviews with celebrities.', cover: 'https://picsum.photos/seed/smartless/300/300', episodes: 178, category: 'Comedy', rating: 4.7 },
    { id: 'po5', title: 'Stuff You Should Know', host: 'Josh Clark & Chuck Bryant', description: 'Educational podcast about interesting topics.', cover: 'https://picsum.photos/seed/sysk/300/300', episodes: 1567, category: 'Education', rating: 4.5 },
    { id: 'po6', title: 'Serial', host: 'Sarah Koenig', description: 'Investigative journalism, one story per season.', cover: 'https://picsum.photos/seed/serial/300/300', episodes: 56, category: 'True Crime', rating: 4.9 },
    { id: 'po7', title: 'Pod Save America', host: 'Jon Favreau, Jon Lovett, Tommy Vietor', description: 'Progressive political commentary.', cover: 'https://picsum.photos/seed/psa/300/300', episodes: 489, category: 'Politics', rating: 4.3 },
    { id: 'po8', title: 'Armchair Expert', host: 'Dax Shepard', description: 'Deep dives into the human condition.', cover: 'https://picsum.photos/seed/armchair/300/300', episodes: 423, category: 'Society', rating: 4.6 },
    { id: 'po9', title: 'Conan O\'Brien Needs a Friend', host: 'Conan O\'Brien', description: 'Conan talks to friends old and new.', cover: 'https://picsum.photos/seed/conan/300/300', episodes: 234, category: 'Comedy', rating: 4.8 },
    { id: 'po10', title: 'Lex Fridman Podcast', host: 'Lex Fridman', description: 'Conversations about science, AI, and the human mind.', cover: 'https://picsum.photos/seed/lex/300/300', episodes: 567, category: 'Technology', rating: 4.7 },
  ] as SpotifyPodcast[],

  /* 7. Recent — 10+ recently played */
  'spotify.recent': [
    { id: 'r1', title: 'Blinding Lights', artist: 'The Weeknd', type: 'track', cover: 'https://picsum.photos/seed/afterhours/200/200', playedAt: '2 hours ago', duration: '3:20' },
    { id: 'r2', title: 'After Hours', artist: 'The Weeknd', type: 'album', cover: 'https://picsum.photos/seed/afterhours/200/200', playedAt: '3 hours ago', duration: '47 min' },
    { id: 'r3', title: 'Today\'s Top Hits', artist: 'Spotify', type: 'playlist', cover: 'https://picsum.photos/seed/pl1/200/200', playedAt: '5 hours ago', duration: '2h 45m' },
    { id: 'r4', title: 'Starboy', artist: 'The Weeknd', type: 'album', cover: 'https://picsum.photos/seed/starboy/200/200', playedAt: 'Yesterday', duration: '1h 08m' },
    { id: 'r5', title: 'The Joe Rogan Experience', artist: 'Joe Rogan', type: 'podcast', cover: 'https://picsum.photos/seed/jre/200/200', playedAt: 'Yesterday', duration: '2h 48m' },
    { id: 'r6', title: 'Save Your Tears', artist: 'The Weeknd', type: 'track', cover: 'https://picsum.photos/seed/afterhours/200/200', playedAt: '2 days ago', duration: '3:35' },
    { id: 'r7', title: 'Dawn FM', artist: 'The Weeknd', type: 'album', cover: 'https://picsum.photos/seed/dawnfm/200/200', playedAt: '2 days ago', duration: '51 min' },
    { id: 'r8', title: 'Chill Vibes', artist: 'Spotify', type: 'playlist', cover: 'https://picsum.photos/seed/pl4/200/200', playedAt: '3 days ago', duration: '3h 30m' },
    { id: 'r9', title: 'Call Out My Name', artist: 'The Weeknd', type: 'track', cover: 'https://picsum.photos/seed/mdm/200/200', playedAt: '3 days ago', duration: '3:48' },
    { id: 'r10', title: 'Discover Weekly', artist: 'Spotify', type: 'playlist', cover: 'https://picsum.photos/seed/pl7/200/200', playedAt: '4 days ago', duration: '2h 05m' },
    { id: 'r11', title: 'Take My Breath', artist: 'The Weeknd', type: 'track', cover: 'https://picsum.photos/seed/dawnfm/200/200', playedAt: '5 days ago', duration: '5:39' },
  ] as SpotifyRecentItem[],

  /* 8. Categories — music genres */
  'spotify.categories': [
    { id: 'c1', name: 'Pop', icon: 'Music', color: '#f037a5', playlistCount: 145 },
    { id: 'c2', name: 'Hip-Hop', icon: 'Mic', color: '#bc5900', playlistCount: 234 },
    { id: 'c3', name: 'Rock', icon: 'Guitar', color: '#e8115b', playlistCount: 189 },
    { id: 'c4', name: 'R&B', icon: 'Heart', color: '#dc148c', playlistCount: 98 },
    { id: 'c5', name: 'Electronic', icon: 'Radio', color: '#509bf5', playlistCount: 167 },
    { id: 'c6', name: 'Jazz', icon: 'Saxophone', color: '#8d67ab', playlistCount: 76 },
    { id: 'c7', name: 'Classical', icon: 'Piano', color: '#7d4b32', playlistCount: 54 },
    { id: 'c8', name: 'Country', icon: 'Hat', color: '#e0784d', playlistCount: 89 },
    { id: 'c9', name: 'Latin', icon: 'Flame', color: '#e91429', playlistCount: 132 },
    { id: 'c10', name: 'Indie', icon: 'Star', color: '#1db954', playlistCount: 112 },
  ] as SpotifyCategory[],
};
