export type Project = {
  number: string;
  title: string;
  description: string;
  kind: 'wallpaper' | 'classmates' | 'converter' | 'focus' | 'cloud';
  links: { label: string; href: string; external?: boolean }[];
};

export const projects: Project[] = [
  {
    number: '01',
    title: 'Material UI 3 Wallpaper Studio',
    description: 'Procedural geometric wallpapers on-device via Skia & Compose. No internet needed.',
    kind: 'wallpaper',
    links: [
      { label: 'GitHub', href: 'https://github.com/phoenixdevellopment75-web/Material-ui-3-wallpaper-studio-' },
      { label: 'Get APK (v2.0.0)', href: 'https://github.com/phoenixdevellopment75-web/Material-ui-3-wallpaper-studio-/releases' },
    ],
  },
  {
    number: '02',
    title: 'Classmates Hub',
    description: 'Alumni memory vault and class directory built for my 10th-grade batch.',
    kind: 'classmates',
    links: [{ label: 'Explore Repo', href: 'https://github.com/phoenixdevellopment75-web/Class10thForever-' }],
  },
  {
    number: '03',
    title: 'In-Browser File Converter',
    description: '100% private media converter running locally via WebAssembly and FFmpeg.wasm.',
    kind: 'converter',
    links: [{ label: 'Launch Tool', href: 'https://phoenixdevellopment75-web.github.io/' }],
  },
  {
    number: '04',
    title: 'Focus Clock',
    description: 'Minimal Pomodoro timer with pleasant synthesized Web Audio frequencies.',
    kind: 'focus',
    links: [{ label: 'View Repo', href: 'https://github.com/phoenixdevellopment75-web/My-favourite-clock-timer' }],
  },
  {
    number: '05',
    title: 'Google Cloud Credentials',
    description: '7 verified hands-on challenge badges across BigQuery, Terraform, and AI agents.',
    kind: 'cloud',
    links: [{ label: 'Inspect Badges', href: '#badges' }],
  },
];

export type BadgeCategory = 'AI & Agents' | 'Cloud' | 'DevSecOps' | 'Foundational';
export type Badge = {
  title: string;
  date: string;
  category: BadgeCategory;
  badgeId: string;
  description: string;
};

export const skillsProfile = 'https://www.skills.google/public_profiles/da7a6a2a-bd50-4907-8a68-49815013f616';

export const badges: Badge[] = [
  {
    title: 'Orchestrate Multi-Agent Workflows with Gemini Enterprise',
    date: 'Aug 1, 2026', category: 'AI & Agents', badgeId: '26180279',
    description: 'Multi-agent workflows across connected data and business actions.',
  },
  {
    title: 'Build Your First Agent with Agent Development Kit (ADK)',
    date: 'Aug 1, 2026', category: 'AI & Agents', badgeId: '26179263',
    description: 'Building and running agents with Google’s Agent Development Kit.',
  },
  {
    title: 'Create Your First Gemini Enterprise Application',
    date: 'Aug 1, 2026', category: 'AI & Agents', badgeId: '26179109',
    description: 'Connect data sources for search, analysis, and research agents.',
  },
  {
    title: 'Build a Data Warehouse with BigQuery',
    date: 'Jul 31, 2026', category: 'Cloud', badgeId: '26166929',
    description: 'Joins, unions, partitioned tables, and structured JSON data.',
  },
  {
    title: 'Build Infrastructure with Terraform on Google Cloud',
    date: 'Jul 24, 2026', category: 'Cloud', badgeId: '25876380',
    description: 'Provision cloud resources with reusable infrastructure as code.',
  },
  {
    title: 'Arcade Base Camp July 2026',
    date: 'Jul 24, 2026', category: 'Foundational', badgeId: '25876270',
    description: 'Hands-on labs building foundational Google Cloud skills.',
  },
  {
    title: 'Secure Software Delivery',
    date: 'Jul 23, 2026', category: 'DevSecOps', badgeId: '25844774',
    description: 'Security practices for delivery on GKE and Cloud Run.',
  },
];

export const socialLinks = [
  { name: 'GitHub', handle: '@phoenixdevellopment75-web', href: 'https://github.com/phoenixdevellopment75-web', kind: 'github' as const, note: 'Apps, experiments, and open-source work.' },
  { name: 'Instagram', handle: '@phoenix_veena', href: 'https://www.instagram.com/phoenix_veena/', kind: 'instagram' as const, note: 'Veena practice and life between projects.' },
  { name: 'Telegram', handle: '@PhoenixEditz75', href: 'https://t.me/PhoenixEditz75', kind: 'telegram' as const, note: 'A quick line about apps or tech.' },
];
