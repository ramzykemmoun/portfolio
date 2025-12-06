<script lang="ts">
	import { GraduationCap, Calendar, MapPin, Award, BookOpen, Star } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { educationData } from '$lib/data/sections/education';
	let mounted = $state(false);
	let activeCard = $state<string | null>(null);
	let mouseX = $state(0);
	let mouseY = $state(0);

	onMount(() => {
		setTimeout(() => {
			mounted = true;
		}, 100);
	});

	const handleMouseMove = (e: MouseEvent, cardId: string) => {
		const card = e.currentTarget as HTMLElement;
		const rect = card.getBoundingClientRect();
		mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
		mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
		activeCard = cardId;
	};

	const handleMouseLeave = () => {
		activeCard = null;
		mouseX = 0;
		mouseY = 0;
	};

	const getIconColor = (icon: string) => {
		switch (icon) {
			case 'thesis':
				return 'from-purple-500 to-pink-500';
			case 'master':
				return 'from-blue-500 to-cyan-500';
			case 'licence':
				return 'from-emerald-500 to-teal-500';
			case 'bac':
				return 'from-amber-500 to-orange-500';
			default:
				return 'from-gray-500 to-gray-600';
		}
	};

	const getGlowColor = (icon: string) => {
		switch (icon) {
			case 'thesis':
				return 'rgba(168, 85, 247, 0.4)';
			case 'master':
				return 'rgba(59, 130, 246, 0.4)';
			case 'licence':
				return 'rgba(16, 185, 129, 0.4)';
			case 'bac':
				return 'rgba(245, 158, 11, 0.4)';
			default:
				return 'rgba(107, 114, 128, 0.4)';
		}
	};
</script>

<div class="education-container relative">
	<div class="background-effects">
		<div class="gradient-orb orb-1"></div>
		<div class="gradient-orb orb-2"></div>
		<div class="gradient-orb orb-3"></div>
		<div class="grid-overlay"></div>
	</div>

	<header class="education-header" class:mounted>
		<div class="header-icon">
			<GraduationCap class="w-10 h-10" />
		</div>
		<h1 class="header-title">Education Journey</h1>
	</header>

	<div class="timeline">
		<div class="timeline-line"></div>

		{#each educationData as edu, index}
			<div
				class="education-card"
				class:mounted
				class:active={activeCard === edu.id}
				style="--delay: {index * 150}ms; --glow-color: {getGlowColor(
					edu.icon
				)}; --rotate-x: {activeCard === edu.id ? -mouseY : 0}deg; --rotate-y: {activeCard === edu.id
					? mouseX
					: 0}deg;"
				role="article"
				onmouseenter={(e) => handleMouseMove(e, edu.id)}
				onmousemove={(e) => handleMouseMove(e, edu.id)}
				onmouseleave={handleMouseLeave}
			>
				<!-- Timeline Node -->
				<div class="timeline-node">
					<div class="node-dot bg-linear-to-br {getIconColor(edu.icon)}">
						<div class="node-pulse"></div>
					</div>
					<div class="node-connector"></div>
				</div>

				<!-- Card Content -->
				<div class="card-content">
					<!-- Shine Effect -->
					<div class="card-shine"></div>

					<!-- Card Header -->
					<div class="card-header">
						<div class="degree-badge bg-linear-to-r {getIconColor(edu.icon)}">
							<GraduationCap class="w-5 h-5" />
							<span>{edu.degree}</span>
						</div>
						<div class="date-badge">
							<Calendar class="w-4 h-4" />
							<span>{edu.startDate} - {edu.endDate}</span>
						</div>
					</div>

					<!-- Field & Institution -->
					<h3 class="field-title">{edu.field}</h3>
					<div class="institution-info">
						<BookOpen class="w-4 h-4" />
						<span>{edu.institution}</span>
					</div>
					<div class="location-info">
						<MapPin class="w-4 h-4" />
						<span>{edu.location}</span>
					</div>

					<p class="description">{edu.description}</p>

					{#if edu.coreModules && edu.coreModules.length > 0}
						<div class="core-modules">
							<div class="achievements-header">
								<BookOpen class="w-4 h-4" /> <span>Core Modules</span>
							</div>
							<div class="core-modules-list">
								{#each edu.coreModules as module}
									<div class="core-module-tag">
										<span>{module}</span>
									</div>
								{/each}
							</div>
						</div>
					{/if}
					<div class="achievements">
						<div class="achievements-header">
							<Award class="w-4 h-4" />
							<span>{edu.thesis ? 'Thesis' : edu.grad ? 'Final Grad' : ''}</span>
						</div>
						<div class="achievements-list">
							<div class="achievement-tag">
								<Star class="w-3 h-3" />
								<span>{edu.thesis || edu.grad || ''}</span>
							</div>
						</div>
					</div>

					<!-- 3D Floating Elements -->
					<div class="floating-elements">
						<div class="float-element float-1">✨</div>
						<div class="float-element float-2">🎓</div>
						<div class="float-element float-3">📚</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.education-container {
		position: relative;
		padding: 4rem 2rem 2rem 2rem;
		background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%);
		overflow-y: scroll;
		display: 'flex';
	}

	/* Background Effects */
	.background-effects {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
	}

	.gradient-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.5;
		animation: float 20s ease-in-out infinite;
	}

	.orb-1 {
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
		top: -100px;
		right: -100px;
		animation-delay: 0s;
	}

	.orb-2 {
		width: 300px;
		height: 300px;
		background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
		bottom: 20%;
		left: -50px;
		animation-delay: -7s;
	}

	.orb-3 {
		width: 350px;
		height: 350px;
		background: radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%);
		top: 50%;
		right: 10%;
		animation-delay: -14s;
	}

	.grid-overlay {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
		background-size: 50px 50px;
		animation: gridMove 20s linear infinite;
	}

	@keyframes float {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		25% {
			transform: translate(30px, -30px) scale(1.1);
		}
		50% {
			transform: translate(-20px, 20px) scale(0.9);
		}
		75% {
			transform: translate(20px, 10px) scale(1.05);
		}
	}

	@keyframes gridMove {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(50px, 50px);
		}
	}

	/* Header */
	.education-header {
		position: relative;
		text-align: center;
		margin-bottom: 3rem;
		opacity: 0;
		transform: translateY(-30px);
		transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.education-header.mounted {
		opacity: 1;
		transform: translateY(0);
	}

	.header-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 80px;
		height: 80px;
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2));
		border-radius: 24px;
		margin-bottom: 1.5rem;
		color: white;
		box-shadow:
			0 0 40px rgba(139, 92, 246, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
		animation: iconPulse 3s ease-in-out infinite;
	}

	@keyframes iconPulse {
		0%,
		100% {
			transform: scale(1);
			box-shadow: 0 0 40px rgba(139, 92, 246, 0.3);
		}
		50% {
			transform: scale(1.05);
			box-shadow: 0 0 60px rgba(139, 92, 246, 0.5);
		}
	}

	.header-title {
		font-size: 2.5rem;
		font-weight: 800;
		background: linear-gradient(135deg, #fff 0%, #a78bfa 50%, #60a5fa 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 0.5rem;
		text-shadow: 0 0 40px rgba(167, 139, 250, 0.5);
	}

	.header-subtitle {
		font-size: 1.1rem;
		color: rgba(255, 255, 255, 0.6);
		max-width: 400px;
		margin: 0 auto;
	}

	/* Timeline */
	.timeline {
		position: relative;
		max-width: 900px;
		margin: 0 auto;
	}

	.timeline-line {
		position: absolute;
		left: 30px;
		top: 0;
		bottom: 0;
		width: 3px;
		background: linear-gradient(
			180deg,
			rgba(139, 92, 246, 0.8) 0%,
			rgba(59, 130, 246, 0.6) 33%,
			rgba(16, 185, 129, 0.6) 66%,
			rgba(245, 158, 11, 0.4) 100%
		);
		border-radius: 3px;
		box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
	}

	/* Education Card */
	.education-card {
		position: relative;
		display: flex;
		gap: 2rem;
		margin-bottom: 2rem;
		opacity: 0;
		transform: translateX(-50px);
		transition:
			opacity 0.6s ease,
			transform 0.6s ease;
		transition-delay: var(--delay);
		perspective: 1000px;
	}

	.education-card.mounted {
		opacity: 1;
		transform: translateX(0);
	}

	/* Timeline Node */
	.timeline-node {
		position: relative;
		flex-shrink: 0;
		width: 60px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.node-dot {
		position: relative;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
		box-shadow: 0 0 20px var(--glow-color);
	}

	.node-pulse {
		position: absolute;
		inset: -8px;
		border-radius: 50%;
		background: inherit;
		opacity: 0.3;
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.3;
		}
		50% {
			transform: scale(1.3);
			opacity: 0;
		}
	}

	.node-connector {
		flex: 1;
		width: 2px;
		background: linear-gradient(180deg, var(--glow-color), transparent);
	}

	/* Card Content */
	.card-content {
		position: relative;
		flex: 1;
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 20px;
		backdrop-filter: blur(20px);
		overflow: hidden;
		transform-style: preserve-3d;
		transform: rotateX(var(--rotate-x)) rotateY(var(--rotate-y));
		transition:
			transform 0.1s ease,
			box-shadow 0.3s ease,
			border-color 0.3s ease;
	}

	.education-card.active .card-content {
		border-color: rgba(255, 255, 255, 0.2);
		box-shadow:
			0 25px 50px -12px rgba(0, 0, 0, 0.5),
			0 0 40px var(--glow-color);
	}

	.card-shine {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			135deg,
			transparent 0%,
			rgba(255, 255, 255, 0.05) 50%,
			transparent 100%
		);
		transform: translateX(-100%);
		transition: transform 0.6s ease;
	}

	.education-card.active .card-shine {
		transform: translateX(100%);
	}

	/* Card Header */
	.card-header {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.degree-badge {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		border-radius: 100px;
		color: white;
		font-weight: 600;
		font-size: 0.9rem;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
	}

	.date-badge {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 100px;
		color: rgba(255, 255, 255, 0.8);
		font-size: 0.85rem;
	}

	/* Field & Institution */
	.field-title {
		font-size: 1.4rem;
		font-weight: 700;
		color: white;
		margin-bottom: 0.75rem;
	}

	.institution-info,
	.location-info {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: rgba(255, 255, 255, 0.7);
		font-size: 0.9rem;
		margin-bottom: 0.5rem;
	}

	/* Description */
	.description {
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.95rem;
		line-height: 1.6;
		margin: 1rem 0;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.03);
		border-radius: 12px;
		border-left: 3px solid var(--glow-color);
	}

	/* Achievements */
	.achievements {
		margin-top: 1rem;
	}

	.achievements-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: rgba(255, 255, 255, 0.8);
		font-weight: 600;
		font-size: 0.9rem;
		margin-bottom: 0.75rem;
	}

	.achievements-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.achievement-tag {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.4rem 0.8rem;
		background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(251, 191, 36, 0.1));
		border: 1px solid rgba(245, 158, 11, 0.3);
		border-radius: 100px;
		color: #fbbf24;
		font-size: 0.8rem;
		font-weight: 500;
	}

	.core-modules {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.core-modules-list {
		margin-top: 0.75rem;
	}

	.core-module-tag {
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(96, 165, 250, 0.1));
		border: 1px solid rgba(59, 130, 246, 0.3);
		color: #60a5fa;
		padding: 0 8px;
		margin: 8px;
		border-radius: 8px;
	}

	.floating-elements {
		position: absolute;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.float-element {
		position: absolute;
		font-size: 1.5rem;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.education-card.active .float-element {
		opacity: 0.6;
		animation: floatAround 3s ease-in-out infinite;
	}

	.float-1 {
		top: 10%;
		right: 10%;
		animation-delay: 0s;
	}

	.float-2 {
		bottom: 20%;
		right: 20%;
		animation-delay: 1s;
	}

	.float-3 {
		top: 30%;
		right: 5%;
		animation-delay: 2s;
	}

	@keyframes floatAround {
		0%,
		100% {
			transform: translate(0, 0) rotate(0deg);
		}
		25% {
			transform: translate(10px, -10px) rotate(10deg);
		}
		50% {
			transform: translate(-5px, 5px) rotate(-5deg);
		}
		75% {
			transform: translate(5px, 10px) rotate(5deg);
		}
	}

	/* Responsive */
	@media (max-width: 768px) {
		.education-container {
			padding: 1rem;
		}

		.timeline-line {
			left: 20px;
		}

		.timeline-node {
			width: 40px;
		}

		.education-card {
			gap: 1rem;
		}

		.header-title {
			font-size: 1.8rem;
		}

		.field-title {
			font-size: 1.2rem;
		}
	}
</style>
