import tibiane from '$lib/assets/projects/tibiane.png';
import pointageVDC from '$lib/assets/projects/pointagevdc.png';
import nightbyte from '$lib/assets/projects/nightbyte.png';
import mouhandisson from '$lib/assets/projects/mouhandisson.png';
import zappicon from '$lib/assets/projects/zappicon.png';
import mcloader from '$lib/assets/projects/mcloader.png';
import mywkfl from '$lib/assets/projects/mywkfl.png';
import artistCalendar from '$lib/assets/projects/artist-calendar.png';
import crazyFoot from '$lib/assets/projects/crazyfoot.png';
import novalisAI from '$lib/assets/projects/novalisai.png';

export const projectsData = [
	{
		title: 'PointageVDC',
		subtitle: 'Plateform for employee timetracking and attendance management',
		imageSrc: pointageVDC,
		tags: ['React', 'Tailwind', 'Nest.js', 'PostgreSQL'],
		priority: true,
		gradientFrom: '#0f172a',
		gradientTo: '#6d28d9'
	},
	{
		title: 'Nightbyte Website',
		subtitle: 'Designed and developed a responsive, high-impact landing page for an agency',
		imageSrc: nightbyte,
		tags: ['SaaS', 'Design System', 'Web'],
		href: 'https://www.nightbyte.space/',
		priority: false,
		gradientFrom: '#111827',
		gradientTo: '#2563eb'
	},
	{
		title: 'Real-Time ChatApp',
		subtitle: 'Fullstack real-time messaging app',
		imageSrc: '',
		tags: ['React', 'Tailwind', 'Nest.js', 'WebSockets'],
		href: 'https://github.com/ramzykemmoun/Gloria-chat-nestjs',
		priority: false,
		gradientFrom: '#0b132b',
		gradientTo: '#5bc0be'
	},
	{
		title: 'Mohandisson - JobPlatform',
		subtitle: 'Job/freelance platform for companies and seekers',
		imageSrc: mouhandisson,
		tags: ['React', 'Node.js', 'Freelance', 'E-Payment'],
		href: 'https://mohandissoun.com/',
		priority: false,
		gradientFrom: '#0f172a',
		gradientTo: '#10b981'
	},
	{
		title: 'Tibiane',
		subtitle: 'Encyclopedia of diverse Algerian logos',
		imageSrc: tibiane,
		tags: ['Next.js', 'Tailwind', 'Design', 'Backend'],
		href: 'https://tibiane-dz.vercel.app/',
		priority: false,
		gradientFrom: '#0f172a',
		gradientTo: '#10b981'
	},
	{
		title: 'Zappicon - Icon Library',
		subtitle: 'Smart searchable icon platform for developers/designers',
		imageSrc: zappicon,
		tags: ['Next.js', 'Animation', 'UI/UX'],
		href: 'https://zappicon.com/',
		priority: false,
		gradientFrom: '#1f2937',
		gradientTo: '#8b5cf6'
	},
	{
		title: 'Micro Loader - OpenSource',
		subtitle: 'Collection of beautiful open-source Flutter loaders',
		imageSrc: mcloader,
		tags: ['Flutter', 'UI/UX', 'Open Source'],
		href: 'https://loaders.microclub.info/',
		priority: false,
		gradientFrom: '#0b132b',
		gradientTo: '#10b981'
	},
	{
		title: 'MyWkfl - Workflow Automation Platform',
		subtitle: 'Automates social posts, email, content generation',
		imageSrc: mywkfl,
		tags: ['AI', 'Automation', 'LLMs'],
		href: 'https://github.com/ramzykemmoun/my-wkfl-devfest-batna-2k24',
		priority: false,
		gradientFrom: '#1f2937',
		gradientTo: '#8b5cf6'
	},
	{
		title: 'Geni OCR',
		subtitle: 'System to extract identity information from scanned documents',
		imageSrc: '',
		tags: ['Python', 'Agentic AI', 'OCR', 'Computer Vision'],
		priority: false,
		gradientFrom: '#1f2937',
		gradientTo: '#8b5cf6'
	},
	{
		title: 'Artist Calendar Plateform',
		subtitle: 'Plateform focused oncontent creation and management',
		imageSrc: artistCalendar,
		tags: ['Next.js', 'Shadcn/ui', 'API Integration'],
		priority: false,
		gradientFrom: '#1f2937',
		gradientTo: '#8b5cf6'
	},
	{
		title: 'Crazy Foot',
		subtitle: 'High-performance e-commerce platform for football enthusiasts',
		imageSrc: crazyFoot,
		tags: ['React', 'PayPal API', 'Tailwind CSS'],
		priority: true,
		gradientFrom: '#ef4444',
		gradientTo: '#1e3a8a',
		href: 'https://ecom-website-foot.vercel.app/'
	},
	{
		title: 'Novalis AI',
		subtitle: 'Creative agency specializing in AI-driven development and design',
		imageSrc: novalisAI,
		tags: ['Next.js', 'Framer Motion'],
		priority: true,
		gradientFrom: '#000000',
		gradientTo: '#0ea5e9',
		href: 'https://www.novalisai.com/'
	}
];

export const projectsCode = `import tibiane from '$lib/assets/projects/tibiane.png';
import pointageVDC from '$lib/assets/projects/pointagevdc.png';
import nightbyte from '$lib/assets/projects/nightbyte.png';
import mouhandisson from '$lib/assets/projects/mouhandisson.png';
import zappicon from '$lib/assets/projects/zappicon.png';
import mcloader from '$lib/assets/projects/mcloader.png';
import mywkfl from '$lib/assets/projects/mywkfl.png';
import artistCalendar from '$lib/assets/projects/artist-calendar.png';

export const projectsData = [
	{
		title: 'PointageVDC',
		subtitle: 'Plateform for employee timetracking and attendance management',
		imageSrc: pointageVDC,
		tags: ['React', 'Tailwind', 'Nest.js', 'PostgreSQL'],
		priority: true,
		gradientFrom: '#0f172a',
		gradientTo: '#6d28d9'
	},
	{
		title: 'Nightbyte Website',
		subtitle: 'Designed and developed a responsive, high-impact landing page for an agency',
		imageSrc: nightbyte,
		tags: ['SaaS', 'Design System', 'Web'],
		href: 'https://www.nightbyte.space/',
		priority: false,
		gradientFrom: '#111827',
		gradientTo: '#2563eb'
	},
	{
		title: 'Real-Time ChatApp',
		subtitle: 'Fullstack real-time messaging app',
		imageSrc: '',
		tags: ['React', 'Tailwind', 'Nest.js', 'WebSockets'],
		href: 'https://github.com/ramzykemmoun/Gloria-chat-nestjs',
		priority: false,
		gradientFrom: '#0b132b',
		gradientTo: '#5bc0be'
	},
	{
		title: 'Mohandisson - JobPlatform',
		subtitle: 'Job/freelance platform for companies and seekers',
		imageSrc: mouhandisson,
		tags: ['React', 'Node.js', 'Freelance', 'E-Payment'],
		href: 'https://mohandissoun.com/',
		priority: false,
		gradientFrom: '#0f172a',
		gradientTo: '#10b981'
	},
	{
		title: 'Tibiane',
		subtitle: 'Encyclopedia of diverse Algerian logos',
		imageSrc: tibiane,
		tags: ['Next.js', 'Tailwind', 'Design', 'Backend'],
		href: 'https://tibiane-dz.vercel.app/',
		priority: false,
		gradientFrom: '#0f172a',
		gradientTo: '#10b981'
	},
	{
		title: 'Zappicon - Icon Library',
		subtitle: 'Smart searchable icon platform for developers/designers',
		imageSrc: zappicon,
		tags: ['Next.js', 'Animation', 'UI/UX'],
		href: 'https://zappicon.com/',
		priority: false,
		gradientFrom: '#1f2937',
		gradientTo: '#8b5cf6'
	},
	{
		title: 'Micro Loader - OpenSource',
		subtitle: 'Collection of beautiful open-source Flutter loaders',
		imageSrc: mcloader,
		tags: ['Flutter', 'UI/UX', 'Open Source'],
		href: 'https://loaders.microclub.info/',
		priority: false,
		gradientFrom: '#0b132b',
		gradientTo: '#10b981'
	},
	{
		title: 'MyWkfl - Workflow Automation Platform',
		subtitle: 'Automates social posts, email, content generation',
		imageSrc: mywkfl,
		tags: ['AI', 'Automation', 'LLMs'],
		href: 'https://github.com/ramzykemmoun/my-wkfl-devfest-batna-2k24',
		priority: false,
		gradientFrom: '#1f2937',
		gradientTo: '#8b5cf6'
	},
	{
		title: 'Geni OCR',
		subtitle: 'System to extract identity information from scanned documents',
		imageSrc: '',
		tags: ['Python', 'Agentic AI', 'OCR', 'Computer Vision'],
		priority: false,
		gradientFrom: '#1f2937',
		gradientTo: '#8b5cf6'
	},
	{
		title: 'Artist Calendar Plateform',
		subtitle: 'Plateform focused oncontent creation and management',
		imageSrc: artistCalendar,
		tags: ['Next.js', 'Shadcn/ui', 'API Integration'],
		priority: false,
		gradientFrom: '#1f2937',
		gradientTo: '#8b5cf6'
	}
];`;
