<script lang="ts">
	import './layout.css';
	import icon from '$lib/assets/logos/rk-icon.png';
	import og from '$lib/assets/logos/og.png';

	let { children } = $props();

	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();
</script>

<svelte:head>
	<link rel="icon" href={icon} />

	<title>Ramzy KEMMOUN - Full-Stack Developer Portfolio</title>
	<meta name="title" content="Ramzy KEMMOUN - Full-Stack Developer Portfolio" />
	<meta
		name="description"
		content="Full-Stack Developer passionate about building modern web applications with TypeScript, Svelte, React, Node.js, Python and AI. Check out my projects and get in touch!"
	/>
	<meta
		name="keywords"
		content="Ramzy KEMMOUN, Full-Stack Developer, Web Developer, TypeScript, Svelte, React, Node.js, Python, AI, Portfolio, Algeria"
	/>
	<meta name="author" content="Ramzy KEMMOUN" />
	<meta name="robots" content="index, follow" />
	<meta name="language" content="English" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://ramzykemmoun.vercel.app/" />
	<meta property="og:title" content="Ramzy KEMMOUN - Full-Stack Developer Portfolio" />
	<meta
		property="og:description"
		content="Full-Stack Developer passionate about building modern web applications with TypeScript, Svelte, React, Node.js, Python and AI. Check out my projects!"
	/>
	<meta property="og:image" content={og} />
	<meta property="og:image:alt" content="Ramzy KEMMOUN - Full-Stack Developer" />
	<meta property="og:site_name" content="Ramzy KEMMOUN Portfolio" />
	<meta property="og:locale" content="en_US" />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://ramzykemmoun.vercel.app/" />
	<meta property="twitter:title" content="Ramzy KEMMOUN - Full-Stack Developer Portfolio" />
	<meta
		property="twitter:description"
		content="Full-Stack Developer passionate about building modern web applications with TypeScript, Svelte, React, Node.js, Python and AI."
	/>
	<meta property="twitter:image" content={og} />

	<meta name="theme-color" content="#007BFF" />
	<link rel="canonical" href="https://ramzykemmoun.vercel.app/" />
</svelte:head>

{@render children()}
