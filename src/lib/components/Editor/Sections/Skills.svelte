<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { Code, Layers, Database, Cpu, Sparkles, Cloud, Lock } from '@lucide/svelte';

	import Icon from '$lib/components/Icon.svelte';

	const skillCategories = [
		{
			id: 'languages',
			title: 'Languages',
			icon: Code,
			gradient: 'from-yellow-600 via-amber-500 to-orange-400',
			glowColor: '#ca8a04',
			bgGradient: 'linear-gradient(135deg, #1c1917 0%, #362f28 50%, #523f33 100%)',
			skills: [
				{ name: 'TypeScript', level: 95, icon: 'ts' },
				{ name: 'JavaScript', level: 92, icon: 'js' },
				{ name: 'Python', level: 88, icon: 'python' },
				{ name: 'Java', level: 60, icon: 'java' },
				{ name: 'Dart', level: 60, icon: 'dart' },
				{ name: 'C++', level: 60, icon: 'cpp' }
			]
		},
		{
			id: 'frameworks',
			title: 'Frameworks',
			icon: Layers,
			gradient: 'from-blue-800 via-indigo-600 to-cyan-500',
			glowColor: '#1d4ed8',
			bgGradient: 'linear-gradient(135deg, #0c1a2e 0%, #1e3a8a 50%, #172554 100%)',
			skills: [
				{ name: 'React.js', level: 95, icon: 'react' },
				{ name: 'Next.js', level: 95, icon: 'nextjs' },
				{ name: 'Svelte/SvelteKit', level: 70, icon: 'svelte' },
				{ name: 'Node.js/Nest.js', level: 90, icon: 'nodejs' },
				{ name: 'FastAPI', level: 75, icon: 'fastapi' },
				{ name: 'LangChain', level: 75, icon: 'langchain' }
			]
		},
		{
			id: 'databases',
			title: 'Databases',
			icon: Database,
			// NOUVEAU: Émeraude / Jad
			gradient: 'from-green-700 via-emerald-600 to-teal-500',
			glowColor: '#059669', // Vert Émeraude
			bgGradient: 'linear-gradient(135deg, #052e16 0%, #065f46 50%, #047857 100%)',
			skills: [
				{ name: 'PostgreSQL', level: 90, icon: 'psql' },
				{ name: 'MongoDB', level: 85, icon: 'mongo' },
				{ name: 'Redis', level: 88, icon: 'redis' },
				{ name: 'MySQL', level: 80, icon: 'mysql' },
				{ name: 'Prisma', level: 92, icon: 'prisma' },
				{ name: 'Supabase', level: 85, icon: 'supabase' }
			]
		},
		{
			id: 'ai',
			title: 'AI & Machine Learning',
			icon: Cpu,
			gradient: 'from-fuchsia-700 via-rose-600 to-red-600',
			glowColor: '#be123c',
			bgGradient: 'linear-gradient(135deg, #2d0014 0%, #4c0519 50%, #6d0a27 100%)',
			skills: [
				{ name: 'Machine Learning', level: 78, icon: 'ml' },
				{ name: 'Data Science', level: 78, icon: 'data-science' },
				{ name: 'TensorFlow', level: 78, icon: 'tensorflow' },
				{ name: 'LLMs', level: 90, icon: 'llms' },
				{
					name: 'Agentic AI',
					level: 75,
					icon: 'agentic-ai'
				},
				{
					name: 'AI Automation',
					level: 75,
					icon: 'ai-automation'
				}
			]
		},
		{
			id: 'fields',
			title: 'Expertise Fields',
			icon: Sparkles,
			// NOUVEAU: Argent / Acier
			gradient: 'from-gray-500 via-zinc-400 to-slate-500',
			glowColor: '#a1a1aa', // Gris Ardoise
			bgGradient: 'linear-gradient(135deg, #27272a 0%, #3f3f46 50%, #52525b 100%)',
			skills: [
				{ name: 'Full-Stack Dev', level: 95, icon: 'html' },
				{ name: 'API Design', level: 92, icon: '🔌' },
				{
					name: 'Mobile Dev',
					level: 95,
					icon: '📱'
				},
				{
					name: 'Teaching',
					level: 95,
					icon: '🏫'
				},
				{ name: 'Machine Learning', level: 75, icon: '🤖' }
			]
		}
	];

	let mounted = $state(false);
	let activeCategory = $state(0);
	let container: HTMLElement;

	onMount(() => {
		if (!browser) return;

		setTimeout(() => {
			mounted = true;
		}, 100);
	});

	const handleCategoryHover = (index: number) => {
		activeCategory = index;
	};

	const handleCategoryLeave = () => {
		// Optionnel : ne rien faire ou revenir à l'index initial
	};
</script>

<div class="skills-container" bind:this={container}>
	<div class="bg-effects">
		<div class="mesh-gradient"></div>
		<div class="noise-overlay"></div>
	</div>

	<header class="skills-header" class:mounted>
		<h1 class="header-title">
			<span class="title-line">My</span>
			<span class="title-highlight">Skills</span>
		</h1>
		<p class="header-desc">Hover over categories to explore my expertise</p>
	</header>

	<nav class="category-nav" class:mounted>
		{#each skillCategories as cat, i}
			<button
				class="category-btn"
				class:active={activeCategory === i}
				style="--glow: {cat.glowColor}; --delay: {i * 100}ms;"
				onmouseenter={() => handleCategoryHover(i)}
				onmouseleave={handleCategoryLeave}
				onclick={() => (activeCategory = i)}
			>
				<div class="btn-bg bg-linear-to-r {cat.gradient}"></div>
				<svelte:component this={cat.icon} class="w-5 h-5" />
				<span>{cat.title}</span>
			</button>
		{/each}
	</nav>

	<div class="skills-display" class:mounted>
		{#each skillCategories as cat, catIndex}
			<div
				class="category-panel"
				class:active={activeCategory === catIndex}
				style="--bg: {cat.bgGradient}; --glow: {cat.glowColor};"
			>
				<div class="panel-header">
					<div class="panel-icon bg-linear-to-br {cat.gradient}">
						<svelte:component this={cat.icon} class="w-8 h-8" />
					</div>
					<div class="panel-title">
						<h2>{cat.title}</h2>
						<p>{cat.skills.length} skills</p>
					</div>
				</div>

				<div class="skills-grid">
					{#each cat.skills as skill, skillIndex}
						<div class="skill-card" style="--delay: {skillIndex * 80}ms; --glow: {cat.glowColor};">
							<div class="skill-icon">
								<Icon icon={skill.icon} size={36} />
							</div>
							<div class="skill-info">
								<h3>{skill.name}</h3>
								<div class="skill-bar">
									<div
										class="skill-progress bg-linear-to-r {cat.gradient}"
										style="--level: {skill.level}%"
									></div>
								</div>
								<span class="skill-level">{skill.level}%</span>
							</div>
							<div class="skill-glow"></div>
						</div>
					{/each}
				</div>

				<div class="floating-particles">
					{#each Array(8) as _, i}
						<div class="particle" style="--i: {i}; --glow: {cat.glowColor};"></div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	/* Main Container - NOUVEAU FOND NOIR PROFOND/ROYAL */
	.skills-container {
		position: relative;
		min-height: 100%;
		padding: 2rem;
		/* Fond noir avec un dégradé subtil de bleu et d'or */
		background: linear-gradient(135deg, #0a0a0a 0%, #15151e 50%, #0a0a0a 100%);
		overflow-y: auto;
		overflow-x: hidden;
	}

	/* Background Effects */
	.bg-effects {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 1;
	}

	/* Mesh Gradient - NOUVEAU: Or, Saphir, Émeraude */
	.mesh-gradient {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(ellipse at 20% 20%, rgba(202, 138, 4, 0.15) 0%, transparent 50%),
			radial-gradient(ellipse at 80% 80%, rgba(29, 78, 216, 0.15) 0%, transparent 50%),
			radial-gradient(ellipse at 50% 50%, rgba(5, 150, 105, 0.1) 0%, transparent 60%);
	}

	.noise-overlay {
		position: absolute;
		inset: 0;
		opacity: 0.05;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
	}

	/* Header */
	.skills-header {
		position: relative;
		z-index: 10;
		text-align: center;
		margin-bottom: 2rem;
		opacity: 0;
		transform: translateY(-30px);
		transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.skills-header.mounted {
		opacity: 1;
		transform: translateY(0);
	}

	.header-title {
		font-size: 3rem;
		font-weight: 900;
		margin-bottom: 0.5rem;
		line-height: 1.1;
	}

	.title-line {
		display: block;
		color: rgba(255, 255, 255, 0.7);
		font-size: 1.5rem;
		font-weight: 300;
	}

	/* Title Highlight - NOUVEAU: Dégradé Or Royal */
	.title-highlight {
		background: linear-gradient(135deg, #fff 0%, #ca8a04 40%, #facc15 70%, #d4d4d4 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: gradientShift 5s ease infinite;
		background-size: 200% 200%;
	}

	@keyframes gradientShift {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}

	.header-desc {
		color: rgba(255, 255, 255, 0.5);
		font-size: 0.95rem;
	}

	/* Category Navigation */
	.category-nav {
		position: relative;
		z-index: 10;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem;
		margin-bottom: 2rem;
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.6s ease 0.2s;
	}

	.category-nav.mounted {
		opacity: 1;
		transform: translateY(0);
	}

	.category-btn {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.25rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		color: rgba(255, 255, 255, 0.7);
		font-size: 0.9rem;
		font-weight: 500;
		overflow: hidden;
		transition: all 0.3s ease;
		animation: fadeIn 0.5s ease forwards;
		animation-delay: var(--delay);
		opacity: 0;
		cursor: pointer;
	}

	@keyframes fadeIn {
		to {
			opacity: 1;
		}
	}

	.category-btn .btn-bg {
		position: absolute;
		inset: 0;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.category-btn:hover,
	.category-btn.active {
		border-color: var(--glow);
		color: white;
		/* Ombre lumineuse, même sur fond sombre */
		box-shadow: 0 0 30px color-mix(in srgb, var(--glow) 40%, transparent);
	}

	.category-btn:hover .btn-bg,
	.category-btn.active .btn-bg {
		opacity: 0.2;
	}

	/* Skills Display */
	.skills-display {
		position: relative;
		z-index: 10;
		max-width: 1000px;
		margin: 0 auto;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.6s ease 0.4s;
	}

	.skills-display.mounted {
		opacity: 1;
		transform: translateY(0);
	}

	.category-panel {
		display: none;
		background: var(--bg);
		border: 1px solid rgba(255, 255, 255, 0.15); /* Plus de contraste */
		border-radius: 24px;
		padding: 2rem;
		position: relative;
		overflow: hidden;
		animation: panelReveal 0.5s ease;
	}

	.category-panel.active {
		display: block;
	}

	@keyframes panelReveal {
		from {
			opacity: 0;
			transform: scale(0.95) translateY(20px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	.category-panel::before {
		content: '';
		position: absolute;
		inset: 0;
		/* Motif d'héritage subtil */
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
		pointer-events: none;
	}

	/* Panel Header */
	.panel-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.panel-icon {
		width: 60px;
		height: 60px;
		border-radius: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		box-shadow: 0 10px 40px color-mix(in srgb, var(--glow) 40%, transparent);
	}

	.panel-title h2 {
		font-size: 1.5rem;
		font-weight: 700;
		color: white;
		margin-bottom: 0.25rem;
	}

	.panel-title p {
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.9rem;
	}

	/* Skills Grid */
	.skills-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
	}

	.skill-card {
		position: relative;
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		background: rgba(0, 0, 0, 0.4);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 16px;
		overflow: hidden;
		opacity: 0;
		transform: translateX(-20px);
		animation: skillReveal 0.5s ease forwards;
		animation-delay: var(--delay);
		transition: all 0.3s ease;
		cursor: default;
	}

	@keyframes skillReveal {
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.skill-card:hover {
		background: rgba(0, 0, 0, 0.6);
		border-color: var(--glow);
		transform: translateY(-5px) scale(1.02);
		box-shadow:
			0 20px 40px rgba(0, 0, 0, 0.4),
			0 0 30px color-mix(in srgb, var(--glow) 30%, transparent);
	}

	.skill-icon {
		font-size: 2rem;
		filter: drop-shadow(0 0 10px var(--glow));
	}

	.skill-info {
		flex: 1;
	}

	.skill-info h3 {
		font-size: 1rem;
		font-weight: 600;
		color: white;
		margin-bottom: 0.5rem;
	}

	.skill-bar {
		height: 6px;
		background: rgba(255, 255, 255, 0.15);
		border-radius: 3px;
		overflow: hidden;
		margin-bottom: 0.25rem;
	}

	.skill-progress {
		height: 100%;
		width: 0;
		border-radius: 3px;
		animation: progressFill 1s ease forwards;
		animation-delay: calc(var(--delay) + 0.3s);
		box-shadow: 0 0 10px var(--glow);
	}

	@keyframes progressFill {
		to {
			width: var(--level);
		}
	}

	.skill-level {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.7);
		font-weight: 500;
	}

	.skill-glow {
		position: absolute;
		top: 50%;
		right: -50px;
		width: 100px;
		height: 100px;
		background: radial-gradient(circle, var(--glow) 0%, transparent 70%);
		opacity: 0;
		transform: translateY(-50%);
		transition: opacity 0.3s ease;
	}

	.skill-card:hover .skill-glow {
		opacity: 0.3;
	}

	/* Floating Particles */
	.floating-particles {
		position: absolute;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.particle {
		position: absolute;
		width: 8px;
		height: 8px;
		background: var(--glow);
		border-radius: 50%;
		opacity: 0.4;
		animation: particleFloat 10s ease-in-out infinite;
		animation-delay: calc(var(--i) * 1.25s);
	}

	/* Positions des particules (gardées de l'original) */
	.particle:nth-child(1) {
		top: 10%;
		left: 10%;
	}
	.particle:nth-child(2) {
		top: 20%;
		right: 15%;
	}
	.particle:nth-child(3) {
		top: 40%;
		left: 5%;
	}
	.particle:nth-child(4) {
		bottom: 30%;
		right: 10%;
	}
	.particle:nth-child(5) {
		top: 60%;
		left: 20%;
	}
	.particle:nth-child(6) {
		bottom: 15%;
		left: 30%;
	}
	.particle:nth-child(7) {
		top: 80%;
		right: 25%;
	}
	.particle:nth-child(8) {
		bottom: 40%;
		right: 35%;
	}

	@keyframes particleFloat {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
			opacity: 0.4;
		}
		25% {
			transform: translate(20px, -30px) scale(1.2);
			opacity: 0.6;
		}
		50% {
			transform: translate(-10px, 20px) scale(0.8);
			opacity: 0.3;
		}
		75% {
			transform: translate(15px, 10px) scale(1.1);
			opacity: 0.5;
		}
	}

	/* Stats Section (Non utilisé dans ce composant mais gardé pour complétude) */
	.stats-section {
		position: relative;
		z-index: 10;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		max-width: 800px;
		margin: 3rem auto 0;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.6s ease 0.6s;
	}

	.stats-section.mounted {
		opacity: 1;
		transform: translateY(0);
	}

	.stat-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 1.5rem 1rem;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 16px;
		color: rgba(255, 255, 255, 0.7);
		transition: all 0.3s ease;
		cursor: default;
	}

	.stat-card:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(202, 138, 4, 0.5); /* Bordure Or au survol */
		transform: translateY(-5px);
		box-shadow:
			0 20px 40px rgba(0, 0, 0, 0.3),
			0 0 30px rgba(202, 138, 4, 0.2);
	}

	.stat-value {
		font-size: 1.75rem;
		font-weight: 800;
		/* NOUVEAU: Or */
		background: linear-gradient(135deg, #fff, #ca8a04);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.stat-label {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.5);
		text-align: center;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.skills-container {
			padding: 1rem;
		}

		.header-title {
			font-size: 2rem;
		}

		.title-line {
			font-size: 1.2rem;
		}

		.category-nav {
			gap: 0.5rem;
		}

		.category-btn {
			padding: 0.5rem 1rem;
			font-size: 0.8rem;
		}

		.skills-grid {
			grid-template-columns: 1fr;
		}

		.stats-section {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
