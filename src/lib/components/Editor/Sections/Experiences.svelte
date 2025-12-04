<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import {
		Swords,
		Shield,
		Flag,
		Medal,
		MapPin,
		Calendar,
		ChevronRight,
		Target,
		Crown
	} from '@lucide/svelte';

	interface Experience {
		id: number;
		title: string;
		company: string;
		location: string;
		period: string;
		duration: string;
		description: string;
		achievements: string[];
		rank: 'general' | 'commander' | 'captain' | 'lieutenant';
		technologies: string[];
	}

	const experiences: Experience[] = [
		{
			id: 1,
			title: 'Lead Software Architect',
			company: 'TechCorp International',
			location: 'Paris, France',
			period: '2023 - Present',
			duration: '2 years',
			description:
				'Leading a team of 12 engineers in developing next-generation cloud infrastructure and microservices architecture.',
			achievements: [
				'Reduced system latency by 60%',
				'Architected multi-region deployment',
				'Led migration to Kubernetes'
			],
			rank: 'general',
			technologies: ['Go', 'Kubernetes', 'AWS', 'Terraform']
		},
		{
			id: 2,
			title: 'Senior Full-Stack Developer',
			company: 'Innovation Labs',
			location: 'Lyon, France',
			period: '2021 - 2023',
			duration: '2 years',
			description:
				'Developed high-performance web applications and led the frontend architecture modernization initiative.',
			achievements: [
				'Built real-time analytics dashboard',
				'Implemented CI/CD pipeline',
				'Mentored 5 junior developers'
			],
			rank: 'commander',
			technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker']
		},
		{
			id: 3,
			title: 'Full-Stack Developer',
			company: 'StartupVenture',
			location: 'Marseille, France',
			period: '2019 - 2021',
			duration: '2 years',
			description:
				'Core member of the founding engineering team, building the product from ground zero to 100K+ users.',
			achievements: [
				'Developed MVP in 3 months',
				'Scaled to 100K users',
				'Integrated payment systems'
			],
			rank: 'captain',
			technologies: ['Vue.js', 'Python', 'MongoDB', 'Redis']
		},
		{
			id: 4,
			title: 'Junior Developer',
			company: 'Digital Agency',
			location: 'Toulouse, France',
			period: '2018 - 2019',
			duration: '1 year',
			description:
				'Started my professional journey building client websites and learning enterprise development practices.',
			achievements: [
				'Delivered 15+ client projects',
				'Learned agile methodologies',
				'First open source contribution'
			],
			rank: 'lieutenant',
			technologies: ['JavaScript', 'PHP', 'MySQL', 'WordPress']
		}
	];

	let mounted = $state(false);
	let activeExp = $state<number | null>(null);

	onMount(() => {
		if (!browser) return;
		setTimeout(() => (mounted = true), 100);
	});

	const getRankIcon = (rank: string) => {
		switch (rank) {
			case 'general':
				return Crown;
			case 'commander':
				return Medal;
			case 'captain':
				return Shield;
			default:
				return Flag;
		}
	};

	const getRankTitle = (rank: string) => {
		switch (rank) {
			case 'general':
				return '大将 (Taishō)';
			case 'commander':
				return '中将 (Chūjō)';
			case 'captain':
				return '大尉 (Taii)';
			default:
				return '少尉 (Shōi)';
		}
	};
</script>

<div class="experiences-container">
	<!-- Japanese Pattern Background -->
	<div class="bg-pattern"></div>

	<!-- Fog Effect -->
	<div class="fog fog-1"></div>
	<div class="fog fog-2"></div>

	<!-- Ink Splatter Decorations -->
	<div class="ink-splatter splatter-1"></div>
	<div class="ink-splatter splatter-2"></div>

	<!-- Header -->
	<header class="header" class:mounted>
		<div class="header-emblem">
			<Swords class="w-8 h-8" />
		</div>
		<div class="header-kanji">戦歴</div>
		<h1 class="header-title">Battle Records</h1>
		<p class="header-subtitle">Experience • 経験</p>
		<div class="header-divider">
			<span></span>
			<Target class="w-4 h-4" />
			<span></span>
		</div>
	</header>

	<!-- Timeline -->
	<div class="timeline" class:mounted>
		<div class="timeline-line">
			<div class="timeline-glow"></div>
		</div>

		{#each experiences as exp, index}
			<article
				class="experience-card"
				class:active={activeExp === exp.id}
				class:left={index % 2 === 0}
				class:right={index % 2 !== 0}
				style="--delay: {index * 200}ms"
				onmouseenter={() => (activeExp = exp.id)}
				onmouseleave={() => (activeExp = null)}
			>
				<!-- Timeline Node -->
				<div class="timeline-node">
					<div class="node-ring"></div>
					<div class="node-core">
						<svelte:component this={getRankIcon(exp.rank)} class="w-5 h-5" />
					</div>
					<div class="node-pulse"></div>
				</div>

				<!-- Card -->
				<div class="card">
					<!-- Japanese Border Frame -->
					<div class="card-frame">
						<span class="frame-corner tl"></span>
						<span class="frame-corner tr"></span>
						<span class="frame-corner bl"></span>
						<span class="frame-corner br"></span>
					</div>

					<!-- Rank Badge -->
					<div class="rank-badge">
						<svelte:component this={getRankIcon(exp.rank)} class="w-4 h-4" />
						<span class="rank-kanji">{getRankTitle(exp.rank)}</span>
					</div>

					<!-- Card Header -->
					<div class="card-header">
						<h3 class="card-title">{exp.title}</h3>
						<div class="card-company">
							<Shield class="w-4 h-4" />
							<span>{exp.company}</span>
						</div>
					</div>

					<!-- Meta Info -->
					<div class="card-meta">
						<div class="meta-item">
							<MapPin class="w-4 h-4" />
							<span>{exp.location}</span>
						</div>
						<div class="meta-item">
							<Calendar class="w-4 h-4" />
							<span>{exp.period}</span>
						</div>
						<div class="meta-duration">{exp.duration}</div>
					</div>

					<!-- Description -->
					<p class="card-desc">{exp.description}</p>

					<!-- Achievements -->
					<div class="achievements">
						<div class="achievements-header">
							<Medal class="w-4 h-4" />
							<span>戦果 (Achievements)</span>
						</div>
						<ul class="achievements-list">
							{#each exp.achievements as achievement}
								<li>
									<ChevronRight class="w-4 h-4" />
									<span>{achievement}</span>
								</li>
							{/each}
						</ul>
					</div>

					<!-- Technologies -->
					<div class="tech-stack">
						{#each exp.technologies as tech}
							<span class="tech-tag">{tech}</span>
						{/each}
					</div>

					<!-- Decorative Seal -->
					<div class="card-seal">印</div>
				</div>
			</article>
		{/each}
	</div>

	<!-- Footer Banner -->
	<footer class="footer-banner" class:mounted>
		<div class="banner-content">
			<span class="banner-kanji">武士道</span>
			<span class="banner-text">The way of the warrior</span>
		</div>
	</footer>
</div>

<style>
	.experiences-container {
		position: relative;
		min-height: 100%;
		background: linear-gradient(180deg, #0a1628 0%, #0f2744 50%, #0a1628 100%);
		overflow-y: auto;
		overflow-x: hidden;
		padding: 3rem 2rem;
	}

	/* Japanese Pattern Background */
	.bg-pattern {
		position: fixed;
		inset: 0;
		opacity: 0.03;
		background-image:
			repeating-linear-gradient(
				0deg,
				transparent,
				transparent 40px,
				rgba(100, 180, 255, 0.1) 40px,
				rgba(100, 180, 255, 0.1) 41px
			),
			repeating-linear-gradient(
				90deg,
				transparent,
				transparent 40px,
				rgba(100, 180, 255, 0.1) 40px,
				rgba(100, 180, 255, 0.1) 41px
			);
		pointer-events: none;
	}

	/* Fog Effects */
	.fog {
		position: fixed;
		width: 100%;
		height: 30%;
		pointer-events: none;
		opacity: 0.4;
	}

	.fog-1 {
		top: 0;
		background: linear-gradient(180deg, rgba(10, 22, 40, 0.9) 0%, transparent 100%);
	}

	.fog-2 {
		bottom: 0;
		background: linear-gradient(0deg, rgba(10, 22, 40, 0.9) 0%, transparent 100%);
	}

	/* Ink Splatters */
	.ink-splatter {
		position: fixed;
		width: 300px;
		height: 300px;
		border-radius: 50%;
		filter: blur(80px);
		pointer-events: none;
		opacity: 0.15;
	}

	.splatter-1 {
		top: 10%;
		left: -100px;
		background: radial-gradient(circle, #1e40af 0%, transparent 70%);
	}

	.splatter-2 {
		bottom: 20%;
		right: -100px;
		background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
	}

	/* Header */
	.header {
		position: relative;
		z-index: 10;
		text-align: center;
		margin-bottom: 4rem;
		opacity: 0;
		transform: translateY(-30px);
		transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.header.mounted {
		opacity: 1;
		transform: translateY(0);
	}

	.header-emblem {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 70px;
		height: 70px;
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(30, 64, 175, 0.3));
		border: 2px solid rgba(59, 130, 246, 0.4);
		border-radius: 50%;
		color: #60a5fa;
		margin-bottom: 1rem;
		box-shadow:
			0 0 30px rgba(59, 130, 246, 0.3),
			inset 0 0 20px rgba(59, 130, 246, 0.1);
	}

	.header-kanji {
		font-size: 2.5rem;
		color: rgba(59, 130, 246, 0.3);
		font-weight: 300;
		letter-spacing: 0.5em;
		margin-bottom: 0.5rem;
	}

	.header-title {
		font-size: 2.5rem;
		font-weight: 900;
		color: white;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		text-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
	}

	.header-subtitle {
		color: rgba(255, 255, 255, 0.5);
		font-size: 0.9rem;
		letter-spacing: 0.3em;
		margin-top: 0.5rem;
	}

	.header-divider {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-top: 1.5rem;
		color: rgba(59, 130, 246, 0.5);
	}

	.header-divider span {
		width: 60px;
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent);
	}

	/* Timeline */
	.timeline {
		position: relative;
		z-index: 10;
		max-width: 1200px;
		margin: 0 auto;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s ease 0.2s;
	}

	.timeline.mounted {
		opacity: 1;
		transform: translateY(0);
	}

	.timeline-line {
		position: absolute;
		left: 50%;
		top: 0;
		bottom: 0;
		width: 4px;
		background: linear-gradient(
			180deg,
			transparent 0%,
			rgba(59, 130, 246, 0.3) 10%,
			rgba(59, 130, 246, 0.5) 50%,
			rgba(59, 130, 246, 0.3) 90%,
			transparent 100%
		);
		transform: translateX(-50%);
	}

	.timeline-glow {
		position: absolute;
		inset: 0;
		background: inherit;
		filter: blur(10px);
	}

	/* Experience Card */
	.experience-card {
		position: relative;
		display: flex;
		align-items: flex-start;
		margin-bottom: 3rem;
		opacity: 0;
		animation: cardReveal 0.6s ease forwards;
		animation-delay: var(--delay);
	}

	@keyframes cardReveal {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.experience-card.left {
		flex-direction: row;
		padding-right: calc(50% + 40px);
	}

	.experience-card.right {
		flex-direction: row-reverse;
		padding-left: calc(50% + 40px);
	}

	/* Timeline Node */
	.timeline-node {
		position: absolute;
		left: 50%;
		top: 30px;
		transform: translateX(-50%);
		z-index: 20;
	}

	.node-ring {
		position: absolute;
		inset: -8px;
		border: 2px solid rgba(59, 130, 246, 0.3);
		border-radius: 50%;
		animation: ringRotate 10s linear infinite;
	}

	@keyframes ringRotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.node-core {
		width: 44px;
		height: 44px;
		background: linear-gradient(135deg, #1e40af, #3b82f6);
		border: 3px solid #60a5fa;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		box-shadow:
			0 0 20px rgba(59, 130, 246, 0.5),
			inset 0 0 10px rgba(255, 255, 255, 0.1);
	}

	.node-pulse {
		position: absolute;
		inset: -15px;
		border-radius: 50%;
		background: rgba(59, 130, 246, 0.2);
		animation: nodePulse 2s ease-in-out infinite;
	}

	@keyframes nodePulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.5;
		}
		50% {
			transform: scale(1.3);
			opacity: 0;
		}
	}

	/* Card */
	.card {
		position: relative;
		flex: 1;
		max-width: 480px;
		background: linear-gradient(135deg, rgba(15, 39, 68, 0.95), rgba(10, 22, 40, 0.98));
		border: 1px solid rgba(59, 130, 246, 0.2);
		border-radius: 4px;
		padding: 1.75rem;
		transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.experience-card.active .card {
		border-color: rgba(59, 130, 246, 0.5);
		transform: scale(1.02);
		box-shadow:
			0 25px 50px rgba(0, 0, 0, 0.4),
			0 0 40px rgba(59, 130, 246, 0.2);
	}

	/* Japanese Frame */
	.card-frame {
		position: absolute;
		inset: 8px;
		pointer-events: none;
	}

	.frame-corner {
		position: absolute;
		width: 20px;
		height: 20px;
		border-color: rgba(59, 130, 246, 0.3);
		border-style: solid;
	}

	.frame-corner.tl {
		top: 0;
		left: 0;
		border-width: 2px 0 0 2px;
	}
	.frame-corner.tr {
		top: 0;
		right: 0;
		border-width: 2px 2px 0 0;
	}
	.frame-corner.bl {
		bottom: 0;
		left: 0;
		border-width: 0 0 2px 2px;
	}
	.frame-corner.br {
		bottom: 0;
		right: 0;
		border-width: 0 2px 2px 0;
	}

	/* Rank Badge */
	.rank-badge {
		position: absolute;
		top: -12px;
		right: 20px;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0.8rem;
		background: linear-gradient(135deg, #1e40af, #1e3a8a);
		border: 1px solid rgba(59, 130, 246, 0.5);
		border-radius: 4px;
		color: #93c5fd;
		font-size: 0.75rem;
	}

	.rank-kanji {
		font-weight: 500;
		letter-spacing: 0.05em;
	}

	/* Card Header */
	.card-header {
		margin-bottom: 1rem;
	}

	.card-title {
		font-size: 1.3rem;
		font-weight: 700;
		color: white;
		margin-bottom: 0.5rem;
	}

	.card-company {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: #60a5fa;
		font-size: 0.95rem;
		font-weight: 500;
	}

	/* Meta */
	.card-meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid rgba(59, 130, 246, 0.15);
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.85rem;
	}

	.meta-duration {
		margin-left: auto;
		padding: 0.25rem 0.75rem;
		background: rgba(59, 130, 246, 0.15);
		border-radius: 100px;
		color: #93c5fd;
		font-size: 0.8rem;
		font-weight: 500;
	}

	/* Description */
	.card-desc {
		color: rgba(255, 255, 255, 0.7);
		font-size: 0.9rem;
		line-height: 1.6;
		margin-bottom: 1rem;
	}

	/* Achievements */
	.achievements {
		margin-bottom: 1rem;
	}

	.achievements-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: #fbbf24;
		font-size: 0.85rem;
		font-weight: 600;
		margin-bottom: 0.75rem;
	}

	.achievements-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.achievements-list li {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
		color: rgba(255, 255, 255, 0.7);
		font-size: 0.85rem;
		margin-bottom: 0.5rem;
	}

	.achievements-list li :global(svg) {
		color: #60a5fa;
		flex-shrink: 0;
		margin-top: 2px;
	}

	/* Technologies */
	.tech-stack {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tech-tag {
		padding: 0.3rem 0.7rem;
		background: rgba(59, 130, 246, 0.1);
		border: 1px solid rgba(59, 130, 246, 0.25);
		border-radius: 4px;
		color: #93c5fd;
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.02em;
	}

	/* Decorative Seal */
	.card-seal {
		position: absolute;
		bottom: 15px;
		right: 15px;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid rgba(239, 68, 68, 0.4);
		border-radius: 4px;
		color: rgba(239, 68, 68, 0.5);
		font-size: 1.2rem;
		font-weight: 700;
		transform: rotate(-15deg);
		opacity: 0.6;
	}

	/* Footer */
	.footer-banner {
		position: relative;
		z-index: 10;
		text-align: center;
		margin-top: 4rem;
		margin-bottom: 4rem;
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.6s ease 0.6s;
	}

	.footer-banner.mounted {
		opacity: 1;
		transform: translateY(0);
	}

	.banner-content {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		padding: 1.5rem 3rem;
		background: linear-gradient(135deg, rgba(30, 64, 175, 0.2), rgba(15, 39, 68, 0.3));
		border: 1px solid rgba(59, 130, 246, 0.2);
		border-radius: 4px;
	}

	.banner-kanji {
		font-size: 2rem;
		color: rgba(59, 130, 246, 0.4);
		letter-spacing: 0.3em;
		margin-bottom: 0.5rem;
	}

	.banner-text {
		color: rgba(255, 255, 255, 0.5);
		font-size: 0.9rem;
		font-style: italic;
		letter-spacing: 0.2em;
	}

	/* Responsive */
	@media (max-width: 900px) {
		.timeline-line {
			left: 30px;
		}

		.experience-card.left,
		.experience-card.right {
			flex-direction: row;
			padding-left: 80px;
			padding-right: 0;
		}

		.timeline-node {
			left: 30px;
		}

		.card {
			max-width: 100%;
		}
	}

	@media (max-width: 600px) {
		.experiences-container {
			padding: 2rem 1rem;
		}

		.header-title {
			font-size: 1.8rem;
			letter-spacing: 0.1em;
		}

		.header-kanji {
			font-size: 1.8rem;
		}

		.card {
			padding: 1.25rem;
		}

		.card-title {
			font-size: 1.1rem;
		}
	}
</style>
