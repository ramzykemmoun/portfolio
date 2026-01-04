<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import {
		MapPin,
		Mail,
		Github,
		Linkedin,
		ExternalLink,
		Terminal,
		Coffee,
		Code2,
		Rocket,
		Instagram
	} from '@lucide/svelte';
	import { aboutMeData } from '$lib/data/sections/about-me';

	let mounted = $state(false);
	let terminalText = $state('');
	let showCursor = $state(true);
	let currentLineIndex = $state(0);
	let matrixCanvas: HTMLCanvasElement;

	onMount(() => {
		if (!browser) return;

		setTimeout(() => (mounted = true), 100);

		let lineIndex = 0;
		let charIndex = 0;

		const typeWriter = () => {
			if (lineIndex < aboutMeData.terminalLines.length) {
				const currentLine = aboutMeData.terminalLines[lineIndex];
				if (charIndex < currentLine.length) {
					terminalText += currentLine[charIndex];
					charIndex++;
					setTimeout(typeWriter, 15 + Math.random() * 25);
				} else {
					terminalText += '\n';
					lineIndex++;
					charIndex = 0;
					currentLineIndex = lineIndex;
					setTimeout(typeWriter, 200);
				}
			}
		};

		setTimeout(typeWriter, 800);

		const cursorInterval = setInterval(() => {
			showCursor = !showCursor;
		}, 530);

		initMatrix();

		return () => clearInterval(cursorInterval);
	});

	const initMatrix = () => {
		if (!matrixCanvas) return;

		const ctx = matrixCanvas.getContext('2d');
		if (!ctx) return;

		matrixCanvas.width = matrixCanvas.offsetWidth;
		matrixCanvas.height = matrixCanvas.offsetHeight;

		const chars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01234567890ABCDEF</>{}[];';
		const fontSize = 14;
		const columns = Math.floor(matrixCanvas.width / fontSize);
		const drops: number[] = Array(columns).fill(1);

		const draw = () => {
			if (!ctx) return;
			ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
			ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

			ctx.fillStyle = '#0f0';
			ctx.font = `${fontSize}px monospace`;

			for (let i = 0; i < drops.length; i++) {
				const char = chars[Math.floor(Math.random() * chars.length)];
				const x = i * fontSize;
				const y = drops[i] * fontSize;

				ctx.fillStyle = `rgba(0, 255, 0, ${Math.random() * 0.5 + 0.5})`;
				ctx.fillText(char, x, y);

				if (y > matrixCanvas.height && Math.random() > 0.975) {
					drops[i] = 0;
				}
				drops[i]++;
			}
		};

		setInterval(draw, 50);
	};
</script>

<div class="about-container relative">
	<!-- Matrix Background -->
	<canvas bind:this={matrixCanvas} class="matrix-bg"></canvas>

	<div class="scanlines"></div>

	<div class="glitch-overlay"></div>

	<div class="content-wrapper" class:mounted>
		<header class="header-section">
			<div class="photo-container">
				<div class="photo-frame">
					<div class="photo-glitch" data-text="RK">
						<img
							src={aboutMeData.profilePicture}
							alt="Ramzy KEMMOUN"
							class="aboutMeData-photo"
							onerror={(e) => {
								const target = e.currentTarget as HTMLImageElement;
								target.style.display = 'none';
								target.nextElementSibling?.classList.remove('hidden');
							}}
						/>
						<div class="photo-fallback hidden">RK</div>
					</div>
					<div class="photo-border"></div>
					<div class="photo-corners">
						<span></span><span></span><span></span><span></span>
					</div>
				</div>
				<div class="status-indicator">
					<span class="status-dot"></span>
					<span>ONLINE</span>
				</div>
			</div>

			<div class="info-section">
				<div class="name-glitch" data-text={aboutMeData.fullName}>
					<h1>{aboutMeData.fullName}</h1>
				</div>
				<p class="title">&lt;{aboutMeData.title} /&gt;</p>

				<div class="contact-links">
					<a href="/" class="contact-item">
						<MapPin class="w-4 h-4" />
						<span>{aboutMeData.location}</span>
					</a>
					<a href="mailto:{aboutMeData.email}" class="contact-item">
						<Mail class="w-4 h-4" />
						<span>{aboutMeData.email}</span>
					</a>
					<div class="flex gap-4">
						<a href={aboutMeData.github} target="_blank" class="contact-item">
							<Github class="w-4 h-4" />
							<span>GitHub</span>
							<ExternalLink class="w-3 h-3" />
						</a>
						<a href={aboutMeData.linkedin} target="_blank" class="contact-item">
							<Linkedin class="w-4 h-4" />
							<span>LinkedIn</span>
							<ExternalLink class="w-3 h-3" />
						</a>
						<a href={aboutMeData.instagram} target="_blank" class="contact-item">
							<Instagram class="w-4 h-4" />
							<span>Instagram</span>
							<ExternalLink class="w-3 h-3" />
						</a>
					</div>
				</div>
			</div>
		</header>

		<!-- Terminal Section -->
		<section class="terminal-section">
			<div class="terminal-header">
				<div class="terminal-buttons">
					<span class="btn-close"></span>
					<span class="btn-minimize"></span>
					<span class="btn-maximize"></span>
				</div>
				<span class="terminal-title">
					<Terminal class="w-4 h-4" />
					ramzy@portfolio:~
				</span>
			</div>
			<div class="terminal-body">
				<pre class="terminal-output">{terminalText}<span class="cursor" class:visible={showCursor}
						>█</span
					></pre>
			</div>
		</section>

		<!-- Stats Grid -->
		<section class="stats-grid">
			{#each aboutMeData.stats as stat, i}
				<div class="stat-card" style="--delay: {i * 100}ms">
					<span class="stat-value">{stat.value}</span>
					<span class="stat-label">{stat.label}</span>
					<div class="stat-glow"></div>
				</div>
			{/each}
		</section>

		<section class="bio-section">
			<div class="section-header">
				<Code2 class="w-5 h-5" />
				<span>README.md</span>
			</div>
			<div class="bio-content">
				<pre>{aboutMeData.bio}</pre>
			</div>
		</section>

		<section class="interests-section">
			<div class="section-header">
				<Rocket class="w-5 h-5" />
				<span>interests.json</span>
			</div>
			<div class="interests-grid">
				{#each aboutMeData.interests as interest, i}
					<span class="interest-tag" style="--delay: {i * 80}ms">
						#{interest.replace(/\s+/g, '')}
					</span>
				{/each}
			</div>
		</section>
	</div>
</div>

<style>
	.about-container {
		position: relative;
		min-height: 100%;
		background: #0a0a0a;
		overflow-y: auto;
		overflow-x: hidden;
		font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
	}

	/* Matrix Background */
	.matrix-bg {
		position: absolute;
		inset: 0;
		opacity: 0.15;
		pointer-events: none;
	}

	/* Scanlines */
	.scanlines {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: repeating-linear-gradient(
			0deg,
			rgba(0, 0, 0, 0.15),
			rgba(0, 0, 0, 0.15) 1px,
			transparent 1px,
			transparent 2px
		);
		z-index: 1;
	}

	/* Glitch overlay */
	.glitch-overlay {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 2;
		animation: glitchBg 8s infinite;
	}

	@keyframes glitchBg {
		0%,
		100% {
			opacity: 0;
		}
		92% {
			opacity: 0;
		}
		93% {
			opacity: 0.3;
			background: linear-gradient(
				90deg,
				transparent 0%,
				rgba(0, 255, 0, 0.03) 50%,
				transparent 100%
			);
			transform: translateX(-5%);
		}
		94% {
			opacity: 0;
			transform: translateX(0);
		}
		96% {
			opacity: 0.2;
			background: linear-gradient(
				90deg,
				transparent 0%,
				rgba(255, 0, 0, 0.02) 50%,
				transparent 100%
			);
			transform: translateX(3%);
		}
		97% {
			opacity: 0;
		}
	}

	/* Content */
	.content-wrapper {
		position: relative;
		z-index: 10;
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem;
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.content-wrapper.mounted {
		opacity: 1;
		transform: translateY(0);
	}

	/* Header Section */
	.header-section {
		display: flex;
		gap: 2rem;
		margin-bottom: 2rem;
		padding: 1.5rem;
		background: rgba(0, 255, 0, 0.02);
		border: 1px solid rgba(0, 255, 0, 0.15);
		border-radius: 4px;
	}

	/* Photo */
	.photo-container {
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.photo-frame {
		position: relative;
		width: 140px;
		height: 140px;
	}

	.photo-glitch {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
		border-radius: 4px;
	}

	.aboutMeData-photo {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: grayscale(100%) contrast(1.1);
		transition: filter 0.3s ease;
	}

	.photo-frame:hover .aboutMeData-photo {
		filter: grayscale(0%) contrast(1);
	}

	.photo-fallback {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #0a0a0a, #1a1a2e);
		color: #0f0;
		font-size: 3rem;
		font-weight: bold;
	}

	.hidden {
		display: none !important;
	}

	.photo-border {
		position: absolute;
		inset: -3px;
		border: 2px solid #0f0;
		border-radius: 6px;
		opacity: 0.5;
		animation: borderPulse 2s ease-in-out infinite;
	}

	@keyframes borderPulse {
		0%,
		100% {
			opacity: 0.3;
		}
		50% {
			opacity: 0.8;
		}
	}

	.photo-corners span {
		position: absolute;
		width: 12px;
		height: 12px;
		border-color: #0f0;
		border-style: solid;
	}

	.photo-corners span:nth-child(1) {
		top: -5px;
		left: -5px;
		border-width: 2px 0 0 2px;
	}
	.photo-corners span:nth-child(2) {
		top: -5px;
		right: -5px;
		border-width: 2px 2px 0 0;
	}
	.photo-corners span:nth-child(3) {
		bottom: -5px;
		left: -5px;
		border-width: 0 0 2px 2px;
	}
	.photo-corners span:nth-child(4) {
		bottom: -5px;
		right: -5px;
		border-width: 0 2px 2px 0;
	}

	.status-indicator {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.75rem;
		color: #0f0;
		text-transform: uppercase;
		letter-spacing: 2px;
	}

	.status-dot {
		width: 8px;
		height: 8px;
		background: #0f0;
		border-radius: 50%;
		animation: statusBlink 1.5s ease-in-out infinite;
		box-shadow: 0 0 10px #0f0;
	}

	@keyframes statusBlink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.4;
		}
	}

	/* Info Section */
	.info-section {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.name-glitch {
		position: relative;
	}

	.name-glitch h1 {
		font-size: 2rem;
		font-weight: 700;
		color: #0f0;
		text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
		animation: textGlitch 5s infinite;
	}

	@keyframes textGlitch {
		0%,
		100% {
			text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
		}
		92% {
			text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
		}
		93% {
			text-shadow:
				-2px 0 #f0f,
				2px 0 #0ff;
			transform: translateX(-2px);
		}
		94% {
			text-shadow:
				2px 0 #f0f,
				-2px 0 #0ff;
			transform: translateX(2px);
		}
		95% {
			text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
			transform: translateX(0);
		}
	}

	.title {
		color: #888;
		font-size: 1.1rem;
	}

	.contact-links {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 0.5rem;
	}

	.contact-item {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		color: #666;
		font-size: 0.85rem;
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.contact-item:hover {
		color: #0f0;
	}

	/* Terminal */
	.terminal-section {
		background: #0d0d0d;
		border: 1px solid #333;
		border-radius: 6px;
		overflow: hidden;
		margin-bottom: 2rem;
	}

	.terminal-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.75rem 1rem;
		background: #1a1a1a;
		border-bottom: 1px solid #333;
	}

	.terminal-buttons {
		display: flex;
		gap: 0.5rem;
	}

	.terminal-buttons span {
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}

	.btn-close {
		background: #ff5f56;
	}
	.btn-minimize {
		background: #ffbd2e;
	}
	.btn-maximize {
		background: #27c93f;
	}

	.terminal-title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: #888;
		font-size: 0.85rem;
	}

	.terminal-body {
		padding: 1rem;
		min-height: 180px;
	}

	.terminal-output {
		color: #0f0;
		font-size: 0.9rem;
		line-height: 1.6;
		white-space: pre-wrap;
		margin: 0;
	}

	.cursor {
		opacity: 0;
		color: #0f0;
	}

	.cursor.visible {
		opacity: 1;
	}

	/* Stats */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.stat-card {
		position: relative;
		padding: 1.25rem;
		background: rgba(0, 255, 0, 0.02);
		border: 1px solid rgba(0, 255, 0, 0.1);
		border-radius: 4px;
		text-align: center;
		overflow: hidden;
		opacity: 0;
		animation: fadeInUp 0.5s ease forwards;
		animation-delay: var(--delay);
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.stat-value {
		display: block;
		font-size: 1.75rem;
		font-weight: 700;
		color: #0f0;
		text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
	}

	.stat-label {
		display: block;
		font-size: 0.75rem;
		color: #666;
		text-transform: uppercase;
		letter-spacing: 1px;
		margin-top: 0.25rem;
	}

	.stat-glow {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at center, rgba(0, 255, 0, 0.1) 0%, transparent 70%);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.stat-card:hover .stat-glow {
		opacity: 1;
	}

	/* Bio Section */
	.bio-section,
	.interests-section {
		margin-bottom: 1.5rem;
		background: rgba(0, 255, 0, 0.02);
		border: 1px solid rgba(0, 255, 0, 0.1);
		border-radius: 4px;
		overflow: hidden;
	}

	.section-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		background: rgba(0, 0, 0, 0.3);
		border-bottom: 1px solid rgba(0, 255, 0, 0.1);
		color: #0f0;
		font-size: 0.85rem;
	}

	.bio-content {
		padding: 1rem;
	}

	.bio-content pre {
		color: #aaa;
		font-size: 0.9rem;
		line-height: 1.8;
		margin: 0;
		white-space: pre-wrap;
	}

	/* Interests */
	.interests-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		padding: 1rem;
	}

	.interest-tag {
		padding: 0.5rem 1rem;
		background: rgba(0, 255, 0, 0.05);
		border: 1px solid rgba(0, 255, 0, 0.2);
		border-radius: 4px;
		color: #0f0;
		font-size: 0.85rem;
		opacity: 0;
		animation: fadeInUp 0.4s ease forwards;
		animation-delay: var(--delay);
		transition: all 0.2s ease;
	}

	.interest-tag:hover {
		background: rgba(0, 255, 0, 0.15);
		transform: translateY(-2px);
		box-shadow: 0 5px 20px rgba(0, 255, 0, 0.2);
	}

	@media (max-width: 768px) {
		.header-section {
			flex-direction: column;
			align-items: center;
			text-align: center;
		}

		.contact-links {
			justify-content: center;
		}

		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.name-glitch h1 {
			font-size: 1.5rem;
		}
	}
</style>
