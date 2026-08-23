/* ---------- Twitch data store ----------
 * Comprehensive data keyed by dataSource strings.
 * Page blocks reference these via `dataSource: 'twitch.xxx'`.
 */

export type TwitchChannel = {
  id: string;
  name: string;
  game: string;
  viewers: string;
  avatar: string;
  thumbnail: string;
  title: string;
  language: string;
  live: boolean;
};

export type TwitchChannelInfo = {
  name: string;
  game: string;
  followers: string;
  avatar: string;
  description: string;
  partner: boolean;
};

export type TwitchChatMessage = {
  id: string;
  user: string;
  text: string;
  color: string;
  badges: string[];
};

export type TwitchCategory = {
  id: string;
  name: string;
  viewers: string;
  channels: string;
  image: string;
};

export type TwitchClip = {
  id: string;
  title: string;
  clipper: string;
  views: string;
  created: string;
  thumbnail: string;
};

export type TwitchFollower = {
  id: string;
  name: string;
  avatar: string;
  followedAt: string;
};

export type TwitchStream = {
  id: string;
  streamer: string;
  game: string;
  viewers: string;
  avatar: string;
  thumbnail: string;
  language: string;
};

export type TwitchEmote = {
  id: string;
  name: string;
  tier: string;
};

export const TWITCH_DATA: Record<string, any> = {
  /* 1. Channels */
  'twitch.channels': [
    { id: 'ch1', name: 'xQc', game: 'Just Chatting', viewers: '67.2K', avatar: 'https://i.pravatar.cc/150?img=14', thumbnail: 'https://picsum.photos/seed/twstream1/400/225', title: 'Reacting to internet drama', language: 'English', live: true },
    { id: 'ch2', name: 'shroud', game: 'VALORANT', viewers: '34.8K', avatar: 'https://i.pravatar.cc/150?img=33', thumbnail: 'https://picsum.photos/seed/twstream2/400/225', title: 'Ranked grind to Radiant', language: 'English', live: true },
    { id: 'ch3', name: 'Pokimane', game: 'Just Chatting', viewers: '28.4K', avatar: 'https://i.pravatar.cc/150?img=20', thumbnail: 'https://picsum.photos/seed/twstream3/400/225', title: 'Morning coffee and chat', language: 'English', live: true },
    { id: 'ch4', name: 'summit1g', game: 'Sea of Thieves', viewers: '19.7K', avatar: 'https://i.pravatar.cc/150?img=51', thumbnail: 'https://picsum.photos/seed/twstream4/400/225', title: 'Pirate adventures with the crew', language: 'English', live: true },
    { id: 'ch5', name: 'NICKMERCS', game: 'Call of Duty: Warzone', viewers: '22.1K', avatar: 'https://i.pravatar.cc/150?img=60', thumbnail: 'https://picsum.photos/seed/twstream5/400/225', title: 'Warzone with the MFAM', language: 'English', live: true },
    { id: 'ch6', name: 'Asmongold', game: 'World of Warcraft', viewers: '41.3K', avatar: 'https://i.pravatar.cc/150?img=32', thumbnail: 'https://picsum.photos/seed/twstream6/400/225', title: 'WoW Classic raid night', language: 'English', live: true },
    { id: 'ch7', name: 'Tfue', game: 'Fortnite', viewers: '15.6K', avatar: 'https://i.pravatar.cc/150?img=12', thumbnail: 'https://picsum.photos/seed/twstream7/400/225', title: 'Sweaty Fortnite ranked', language: 'English', live: true },
    { id: 'ch8', name: 'TimTheTatman', game: 'Counter-Strike 2', viewers: '18.9K', avatar: 'https://i.pravatar.cc/150?img=13', thumbnail: 'https://picsum.photos/seed/twstream8/400/225', title: 'CS2 with the boys', language: 'English', live: true },
    { id: 'ch9', name: 'LIRIK', game: 'Grand Theft Auto V', viewers: '24.3K', avatar: 'https://i.pravatar.cc/150?img=53', thumbnail: 'https://picsum.photos/seed/twstream9/400/225', title: 'GTA RP — NoPixel', language: 'English', live: true },
    { id: 'ch10', name: 'HasanAbi', game: 'Just Chatting', viewers: '31.2K', avatar: 'https://i.pravatar.cc/150?img=57', thumbnail: 'https://picsum.photos/seed/twstream10/400/225', title: 'News and politics react', language: 'English', live: true },
    { id: 'ch11', name: 'Sodapoppin', game: 'World of Warcraft', viewers: '12.8K', avatar: 'https://i.pravatar.cc/150?img=68', thumbnail: 'https://picsum.photos/seed/twstream11/400/225', title: 'WoW Classic dungeon runs', language: 'English', live: true },
    { id: 'ch12', name: 'Ludwig', game: 'Minecraft', viewers: '26.7K', avatar: 'https://i.pravatar.cc/150?img=15', thumbnail: 'https://picsum.photos/seed/twstream12/400/225', title: 'Minecraft server event', language: 'English', live: true },
  ] as TwitchChannel[],

  /* 2. Channel info */
  'twitch.channel.info': {
    name: 'xQc',
    game: 'Just Chatting',
    followers: '12.4M',
    avatar: 'https://i.pravatar.cc/150?img=14',
    description: 'Reacting to internet drama and playing games. New videos every day on YouTube.',
    partner: true,
  } as TwitchChannelInfo,

  /* 3. Chat messages */
  'twitch.chat.messages': [
    { id: 'm1', user: 'gamerpro99', text: 'POG this clutch is insane Kappa', color: '#ff4444', badges: ['sub'] },
    { id: 'm2', user: 'stream_lover', text: 'GG no re LUL', color: '#44ff44', badges: [] },
    { id: 'm3', user: 'clip_master', text: 'someone clip that monkaS', color: '#4488ff', badges: ['sub'] },
    { id: 'm4', user: 'night_owl', text: 'first time here, this is awesome PepePls', color: '#ffaa44', badges: [] },
    { id: 'm5', user: 'speedrun_fan', text: 'how many attempts on this level?', color: '#ff44ff', badges: [] },
    { id: 'm6', user: 'mod_dan', text: 'Remember to follow the rules folks! ModSword', color: '#00ff00', badges: ['mod'] },
    { id: 'm7', user: 'lurker_king', text: 'just lurking, great stream KappaPride', color: '#44ddff', badges: [] },
    { id: 'm8', user: 'pixel_warrior', text: 'the graphics on this game are insane', color: '#ff8844', badges: ['sub'] },
    { id: 'm9', user: 'chat_addict', text: 'subbed for 12 months now PogChamp', color: '#aa44ff', badges: ['sub', 'sub12'] },
    { id: 'm10', user: 'vibes_only', text: 'chill stream, love it BibleThump', color: '#44ffaa', badges: [] },
    { id: 'm11', user: 'no_scope_nancy', text: '360 no scope that boss NotLikeThis', color: '#ff44aa', badges: [] },
    { id: 'm12', user: 'rage_quit_ralph', text: 'I could never beat this level Sadge', color: '#aaff44', badges: [] },
    { id: 'm13', user: 'casual_carl', text: 'just got off work, perfect timing', color: '#44aaff', badges: [] },
    { id: 'm14', user: 'discord_mod', text: 'join the Discord for giveaways! PauseChamp', color: '#ffaa44', badges: ['vip'] },
    { id: 'm15', user: 'emote_spammer', text: 'Kappa Kappa Kappa Kappa Kappa', color: '#dd44dd', badges: [] },
    { id: 'm16', user: 'first_time_chat', text: 'hi everyone! new to the channel', color: '#44dddd', badges: [] },
    { id: 'm17', user: 'veteran_viewer', text: 'been here since 10 viewers, proud of you', color: '#ff6644', badges: ['sub', 'sub24'] },
    { id: 'm18', user: 'gifted_sub_greg', text: 'just gifted 50 subs, enjoy everyone! Pog', color: '#44ff66', badges: ['sub'] },
    { id: 'm19', user: 'quiet_quincy', text: 'best stream on Twitch hands down', color: '#6644ff', badges: [] },
    { id: 'm20', user: 'hype_hank', text: 'LETS GOOOOOOOOO PogChamp PogChamp PogChamp', color: '#ffdd44', badges: ['sub'] },
  ] as TwitchChatMessage[],

  /* 4. Categories */
  'twitch.categories': [
    { id: 'cat1', name: 'Just Chatting', viewers: '412K', channels: '2,847', image: 'https://picsum.photos/seed/twcat1/200/280' },
    { id: 'cat2', name: 'League of Legends', viewers: '289K', channels: '1,534', image: 'https://picsum.photos/seed/twcat2/200/280' },
    { id: 'cat3', name: 'VALORANT', viewers: '187K', channels: '1,203', image: 'https://picsum.photos/seed/twcat3/200/280' },
    { id: 'cat4', name: 'Grand Theft Auto V', viewers: '156K', channels: '987', image: 'https://picsum.photos/seed/twcat4/200/280' },
    { id: 'cat5', name: 'Counter-Strike 2', viewers: '134K', channels: '876', image: 'https://picsum.photos/seed/twcat5/200/280' },
    { id: 'cat6', name: 'Minecraft', viewers: '98K', channels: '1,845', image: 'https://picsum.photos/seed/twcat6/200/280' },
    { id: 'cat7', name: 'Dota 2', viewers: '87K', channels: '654', image: 'https://picsum.photos/seed/twcat7/200/280' },
    { id: 'cat8', name: 'World of Warcraft', viewers: '76K', channels: '432', image: 'https://picsum.photos/seed/twcat8/200/280' },
    { id: 'cat9', name: 'Fortnite', viewers: '72K', channels: '1,123', image: 'https://picsum.photos/seed/twcat9/200/280' },
    { id: 'cat10', name: 'Call of Duty: Warzone', viewers: '65K', channels: '567', image: 'https://picsum.photos/seed/twcat10/200/280' },
  ] as TwitchCategory[],

  /* 5. Clips */
  'twitch.clips': [
    { id: 'cl1', title: 'INSANE 1v5 clutch in VALORANT', clipper: 'viewer_x', views: '234K', created: '3 days ago', thumbnail: 'https://picsum.photos/seed/twclip1/300/169' },
    { id: 'cl2', title: 'Reacting to the wildest Reddit thread ever', clipper: 'mod_dan', views: '187K', created: '5 days ago', thumbnail: 'https://picsum.photos/seed/twclip2/300/169' },
    { id: 'cl3', title: 'Speedrun PB after 500 attempts', clipper: 'speedrun_fan', views: '156K', created: '1 week ago', thumbnail: 'https://picsum.photos/seed/twclip3/300/169' },
    { id: 'cl4', title: 'Accidentally donated $1,000 instead of $10', clipper: 'generous_greg', views: '412K', created: '2 days ago', thumbnail: 'https://picsum.photos/seed/twclip4/300/169' },
    { id: 'cl5', title: 'Best GTA RP moment of the year', clipper: 'rp_lover', views: '298K', created: '4 days ago', thumbnail: 'https://picsum.photos/seed/twclip5/300/169' },
    { id: 'cl6', title: 'Rage quit after losing 20 games in a row', clipper: 'clip_master', views: '178K', created: '1 week ago', thumbnail: 'https://picsum.photos/seed/twclip6/300/169' },
    { id: 'cl7', title: 'Chat predicted this exact outcome', clipper: 'oracle_chat', views: '145K', created: '6 days ago', thumbnail: 'https://picsum.photos/seed/twclip7/300/169' },
    { id: 'cl8', title: 'World record speedrun attempt live', clipper: 'wr_hunter', views: '321K', created: '3 days ago', thumbnail: 'https://picsum.photos/seed/twclip8/300/169' },
    { id: 'cl9', title: 'Surprise 50 sub gift from a viewer', clipper: 'emotional_fan', views: '267K', created: '5 days ago', thumbnail: 'https://picsum.photos/seed/twclip9/300/169' },
    { id: 'cl10', title: 'The most chaotic Minecraft moment', clipper: 'block_builder', views: '198K', created: '1 week ago', thumbnail: 'https://picsum.photos/seed/twclip10/300/169' },
  ] as TwitchClip[],

  /* 6. Followers */
  'twitch.followers': [
    { id: 'f1', name: 'gamerpro99', avatar: 'https://i.pravatar.cc/150?img=5', followedAt: '2 minutes ago' },
    { id: 'f2', name: 'stream_lover', avatar: 'https://i.pravatar.cc/150?img=8', followedAt: '5 minutes ago' },
    { id: 'f3', name: 'clip_master', avatar: 'https://i.pravatar.cc/150?img=11', followedAt: '8 minutes ago' },
    { id: 'f4', name: 'night_owl', avatar: 'https://i.pravatar.cc/150?img=16', followedAt: '12 minutes ago' },
    { id: 'f5', name: 'speedrun_fan', avatar: 'https://i.pravatar.cc/150?img=22', followedAt: '18 minutes ago' },
    { id: 'f6', name: 'mod_dan', avatar: 'https://i.pravatar.cc/150?img=28', followedAt: '25 minutes ago' },
    { id: 'f7', name: 'lurker_king', avatar: 'https://i.pravatar.cc/150?img=35', followedAt: '34 minutes ago' },
    { id: 'f8', name: 'pixel_warrior', avatar: 'https://i.pravatar.cc/150?img=40', followedAt: '42 minutes ago' },
    { id: 'f9', name: 'chat_addict', avatar: 'https://i.pravatar.cc/150?img=45', followedAt: '51 minutes ago' },
    { id: 'f10', name: 'vibes_only', avatar: 'https://i.pravatar.cc/150?img=50', followedAt: '1 hour ago' },
  ] as TwitchFollower[],

  /* 7. Streams */
  'twitch.streams': [
    { id: 'st1', streamer: 'xQc', game: 'Just Chatting', viewers: '67.2K', avatar: 'https://i.pravatar.cc/150?img=14', thumbnail: 'https://picsum.photos/seed/twstream1/400/225', language: 'English' },
    { id: 'st2', streamer: 'shroud', game: 'VALORANT', viewers: '34.8K', avatar: 'https://i.pravatar.cc/150?img=33', thumbnail: 'https://picsum.photos/seed/twstream2/400/225', language: 'English' },
    { id: 'st3', streamer: 'Pokimane', game: 'Just Chatting', viewers: '28.4K', avatar: 'https://i.pravatar.cc/150?img=20', thumbnail: 'https://picsum.photos/seed/twstream3/400/225', language: 'English' },
    { id: 'st4', streamer: 'summit1g', game: 'Sea of Thieves', viewers: '19.7K', avatar: 'https://i.pravatar.cc/150?img=51', thumbnail: 'https://picsum.photos/seed/twstream4/400/225', language: 'English' },
    { id: 'st5', streamer: 'NICKMERCS', game: 'Call of Duty: Warzone', viewers: '22.1K', avatar: 'https://i.pravatar.cc/150?img=60', thumbnail: 'https://picsum.photos/seed/twstream5/400/225', language: 'English' },
    { id: 'st6', streamer: 'Asmongold', game: 'World of Warcraft', viewers: '41.3K', avatar: 'https://i.pravatar.cc/150?img=32', thumbnail: 'https://picsum.photos/seed/twstream6/400/225', language: 'English' },
    { id: 'st7', streamer: 'Tfue', game: 'Fortnite', viewers: '15.6K', avatar: 'https://i.pravatar.cc/150?img=12', thumbnail: 'https://picsum.photos/seed/twstream7/400/225', language: 'English' },
    { id: 'st8', streamer: 'TimTheTatman', game: 'Counter-Strike 2', viewers: '18.9K', avatar: 'https://i.pravatar.cc/150?img=13', thumbnail: 'https://picsum.photos/seed/twstream8/400/225', language: 'English' },
    { id: 'st9', streamer: 'LIRIK', game: 'Grand Theft Auto V', viewers: '24.3K', avatar: 'https://i.pravatar.cc/150?img=53', thumbnail: 'https://picsum.photos/seed/twstream9/400/225', language: 'English' },
    { id: 'st10', streamer: 'HasanAbi', game: 'Just Chatting', viewers: '31.2K', avatar: 'https://i.pravatar.cc/150?img=57', thumbnail: 'https://picsum.photos/seed/twstream10/400/225', language: 'English' },
    { id: 'st11', streamer: 'Sodapoppin', game: 'World of Warcraft', viewers: '12.8K', avatar: 'https://i.pravatar.cc/150?img=68', thumbnail: 'https://picsum.photos/seed/twstream11/400/225', language: 'English' },
    { id: 'st12', streamer: 'Ludwig', game: 'Minecraft', viewers: '26.7K', avatar: 'https://i.pravatar.cc/150?img=15', thumbnail: 'https://picsum.photos/seed/twstream12/400/225', language: 'English' },
  ] as TwitchStream[],

  /* 8. Emotes */
  'twitch.emotes': [
    { id: 'e1', name: 'Kappa', tier: 'Global' },
    { id: 'e2', name: 'PogChamp', tier: 'Global' },
    { id: 'e3', name: 'LUL', tier: 'Global' },
    { id: 'e4', name: 'monkaS', tier: 'Global' },
    { id: 'e5', name: 'PepePls', tier: 'Global' },
    { id: 'e6', name: 'Sadge', tier: 'Global' },
    { id: 'e7', name: 'BibleThump', tier: 'Global' },
    { id: 'e8', name: 'NotLikeThis', tier: 'Global' },
    { id: 'e9', name: 'KappaPride', tier: 'Global' },
    { id: 'e10', name: 'PauseChamp', tier: 'Global' },
  ] as TwitchEmote[],
};
