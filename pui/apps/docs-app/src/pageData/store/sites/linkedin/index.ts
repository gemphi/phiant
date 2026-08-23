/* ---------- LinkedIn data store ----------
 * Comprehensive data keyed by dataSource strings.
 * Page blocks reference these via `dataSource: 'linkedin.xxx'`.
 */

export type LinkedinFeedPost = {
  id: string;
  author: string;
  avatar: string;
  title: string;
  company: string;
  time: string;
  text: string;
  image?: string;
  likes: string;
  comments: string;
  reposts: string;
};

export type LinkedinProfileInfo = {
  name: string;
  headline: string;
  location: string;
  connections: string;
  avatar: string;
  cover: string;
  about: string;
};

export type LinkedinJob = {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  salary: string;
  type: string;
  applicants: string;
  posted: string;
  easyApply: boolean;
  promoted: boolean;
};

export type LinkedinJobDetail = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
};

export type LinkedinConnection = {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  mutual: number;
};

export type LinkedinNotification = {
  id: string;
  type: string;
  text: string;
  time: string;
};

export type LinkedinCompany = {
  id: string;
  name: string;
  industry: string;
  size: string;
  followers: string;
  logo: string;
};

export type LinkedinSkill = {
  id: string;
  name: string;
  endorsements: number;
};

export const LINKEDIN_DATA: Record<string, any> = {
  /* 1. Feed posts */
  'linkedin.feed.posts': [
    { id: 'p1', author: 'James Whitfield', avatar: 'https://i.pravatar.cc/150?img=12', title: 'Senior Engineering Manager', company: 'Stripe', time: '2h', text: 'After 8 months of building, we just shipped our new payments orchestration layer. It processes 4M transactions per minute with 99.99% uptime. The key lesson: invest in observability before you think you need it.', image: 'https://picsum.photos/seed/lipost1/600/360', likes: '1,247', comments: '89', reposts: '34' },
    { id: 'p2', author: 'Sofia Martinez', avatar: 'https://i.pravatar.cc/150?img=25', title: 'Product Designer', company: 'Figma', time: '5h', text: 'Hot take: most design systems fail because they optimize for consistency instead of velocity. The best component libraries are the ones that let teams ship 3x faster, not the ones with the prettiest documentation site.', likes: '892', comments: '214', reposts: '12' },
    { id: 'p3', author: 'David Chen', avatar: 'https://i.pravatar.cc/150?img=33', title: 'Staff Software Engineer', company: 'Airbnb', time: '1d', text: 'We migrated 200+ microservices from Webpack to Vite last quarter. Build times dropped from 12 minutes to 45 seconds. Here is the playbook we used — including the 3 things that almost killed the migration.', image: 'https://picsum.photos/seed/lipost3/600/360', likes: '3,451', comments: '412', reposts: '187' },
    { id: 'p4', author: 'Priya Nair', avatar: 'https://i.pravatar.cc/150?img=51', title: 'Engineering Director', company: 'Atlassian', time: '1d', text: 'Promoting your strongest individual contributors to manager without training is the most expensive mistake in tech. We started a 12-week EM bootcamp last year and retention on my teams went from 78% to 94%.', likes: '2,108', comments: '156', reposts: '98' },
    { id: 'p5', author: 'Marcus Reed', avatar: 'https://i.pravatar.cc/150?img=60', title: 'VP Engineering', company: 'Datadog', time: '2d', text: 'Hiring is the highest-leverage activity for engineering leaders. I spend 30% of my week on it. If you are not interviewing at least 3 candidates a week, you are bottlenecking your team.', likes: '1,567', comments: '234', reposts: '67' },
    { id: 'p6', author: 'Grace Liu', avatar: 'https://i.pravatar.cc/150?img=32', title: 'Head of Product', company: 'Notion', time: '2d', text: 'The best product decisions I have made came from talking to 5 users a week. Not surveys, not analytics — actual conversations. The signal-to-noise ratio is unmatched.', likes: '987', comments: '78', reposts: '45' },
    { id: 'p7', author: 'Ravi Kumar', avatar: 'https://i.pravatar.cc/150?img=15', title: 'CTO', company: 'Ramp', time: '3d', text: 'We open-sourced our internal feature flag system today. It handles 2B evaluations per day with sub-millisecond latency. Link in comments — would love feedback from the community.', image: 'https://picsum.photos/seed/lipost7/600/360', likes: '4,210', comments: '312', reposts: '256' },
    { id: 'p8', author: 'Emma Stone', avatar: 'https://i.pravatar.cc/150?img=20', title: 'Senior Data Scientist', company: 'Spotify', time: '3d', text: 'Our recommendation model just crossed 40% of total listening time. The biggest unlock was not a better algorithm — it was treating freshness as a first-class signal alongside relevance.', likes: '1,834', comments: '145', reposts: '89' },
    { id: 'p9', author: 'Tom Hardy', avatar: 'https://i.pravatar.cc/150?img=13', title: 'Director of Engineering', company: 'Shopify', time: '4d', text: 'On-call should not be a punishment rotation. We restructured ours to be opt-in with a 25% comp bump and incident response coaching. Volunteer rate went from 40% to 95% in one quarter.', likes: '2,901', comments: '198', reposts: '134' },
    { id: 'p10', author: 'Aisha Khan', avatar: 'https://i.pravatar.cc/150?img=44', title: 'Principal Product Manager', company: 'Microsoft', time: '4d', text: 'PRDs are dead. We replaced them with one-page problem statements and a Figma prototype. Shipping velocity doubled and alignment got better because everyone reads one page; nobody reads twelve.', likes: '1,456', comments: '267', reposts: '112' },
    { id: 'p11', author: 'Liam O\'Brien', avatar: 'https://i.pravatar.cc/150?img=53', title: 'Staff Engineer', company: 'Snowflake', time: '5d', text: 'Spent 3 weeks optimizing our query planner cache. Result: 23% reduction in average query latency across 50K enterprise customers. Sometimes the highest-impact work is the least glamorous.', likes: '1,123', comments: '89', reposts: '56' },
    { id: 'p12', author: 'Yuki Tanaka', avatar: 'https://i.pravatar.cc/150?img=23', title: 'Engineering Manager', company: 'Mercari', time: '5d', text: 'We made code review optional for docs-only changes and mandatory for everything else. Review cycle time dropped 40% and morale went up because PRs are no longer blocked by formatting debates on README files.', likes: '745', comments: '67', reposts: '34' },
    { id: 'p13', author: 'Chris Evans', avatar: 'https://i.pravatar.cc/150?img=57', title: 'Senior SRE', company: 'Cloudflare', time: '6d', text: 'Our incident review process: blameless, 24-hour SLA to publish a summary, and every action item has an owner and due date. We went from 12 Sev1s per quarter to 3 in one year.', image: 'https://picsum.photos/seed/lipost13/600/360', likes: '2,345', comments: '178', reposts: '145' },
    { id: 'p14', author: 'Olivia Brown', avatar: 'https://i.pravatar.cc/150?img=36', title: 'VP Product', company: 'Canva', time: '1w', text: 'The myth of the 10x engineer is toxic. The real 10x is a team that trusts each other, shares context freely, and has psychological safety to fail fast. Invest in culture, not heroes.', likes: '5,678', comments: '432', reposts: '321' },
    { id: 'p15', author: 'Diego Santos', avatar: 'https://i.pravatar.cc/150?img=68', title: 'Principal Engineer', company: 'Twilio', time: '1w', text: 'API versioning is not a technical problem — it is a communication problem. We publish a deprecation calendar 12 months out, send weekly reminders to affected teams, and still 5% of traffic breaks. Plan for the 5%.', likes: '1,234', comments: '98', reposts: '67' },
  ] as LinkedinFeedPost[],

  /* 2. Profile info */
  'linkedin.profile.info': {
    name: 'Sarah Chen',
    headline: 'Principal Software Engineer at Google Cloud',
    location: 'San Francisco Bay Area',
    connections: '500+',
    avatar: 'https://i.pravatar.cc/150?img=47',
    cover: 'https://picsum.photos/seed/licover/800/240',
    about: 'Principal engineer with 12 years building distributed systems at scale. I lead the team responsible for Google Cloud Spanner\'s query optimization engine. Passionate about open source, mentoring, and making complex systems understandable. Previously at Stripe and Airbnb.',
  } as LinkedinProfileInfo,

  /* 2b. Profile experience — flat array for item templates */
  'linkedin.profile.experience': [
    { id: 'e1', role: 'Principal Software Engineer', company: 'Google Cloud', type: 'Full-time', period: 'Jan 2021 - Present · 4 yrs', logo: 'https://picsum.photos/seed/google/80/80', description: 'Leading query optimization for Cloud Spanner. Reduced p99 latency by 40% across 2B daily queries.' },
    { id: 'e2', role: 'Staff Software Engineer', company: 'Stripe', type: 'Full-time', period: 'Mar 2017 - Dec 2020 · 3 yrs 9 mos', logo: 'https://picsum.photos/seed/stripe/80/80', description: 'Built the payments orchestration layer processing 4M transactions per minute.' },
    { id: 'e3', role: 'Senior Software Engineer', company: 'Airbnb', type: 'Full-time', period: 'Jun 2014 - Feb 2017 · 2 yrs 9 mos', logo: 'https://picsum.photos/seed/airbnb/80/80', description: 'Designed the search ranking infrastructure powering 100M+ daily searches.' },
  ],

  /* 3. Jobs */
  'linkedin.jobs': [
    { id: 'j1', title: 'Staff Software Engineer, Payments Platform', company: 'Stripe', logo: 'https://picsum.photos/seed/stripejob/80/80', location: 'San Francisco, CA (Remote)', salary: '$220K - $310K', type: 'Full-time', applicants: '1,200', posted: '3 days ago', easyApply: true, promoted: true },
    { id: 'j2', title: 'Senior Frontend Engineer, Design Tools', company: 'Figma', logo: 'https://picsum.photos/seed/figmajob/80/80', location: 'San Francisco, CA (Hybrid)', salary: '$180K - $240K', type: 'Full-time', applicants: '847', posted: '1 week ago', easyApply: true, promoted: false },
    { id: 'j3', title: 'Principal Engineer, Observability Platform', company: 'Datadog', logo: 'https://picsum.photos/seed/datadogjob/80/80', location: 'New York, NY (Remote)', salary: '$260K - $340K', type: 'Full-time', applicants: '534', posted: '2 days ago', easyApply: true, promoted: false },
    { id: 'j4', title: 'Senior Backend Engineer, Search Infrastructure', company: 'Airbnb', logo: 'https://picsum.photos/seed/airbnbjob/80/80', location: 'San Francisco, CA (Remote)', salary: '$190K - $250K', type: 'Full-time', applicants: '1,100', posted: '5 days ago', easyApply: true, promoted: false },
    { id: 'j5', title: 'Engineering Manager, Developer Platform', company: 'Atlassian', logo: 'https://picsum.photos/seed/atlassianjob/80/80', location: 'San Francisco, CA (Hybrid)', salary: '$210K - $280K', type: 'Full-time', applicants: '623', posted: '1 week ago', easyApply: false, promoted: false },
    { id: 'j6', title: 'Senior Product Designer, Core Experience', company: 'Notion', logo: 'https://picsum.photos/seed/notionjob/80/80', location: 'San Francisco, CA (Remote)', salary: '$160K - $220K', type: 'Full-time', applicants: '1,800', posted: '4 days ago', easyApply: true, promoted: true },
    { id: 'j7', title: 'Staff Site Reliability Engineer', company: 'Cloudflare', logo: 'https://picsum.photos/seed/cloudflarejob/80/80', location: 'Remote', salary: '$200K - $270K', type: 'Full-time', applicants: '412', posted: '6 days ago', easyApply: true, promoted: false },
    { id: 'j8', title: 'Principal Data Scientist, Recommendations', company: 'Spotify', logo: 'https://picsum.photos/seed/spotifyjob/80/80', location: 'New York, NY (Hybrid)', salary: '$230K - $300K', type: 'Full-time', applicants: '987', posted: '1 week ago', easyApply: false, promoted: false },
    { id: 'j9', title: 'Senior Software Engineer, Checkout', company: 'Shopify', logo: 'https://picsum.photos/seed/shopifyjob/80/80', location: 'Remote (US)', salary: '$170K - $230K', type: 'Full-time', applicants: '1,456', posted: '3 days ago', easyApply: true, promoted: false },
    { id: 'j10', title: 'Engineering Director, Platform Infrastructure', company: 'Ramp', logo: 'https://picsum.photos/seed/rampjob/80/80', location: 'New York, NY (On-site)', salary: '$280K - $360K', type: 'Full-time', applicants: '289', posted: '2 weeks ago', easyApply: false, promoted: false },
    { id: 'j11', title: 'Senior Full Stack Engineer, Billing', company: 'Twilio', logo: 'https://picsum.photos/seed/twiliojob/80/80', location: 'Remote', salary: '$165K - $215K', type: 'Full-time', applicants: '734', posted: '1 week ago', easyApply: true, promoted: false },
    { id: 'j12', title: 'Staff Engineer, Query Optimization', company: 'Snowflake', logo: 'https://picsum.photos/seed/snowflakejob/80/80', location: 'San Mateo, CA (Hybrid)', salary: '$240K - $320K', type: 'Full-time', applicants: '456', posted: '5 days ago', easyApply: true, promoted: false },
    { id: 'j13', title: 'Senior Product Manager, Developer Experience', company: 'Microsoft', logo: 'https://picsum.photos/seed/microsoftjob/80/80', location: 'Redmond, WA (Hybrid)', salary: '$180K - $240K', type: 'Full-time', applicants: '1,023', posted: '4 days ago', easyApply: false, promoted: true },
    { id: 'j14', title: 'Principal Engineer, Distributed Storage', company: 'Canva', logo: 'https://picsum.photos/seed/canvajob/80/80', location: 'Remote (Australia-friendly)', salary: '$200K - $260K', type: 'Full-time', applicants: '567', posted: '1 week ago', easyApply: true, promoted: false },
    { id: 'j15', title: 'Senior DevOps Engineer, CI/CD Platform', company: 'Mercari', logo: 'https://picsum.photos/seed/mercarijob/80/80', location: 'Tokyo, Japan (Hybrid)', salary: '$130K - $180K', type: 'Full-time', applicants: '234', posted: '2 weeks ago', easyApply: false, promoted: false },
  ] as LinkedinJob[],

  /* 4. Job detail */
  'linkedin.job.detail': {
    id: 'j1',
    title: 'Staff Software Engineer, Payments Platform',
    company: 'Stripe',
    location: 'San Francisco, CA · Remote',
    salary: '$220K - $310K',
    type: 'Full-time',
    description: 'We are looking for a Staff Software Engineer to lead the next generation of our payments orchestration platform. You will own the architecture for routing, retrying, and reconciling billions of dollars in transactions across 47 payment processors.',
    responsibilities: [
      'Design and build the core payments routing engine in Go',
      'Lead a team of 6 engineers across two time zones',
      'Partner with finance and risk to ensure 99.99% uptime',
      'Drive the migration from monolith to event-driven services',
    ],
    requirements: [
      '8+ years building production backend systems',
      'Deep experience with distributed systems and idempotency',
      'Strong communication and technical leadership skills',
      'Experience with payments or financial infrastructure is a plus',
    ],
  } as LinkedinJobDetail,

  /* 4b. Job responsibilities/requirements — flat arrays for item templates */
  'linkedin.job.responsibilities': [
    'Design and build the core payments routing engine in Go',
    'Lead a team of 6 engineers across two time zones',
    'Partner with finance and risk to ensure 99.99% uptime',
    'Drive the migration from monolith to event-driven services',
  ],
  'linkedin.job.requirements': [
    '8+ years building production backend systems',
    'Deep experience with distributed systems and idempotency',
    'Strong communication and technical leadership skills',
    'Experience with payments or financial infrastructure is a plus',
  ],

  /* 5. Connections */
  'linkedin.connections': [
    { id: 'c1', name: 'Priya Nair', title: 'Engineering Director', company: 'Atlassian', avatar: 'https://i.pravatar.cc/150?img=51', mutual: 12 },
    { id: 'c2', name: 'Marcus Reed', title: 'VP Engineering', company: 'Datadog', avatar: 'https://i.pravatar.cc/150?img=60', mutual: 8 },
    { id: 'c3', name: 'Grace Liu', title: 'Head of Product', company: 'Notion', avatar: 'https://i.pravatar.cc/150?img=32', mutual: 15 },
    { id: 'c4', name: 'Ravi Kumar', title: 'CTO', company: 'Ramp', avatar: 'https://i.pravatar.cc/150?img=15', mutual: 6 },
    { id: 'c5', name: 'Emma Stone', title: 'Senior Data Scientist', company: 'Spotify', avatar: 'https://i.pravatar.cc/150?img=20', mutual: 9 },
    { id: 'c6', name: 'Tom Hardy', title: 'Director of Engineering', company: 'Shopify', avatar: 'https://i.pravatar.cc/150?img=13', mutual: 11 },
    { id: 'c7', name: 'Aisha Khan', title: 'Principal Product Manager', company: 'Microsoft', avatar: 'https://i.pravatar.cc/150?img=44', mutual: 7 },
    { id: 'c8', name: 'Liam O\'Brien', title: 'Staff Engineer', company: 'Snowflake', avatar: 'https://i.pravatar.cc/150?img=53', mutual: 14 },
    { id: 'c9', name: 'Yuki Tanaka', title: 'Engineering Manager', company: 'Mercari', avatar: 'https://i.pravatar.cc/150?img=23', mutual: 5 },
    { id: 'c10', name: 'Chris Evans', title: 'Senior SRE', company: 'Cloudflare', avatar: 'https://i.pravatar.cc/150?img=57', mutual: 10 },
    { id: 'c11', name: 'Olivia Brown', title: 'VP Product', company: 'Canva', avatar: 'https://i.pravatar.cc/150?img=36', mutual: 13 },
    { id: 'c12', name: 'Diego Santos', title: 'Principal Engineer', company: 'Twilio', avatar: 'https://i.pravatar.cc/150?img=68', mutual: 8 },
  ] as LinkedinConnection[],

  /* 6. Notifications */
  'linkedin.notifications': [
    { id: 'n1', type: 'profile_view', text: 'Marcus Reed (VP Engineering at Datadog) viewed your profile', time: '2h ago' },
    { id: 'n2', type: 'post_like', text: 'James Whitfield and 1,246 others liked your post about query optimization', time: '5h ago' },
    { id: 'n3', type: 'connection', text: 'Priya Nair wants to connect with you', time: '8h ago' },
    { id: 'n4', type: 'job_alert', text: 'New job: Staff Engineer at Snowflake matches your preferences', time: '12h ago' },
    { id: 'n5', type: 'comment', text: 'Sofia Martinez commented on your post: "This resonates so much"', time: '1d ago' },
    { id: 'n6', type: 'endorsement', text: 'David Chen endorsed you for Distributed Systems', time: '1d ago' },
    { id: 'n7', type: 'post_like', text: 'Grace Liu and 892 others liked your post about design systems', time: '2d ago' },
    { id: 'n8', type: 'profile_view', text: 'A recruiter from Stripe viewed your profile', time: '2d ago' },
    { id: 'n9', type: 'birthday', text: 'Wish Ravi Kumar a happy birthday today', time: '3d ago' },
    { id: 'n10', type: 'work_anniversary', text: 'Emma Stone is celebrating 5 years at Spotify', time: '4d ago' },
  ] as LinkedinNotification[],

  /* 7. Companies */
  'linkedin.companies': [
    { id: 'co1', name: 'Stripe', industry: 'Financial Services', size: '10,001+ employees', followers: '2.4M', logo: 'https://picsum.photos/seed/stripe/80/80' },
    { id: 'co2', name: 'Figma', industry: 'Software Development', size: '1,001-5,000 employees', followers: '1.1M', logo: 'https://picsum.photos/seed/figma/80/80' },
    { id: 'co3', name: 'Datadog', industry: 'IT Services', size: '5,001-10,000 employees', followers: '890K', logo: 'https://picsum.photos/seed/datadog/80/80' },
    { id: 'co4', name: 'Airbnb', industry: 'Hospitality', size: '10,001+ employees', followers: '3.2M', logo: 'https://picsum.photos/seed/airbnb/80/80' },
    { id: 'co5', name: 'Atlassian', industry: 'Software Development', size: '10,001+ employees', followers: '1.8M', logo: 'https://picsum.photos/seed/atlassian/80/80' },
    { id: 'co6', name: 'Notion', industry: 'Software Development', size: '501-1,000 employees', followers: '1.5M', logo: 'https://picsum.photos/seed/notion/80/80' },
    { id: 'co7', name: 'Cloudflare', industry: 'IT Services', size: '5,001-10,000 employees', followers: '1.2M', logo: 'https://picsum.photos/seed/cloudflare/80/80' },
    { id: 'co8', name: 'Spotify', industry: 'Music', size: '10,001+ employees', followers: '4.1M', logo: 'https://picsum.photos/seed/spotify/80/80' },
    { id: 'co9', name: 'Shopify', industry: 'E-commerce', size: '10,001+ employees', followers: '2.0M', logo: 'https://picsum.photos/seed/shopify/80/80' },
    { id: 'co10', name: 'Ramp', industry: 'Financial Services', size: '501-1,000 employees', followers: '340K', logo: 'https://picsum.photos/seed/ramp/80/80' },
  ] as LinkedinCompany[],

  /* 8. Skills */
  'linkedin.skills': [
    { id: 's1', name: 'Distributed Systems', endorsements: 342 },
    { id: 's2', name: 'Go', endorsements: 287 },
    { id: 's3', name: 'TypeScript', endorsements: 256 },
    { id: 's4', name: 'Kubernetes', endorsements: 198 },
    { id: 's5', name: 'Spanner', endorsements: 145 },
    { id: 's6', name: 'gRPC', endorsements: 167 },
    { id: 's7', name: 'System Design', endorsements: 312 },
    { id: 's8', name: 'PostgreSQL', endorsements: 234 },
    { id: 's9', name: 'Redis', endorsements: 178 },
    { id: 's10', name: 'Technical Leadership', endorsements: 201 },
  ] as LinkedinSkill[],
};

