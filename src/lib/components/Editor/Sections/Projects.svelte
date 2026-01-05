<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { ExternalLink, ChevronLeft, ChevronRight, Layers, Zap } from '@lucide/svelte';

	import { projectsData } from '$lib/data/sections/projects';

	let mounted = $state(false);
	let currentIndex = $state(0);
	let hoveredCard = $state<number | null>(null);
	let isAutoPlaying = $state(true);
	let carouselRef: HTMLElement;
	let mouseX = $state(0);
	let mouseY = $state(0);

	const visibleCards = 3;

	onMount(() => {
		if (!browser) return;
		setTimeout(() => (mounted = true), 100);

		// Auto-play carousel
		const autoPlayInterval = setInterval(() => {
			if (isAutoPlaying && hoveredCard === null) {
				nextSlide();
			}
		}, 4000);

		// Track mouse for parallax
		const handleMouseMove = (e: MouseEvent) => {
			mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
			mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			clearInterval(autoPlayInterval);
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});

	const nextSlide = () => {
		currentIndex = (currentIndex + 1) % projectsData.length;
	};

	const prevSlide = () => {
		currentIndex = (currentIndex - 1 + projectsData.length) % projectsData.length;
	};

	const getCardStyle = (index: number) => {
		const diff = index - currentIndex;
		const normalizedDiff = (diff + projectsData.length) % projectsData.length;
		const adjustedDiff =
			normalizedDiff > projectsData.length / 2
				? normalizedDiff - projectsData.length
				: normalizedDiff;

		const isHovered = hoveredCard === index;
		const baseScale = isHovered ? 1.08 : 1;
		const scale = baseScale - Math.abs(adjustedDiff) * 0.12;
		const translateX = adjustedDiff * 320;
		const translateZ = -Math.abs(adjustedDiff) * 100;
		const rotateY = adjustedDiff * -8;
		const opacity = Math.abs(adjustedDiff) > 2 ? 0 : 1 - Math.abs(adjustedDiff) * 0.25;

		return `
            transform: translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale});
            opacity: ${opacity};
            z-index: ${100 - Math.abs(adjustedDiff)};
        `;
	};
</script>

<div class="projectsData-container relative">
	<div class="bg-effects">
		<div
			class="grid-floor"
			style="transform: perspective(500px) rotateX(60deg) translateY({mouseY}px);"
		></div>
		<div class="radial-glow"></div>
		<div class="particles">
			{#each Array(30) as _, i}
				<div
					class="particle"
					style="--i: {i}; --x: {Math.random() * 100}; --y: {Math.random() *
						100}; --size: {Math.random() * 3 + 1}; --duration: {Math.random() * 20 + 10}s;"
				></div>
			{/each}
		</div>
		<div class="scan-line"></div>
	</div>

	<header class="header" class:mounted>
		<div class="header-badge">
			<Layers class="w-4 h-4" />
			<span>Featured Work</span>
		</div>
		<h1 class="header-title">
			<span class="title-accent">My</span> Projects
		</h1>
		<p class="header-desc">Hover to explore • Click for details</p>
	</header>

	<div class="carousel-wrapper" class:mounted>
		<div class="carousel" bind:this={carouselRef}>
			{#each projectsData as project, index}
				<div
					class="project-card"
					class:active={currentIndex === index}
					class:hovered={hoveredCard === index}
					style={getCardStyle(index)}
					onmouseenter={() => {
						hoveredCard = index;
						isAutoPlaying = false;
					}}
					onmouseleave={() => {
						hoveredCard = null;
						isAutoPlaying = true;
					}}
					onclick={() => (currentIndex = index)}
					role="button"
					tabindex="0"
				>
					<div class="card-glow"></div>

					<div class="card-border"></div>

					<div class="card-image">
						{#if project.imageSrc}
							<img src={project.imageSrc} alt={project.title} class="h-full w-full" />
						{:else}
							<div class="image-placeholder">
								<Zap class="w-12 h-12" />
								<span>{project.title}</span>
							</div>
						{/if}
					</div>

					<div class="card-content">
						<h3 class="card-title">{project.title}</h3>
						<p class="card-desc">{project.subtitle}</p>

						<div class="card-tags">
							{#each project.tags as tag}
								<span class="tag">{tag}</span>
							{/each}
						</div>

						<div class="card-links">
							{#if project.href}
								<a
									href={project.href}
									target="_blank"
									rel="noopener"
									class="card-link primary cursor-pointer z-100"
									onclick={(e) => e.stopPropagation()}
								>
									<ExternalLink class="w-4 h-4" />
									<span>
										{project.href.includes('github') ? 'Code' : 'Live Demo'}
									</span>
								</a>
							{/if}
						</div>
					</div>

					<div class="card-shine"></div>
					<div class="card-particles">
						{#each Array(6) as _, i}
							<span style="--delay: {i * 0.1}s;"></span>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<button class="nav-btn prev" onclick={prevSlide} aria-label="Previous project">
			<ChevronLeft class="w-6 h-6" />
		</button>
		<button class="nav-btn next" onclick={nextSlide} aria-label="Next project">
			<ChevronRight class="w-6 h-6" />
		</button>

		<div class="indicators">
			{#each projectsData as project, index}
				<button
					class="indicator"
					class:active={currentIndex === index}
					onclick={() => (currentIndex = index)}
					aria-label="Go to project {index + 1}"
				>
					<span class="indicator-fill"></span>
				</button>
			{/each}
		</div>
	</div>

	<div class="counter" class:mounted>
		<span class="current">{String(currentIndex + 1).padStart(2, '0')}</span>
		<span class="separator">/</span>
		<span class="total">{String(projectsData.length).padStart(2, '0')}</span>
	</div>
</div>

<style>

	.projectsData-container {
		position: relative;
		min-height: 100%;

		background: linear-gradient(135deg, #00001a 0%, #00052a 50%, #00000f 100%);
		overflow: hidden;
		padding: 2rem;
	}

	.bg-effects {
		position: absolute;
		inset: 0;

		overflow: hidden;
	}

	.grid-floor {
		position: absolute;
		bottom: -50%;
		left: -50%;
		right: -50%;
		height: 200%;
		background-image:

			linear-gradient(rgba(0, 123, 255, 0.1) 1px, transparent 1px),
			linear-gradient(90deg, rgba(0, 123, 255, 0.1) 1px, transparent 1px);
		background-size: 60px 60px;
		transform-origin: center;
		animation: gridPulse 4s ease-in-out infinite;
	}

	@keyframes gridPulse {
		0%,
		100% {
			opacity: 0.5;
		}
		50% {
			opacity: 0.8;
		}
	}

	.radial-glow {
		position: absolute;
		top: 20%;
		left: 50%;
		transform: translateX(-50%);
		width: 800px;
		height: 600px;

		background: radial-gradient(ellipse, rgba(0, 123, 255, 0.15) 0%, transparent 60%);
		filter: blur(60px);
		animation: glowPulse 6s ease-in-out infinite;
	}

	@keyframes glowPulse {
		0%,
		100% {
			opacity: 0.6;
			transform: translateX(-50%) scale(1);
		}
		50% {
			opacity: 1;
			transform: translateX(-50%) scale(1.1);
		}
	}

	.particles {
		position: absolute;
		inset: 0;
	}

	.particle {
		position: absolute;
		left: calc(var(--x) * 1%);
		top: calc(var(--y) * 1%);
		width: calc(var(--size) * 1px);
		height: calc(var(--size) * 1px);

		background: #007bff;
		border-radius: 50%;
		box-shadow:
			0 0 10px #007bff,
			0 0 20px #007bff;
		animation: particleFloat var(--duration) ease-in-out infinite;
		animation-delay: calc(var(--i) * -0.5s);
	}

	@keyframes particleFloat {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
			opacity: 0.3;
		}
		25% {
			transform: translate(30px, -50px) scale(1.5);
			opacity: 0.8;
		}
		50% {
			transform: translate(-20px, -100px) scale(1);
			opacity: 0.5;
		}
		75% {
			transform: translate(40px, -50px) scale(1.2);
			opacity: 0.6;
		}
	}

	.scan-line {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;

		background: linear-gradient(90deg, transparent, rgba(0, 123, 255, 0.8), transparent);
		animation: scanMove 3s linear infinite;
	}

	@keyframes scanMove {
		from {
			top: -10%;
		}
		to {
			top: 110%;
		}
	}

	.header {
		position: relative;
		z-index: 10;
		text-align: center;
		margin-bottom: 3rem;
		opacity: 0;
		transform: translateY(-30px);
		transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.header.mounted {
		opacity: 1;
		transform: translateY(0);
	}

	.header-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;

		background: rgba(0, 123, 255, 0.1);
		border: 1px solid rgba(0, 123, 255, 0.3);
		color: #66aaff;
		border-radius: 100px;
		font-size: 0.85rem;
		margin-bottom: 1rem;
	}

	.header-title {
		font-size: 3rem;
		font-weight: 900;
		color: white;
		margin-bottom: 0.5rem;
	}

	.title-accent {

		color: #007bff;
		text-shadow: 0 0 30px rgba(0, 123, 255, 0.5);
	}

	.header-desc {
		color: rgba(255, 255, 255, 0.5);
		font-size: 0.95rem;
	}

	.carousel-wrapper {
		position: relative;
		z-index: 10;
		height: 500px;
		display: flex;
		align-items: center;
		justify-content: center;
		perspective: 1500px;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s ease 0.2s;
	}

	.carousel-wrapper.mounted {
		opacity: 1;
		transform: translateY(0);
	}

	.carousel {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		transform-style: preserve-3d;
	}

	.project-card {
		position: absolute;
		width: 320px;

		background: rgba(0, 5, 20, 0.9);

		border: 1px solid rgba(0, 123, 255, 0.2);
		border-radius: 20px;
		overflow: hidden;
		transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
		transform-style: preserve-3d;
	}

	.project-card.hovered {

		border-color: rgba(0, 123, 255, 0.6);
	}

	.project-card.active {

		border-color: rgba(0, 123, 255, 0.4);
	}

	.card-glow {
		position: absolute;
		inset: -2px;

		background: linear-gradient(
			135deg,
			rgba(0, 123, 255, 0.4),
			transparent,
			rgba(100, 150, 255, 0.3)
		);
		border-radius: 22px;
		opacity: 0;
		z-index: -1;
		transition: opacity 0.3s ease;
		filter: blur(15px);
	}

	.project-card.hovered .card-glow {
		opacity: 1;
	}

	.card-border {
		position: absolute;
		inset: 0;
		border-radius: 20px;
		padding: 2px;

		background: linear-gradient(135deg, #007bff, #44aaff, #007bff, #3366ff);
		background-size: 300% 300%;
		-webkit-mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		opacity: 0;
		animation: borderRotate 3s linear infinite;
		transition: opacity 0.3s ease;
	}

	.project-card.hovered .card-border {
		opacity: 1;
	}

	@keyframes borderRotate {
		from {
			background-position: 0% 50%;
		}
		to {
			background-position: 300% 50%;
		}
	}

	.card-image {
		position: relative;
		height: 180px;

		background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2a 100%);
		overflow: hidden;
	}

	.image-placeholder {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;

		color: rgba(0, 123, 255, 0.3);
		font-size: 0.9rem;
		font-weight: 600;
	}

	.image-overlay {
		position: absolute;
		inset: 0;

		background: linear-gradient(180deg, transparent 0%, rgba(0, 5, 20, 0.9) 100%);
	}

	.featured-badge {
		position: absolute;
		top: 12px;
		right: 12px;
		display: flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.3rem 0.6rem;

		background: linear-gradient(135deg, #007bff, #3366ff);
		border-radius: 100px;
		color: white;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
	}

	.card-content {
		padding: 1.25rem;
	}

	.card-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: white;
		margin-bottom: 0.5rem;
	}

	.card-desc {
		font-size: 0.85rem;
		color: rgba(255, 255, 255, 0.6);
		line-height: 1.5;
		margin-bottom: 1rem;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.card-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin-bottom: 1rem;
	}

	.tag {
		padding: 0.25rem 0.6rem;

		background: rgba(0, 123, 255, 0.1);
		border: 1px solid rgba(0, 123, 255, 0.2);
		border-radius: 4px;
		color: #66aaff;
		font-size: 0.7rem;
		font-weight: 500;
	}

	.card-links {
		display: flex;
		gap: 0.75rem;
	}

	.card-link {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.5rem 1rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		color: rgba(255, 255, 255, 0.7);
		font-size: 0.8rem;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.card-link:hover {
		background: rgba(255, 255, 255, 0.1);
		color: white;
	}

	.card-link.primary {

		background: linear-gradient(135deg, rgba(0, 123, 255, 0.3), rgba(50, 150, 255, 0.2));
		border-color: rgba(0, 123, 255, 0.3);
		color: #66aaff;
	}

	.card-link.primary:hover {
		background: linear-gradient(135deg, rgba(0, 123, 255, 0.5), rgba(50, 150, 255, 0.3));
		color: white;
		box-shadow: 0 5px 20px rgba(0, 123, 255, 0.3);
	}

	.card-shine {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			135deg,
			transparent 40%,
			rgba(255, 255, 255, 0.1) 50%,
			transparent 60%
		);
		opacity: 0;
		transition: opacity 0.3s ease;

		transform: translateX(-100%);
	}

	.project-card.hovered .card-shine {
		opacity: 1;
		animation: shineMove 0.6s ease forwards;
	}

	@keyframes shineMove {
		to {
			transform: translateX(100%);
		}
	}

	.card-particles {
		position: absolute;
		inset: 0;

		overflow: hidden;
	}

	.card-particles span {
		position: absolute;
		width: 4px;
		height: 4px;

		background: #007bff;
		border-radius: 50%;
		opacity: 0;
		box-shadow: 0 0 10px #007bff;
	}

	.project-card.hovered .card-particles span {
		animation: sparkle 0.8s ease forwards;
		animation-delay: var(--delay);
	}

	.card-particles span:nth-child(1) {
		top: 20%;
		left: 10%;
	}
	.card-particles span:nth-child(2) {
		top: 30%;
		right: 15%;
	}
	.card-particles span:nth-child(3) {
		top: 50%;
		left: 5%;
	}
	.card-particles span:nth-child(4) {
		top: 70%;
		right: 10%;
	}
	.card-particles span:nth-child(5) {
		bottom: 20%;
		left: 20%;
	}
	.card-particles span:nth-child(6) {
		bottom: 30%;
		right: 25%;
	}

	@keyframes sparkle {
		0% {
			opacity: 0;
			transform: scale(0);
		}
		50% {
			opacity: 1;
			transform: scale(1.5);
		}
		100% {
			opacity: 0;
			transform: scale(0) translateY(-20px);
		}
	}

	.nav-btn {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 50px;
		height: 50px;

		background: rgba(0, 123, 255, 0.1);
		border: 1px solid rgba(0, 123, 255, 0.3);
		color: #66aaff;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
		transition: all 0.3s ease;
	}

	.nav-btn:hover {

		background: rgba(0, 123, 255, 0.2);
		border-color: #007bff;
		color: white;
		box-shadow: 0 0 30px rgba(0, 123, 255, 0.4);
		transform: translateY(-50%) scale(1.1);
	}

	.nav-btn.prev {
		left: 20px;
	}
	.nav-btn.next {
		right: 20px;
	}

	.indicators {
		position: absolute;
		bottom: -40px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 0.5rem;
	}

	.indicator {
		width: 40px;
		height: 4px;
		background: rgba(255, 255, 255, 0.1);
		border: none;
		border-radius: 2px;
		overflow: hidden;
		transition: all 0.3s ease;
	}

	.indicator:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.indicator.active {

		background: rgba(0, 123, 255, 0.3);
	}

	.indicator-fill {
		display: block;
		width: 0;
		height: 100%;

		background: linear-gradient(90deg, #007bff, #3366ff);
		border-radius: 2px;
		transition: width 0.3s ease;
	}

	.indicator.active .indicator-fill {
		width: 100%;
		animation: fillProgress 4s linear forwards;
	}

	@keyframes fillProgress {
		from {
			width: 0;
		}
		to {
			width: 100%;
		}
	}

	.counter {
		position: absolute;
		bottom: 2rem;
		right: 2rem;
		display: flex;
		align-items: baseline;
		gap: 0.25rem;
		font-family: 'JetBrains Mono', monospace;
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.6s ease 0.4s;
	}

	.counter.mounted {
		opacity: 1;
		transform: translateY(0);
	}

	.current {
		font-size: 3rem;
		font-weight: 700;

		color: #007bff;
		text-shadow: 0 0 20px rgba(0, 123, 255, 0.5);
	}

	.separator {
		font-size: 1.5rem;
		color: rgba(255, 255, 255, 0.3);
		margin: 0 0.25rem;
	}

	.total {
		font-size: 1.5rem;
		color: rgba(255, 255, 255, 0.5);
	}

	@media (max-width: 1024px) {
		.carousel-wrapper {
			height: 450px;
		}

		.project-card {
			width: 280px;
		}

		.nav-btn.prev {
			left: 10px;
		}
		.nav-btn.next {
			right: 10px;
		}
	}

	@media (max-width: 768px) {
		.projectsData-container {
			padding: 1rem;
		}

		.header-title {
			font-size: 2rem;
		}

		.carousel-wrapper {
			height: 420px;
		}

		.project-card {
			width: 260px;
		}

		.card-image {
			height: 140px;
		}

		.nav-btn {
			width: 40px;
			height: 40px;
		}

		.counter {
			bottom: 1rem;
			right: 1rem;
		}

		.current {
			font-size: 2rem;
		}
	}
</style>
