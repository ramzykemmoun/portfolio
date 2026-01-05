<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { Quote, Star, ChevronLeft, ChevronRight, Sparkles } from '@lucide/svelte';
	import { testimonialsData } from '$lib/data/sections/testimonials';
	import younesfdj from '$lib/assets/testimonials/younesfdj.png';
	import mouhoub from '$lib/assets/testimonials/mouhoub.png';
	import beroual from '$lib/assets/testimonials/beroual.png';
	import assem from '$lib/assets/testimonials/assem.jfif';

	const avatars = [beroual, assem, younesfdj, mouhoub];

	let mounted = $state(false);
	let currentIndex = $state(0);
	let isAnimating = $state(false);
	let cardRefs: HTMLDivElement[] = [];
	let mousePosition = $state({ x: 0, y: 0 });

	const testimonials = testimonialsData;

	onMount(() => {
		if (!browser) return;
		setTimeout(() => (mounted = true), 100);

		// Auto-rotate testimonials
		const interval = setInterval(() => {
			if (!isAnimating) {
				nextTestimonial();
			}
		}, 6000);

		return () => clearInterval(interval);
	});

	const nextTestimonial = () => {
		if (isAnimating) return;
		isAnimating = true;
		currentIndex = (currentIndex + 1) % testimonials.length;
		setTimeout(() => (isAnimating = false), 600);
	};

	const prevTestimonial = () => {
		if (isAnimating) return;
		isAnimating = true;
		currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
		setTimeout(() => (isAnimating = false), 600);
	};

	const goToTestimonial = (index: number) => {
		if (isAnimating || index === currentIndex) return;
		isAnimating = true;
		currentIndex = index;
		setTimeout(() => (isAnimating = false), 600);
	};

	const handleMouseMove = (e: MouseEvent) => {
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		mousePosition = {
			x: ((e.clientX - rect.left) / rect.width) * 100,
			y: ((e.clientY - rect.top) / rect.height) * 100
		};
	};
</script>

<div class="testimonials-container relative" class:mounted onmousemove={handleMouseMove}>
	<div class="bg-pattern">
		<div class="gradient-orb orb-1"></div>
		<div class="gradient-orb orb-2"></div>
		<div class="gradient-orb orb-3"></div>
	</div>
	<div class="particles">
		{#each Array(20) as _, i}
			<div
				class="particle"
				style="--delay: {i * 0.3}s; --x: {Math.random() * 100}%; --duration: {5 +
					Math.random() * 10}s;"
			></div>
		{/each}
	</div>

	<div class="content-wrapper">
		<header class="section-header">
			<div class="header-badge">
				<Sparkles class="w-4 h-4" />
				<span>Testimonials</span>
			</div>
			<h2 class="main-title">
				What <span class="gradient-text">People Say</span>
			</h2>
			<p class="subtitle">
				Feedback from clients and colleagues I've had the pleasure to work with
			</p>
		</header>
		<div class="testimonial-showcase">
			<button class="nav-button prev" onclick={prevTestimonial} aria-label="Previous testimonial">
				<ChevronLeft class="w-6 h-6" />
			</button>

			<div class="card-container">
				{#each testimonials as testimonial, i}
					<div
						bind:this={cardRefs[i]}
						class="testimonial-card"
						class:active={i === currentIndex}
						class:prev={i === (currentIndex - 1 + testimonials.length) % testimonials.length}
						class:next={i === (currentIndex + 1) % testimonials.length}
						style="--mouse-x: {mousePosition.x}%; --mouse-y: {mousePosition.y}%;"
					>
						<div class="card-glow"></div>
						<div class="card-content">
							<div class="quote-icon">
								<Quote class="w-8 h-8" />
							</div>
							<p class="testimonial-text">{testimonial.content}</p>
							<div class="rating">
								{#each Array(5) as _, starIndex}
									<Star
										class="star {starIndex < testimonial.rating ? 'filled' : ''}"
										style="--star-delay: {starIndex * 0.1}s"
									/>
								{/each}
							</div>
							<div class="author-section">
								<div class="avatar-container">
									<img src={avatars[testimonial.id - 1]} alt={testimonial.name} class="avatar" />
									<div class="avatar-ring"></div>
								</div>
								<div class="author-info">
									<h4 class="author-name">{testimonial.name}</h4>
									<p class="author-role">
										{testimonial.role} <span class="at">@</span>
										{testimonial.company}
									</p>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<button class="nav-button next" onclick={nextTestimonial} aria-label="Next testimonial">
				<ChevronRight class="w-6 h-6" />
			</button>
		</div>
		<div class="dots-navigation">
			{#each testimonials as _, i}
				<button
					class="dot"
					class:active={i === currentIndex}
					onclick={() => goToTestimonial(i)}
					aria-label="Go to testimonial {i + 1}"
				>
					<span class="dot-progress" style="--progress: {i === currentIndex ? 100 : 0}%"></span>
				</button>
			{/each}
		</div>
		<div class="preview-grid">
			{#each testimonials as testimonial, i}
				<button
					class="preview-card"
					class:active={i === currentIndex}
					onclick={() => goToTestimonial(i)}
				>
					<img src={avatars[i]} alt={testimonial.name} class="preview-avatar" />
					<div class="preview-info">
						<span class="preview-name">{testimonial.name}</span>
						<span class="preview-company">{testimonial.company}</span>
					</div>
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
	.testimonials-container {
		position: relative;
		min-height: 100%;
		background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%);
		overflow-y: auto;
		overflow-x: hidden;
		font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
	}

	.bg-pattern {
		position: absolute;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.gradient-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.4;
		animation: floatOrb 20s ease-in-out infinite;
	}

	.orb-1 {
		width: 400px;
		height: 400px;
		background: linear-gradient(135deg, #667eea, #764ba2);
		top: -10%;
		right: -10%;
		animation-delay: 0s;
	}

	.orb-2 {
		width: 300px;
		height: 300px;
		background: linear-gradient(135deg, #f093fb, #f5576c);
		bottom: 20%;
		left: -5%;
		animation-delay: -7s;
	}

	.orb-3 {
		width: 350px;
		height: 350px;
		background: linear-gradient(135deg, #4facfe, #00f2fe);
		bottom: -10%;
		right: 20%;
		animation-delay: -14s;
	}

	@keyframes floatOrb {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		25% {
			transform: translate(30px, -30px) scale(1.05);
		}
		50% {
			transform: translate(-20px, 20px) scale(0.95);
		}
		75% {
			transform: translate(-30px, -20px) scale(1.02);
		}
	}

	.particles {
		position: fixed;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.particle {
		position: absolute;
		width: 4px;
		height: 4px;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		left: var(--x);
		bottom: -10px;
		animation: rise var(--duration) linear infinite;
		animation-delay: var(--delay);
	}

	@keyframes rise {
		0% {
			transform: translateY(0) scale(0);
			opacity: 0;
		}
		10% {
			opacity: 1;
			transform: scale(1);
		}
		90% {
			opacity: 0.5;
		}
		100% {
			transform: translateY(-100vh) scale(0.5);
			opacity: 0;
		}
	}

	.content-wrapper {
		position: relative;
		z-index: 10;
		max-width: 1000px;
		margin: 0 auto;
		padding: 3rem 2rem;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.testimonials-container.mounted .content-wrapper {
		opacity: 1;
		transform: translateY(0);
	}

	.section-header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.header-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: rgba(102, 126, 234, 0.15);
		border: 1px solid rgba(102, 126, 234, 0.3);
		border-radius: 50px;
		color: #a78bfa;
		font-size: 0.85rem;
		font-weight: 500;
		margin-bottom: 1rem;
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4);
		}
		50% {
			box-shadow: 0 0 20px 5px rgba(102, 126, 234, 0.2);
		}
	}

	.main-title {
		font-size: 2.5rem;
		font-weight: 700;
		color: #fff;
		margin-bottom: 0.75rem;
	}

	.gradient-text {
		background: linear-gradient(135deg, #667eea 0%, #f093fb 50%, #4facfe 100%);
		background-size: 200% 200%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: gradientShift 4s ease-in-out infinite;
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

	.subtitle {
		color: #8892b0;
		font-size: 1rem;
		max-width: 500px;
		margin: 0 auto;
	}

	.testimonial-showcase {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.nav-button {
		flex-shrink: 0;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: #fff;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		backdrop-filter: blur(10px);
	}

	.nav-button:hover {
		background: rgba(102, 126, 234, 0.3);
		border-color: rgba(102, 126, 234, 0.5);
		transform: scale(1.1);
		box-shadow: 0 0 30px rgba(102, 126, 234, 0.4);
	}

	.card-container {
		flex: 1;
		position: relative;
		height: 380px;
		perspective: 1000px;
	}

	.testimonial-card {
		position: absolute;
		inset: 0;
		border-radius: 24px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(20px);
		opacity: 0;
		transform: translateX(100%) rotateY(-15deg) scale(0.8);
		transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
		pointer-events: none;
		overflow: hidden;
		visibility: hidden;
	}

	.testimonials-container.mounted .testimonial-card {
		visibility: visible;
	}

	.testimonials-container.mounted .testimonial-card.active {
		opacity: 1;
		transform: translateX(0) rotateY(0) scale(1);
		pointer-events: auto;
		z-index: 10;
	}

	.testimonials-container.mounted .testimonial-card.prev {
		opacity: 0.3;
		transform: translateX(-30%) rotateY(15deg) scale(0.85);
		z-index: 5;
	}

	.testimonials-container.mounted .testimonial-card.next {
		opacity: 0.3;
		transform: translateX(30%) rotateY(-15deg) scale(0.85);
		z-index: 5;
	}

	.card-glow {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			circle at var(--mouse-x) var(--mouse-y),
			rgba(102, 126, 234, 0.15) 0%,
			transparent 50%
		);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.testimonial-card.active:hover .card-glow {
		opacity: 1;
	}

	.card-content {
		position: relative;
		height: 100%;
		padding: 2rem;
		display: flex;
		flex-direction: column;
	}

	.quote-icon {
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		color: rgba(102, 126, 234, 0.3);
	}

	.testimonial-text {
		flex: 1;
		color: #e2e8f0;
		font-size: 1.1rem;
		line-height: 1.8;
		margin: 0 0 1.5rem 0;
		font-style: italic;
	}

	.rating {
		display: flex;
		gap: 0.25rem;
		margin-bottom: 1.5rem;
	}

	.rating :global(.star) {
		width: 20px;
		height: 20px;
		color: #334155;
		transition: all 0.3s ease;
		transition-delay: var(--star-delay);
	}

	.rating :global(.star.filled) {
		color: #fbbf24;
		filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.5));
	}

	.testimonial-card.active .rating :global(.star.filled) {
		animation: starPop 0.5s ease forwards;
		animation-delay: var(--star-delay);
	}

	@keyframes starPop {
		0% {
			transform: scale(0) rotate(-180deg);
		}
		50% {
			transform: scale(1.3) rotate(10deg);
		}
		100% {
			transform: scale(1) rotate(0);
		}
	}

	.author-section {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.avatar-container {
		position: relative;
		width: 56px;
		height: 56px;
	}

	.avatar {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		object-fit: cover;
	}

	.avatar-ring {
		position: absolute;
		inset: -3px;
		border-radius: 50%;
		background: linear-gradient(135deg, #667eea, #f093fb, #4facfe);
		background-size: 200% 200%;
		animation: ringRotate 3s linear infinite;
		z-index: -1;
	}

	@keyframes ringRotate {
		0% {
			background-position: 0% 50%;
		}
		100% {
			background-position: 200% 50%;
		}
	}

	.author-info {
		flex: 1;
	}

	.author-name {
		color: #fff;
		font-size: 1.1rem;
		font-weight: 600;
		margin: 0 0 0.25rem 0;
	}

	.author-role {
		color: #8892b0;
		font-size: 0.9rem;
		margin: 0;
	}

	.at {
		color: #667eea;
		font-weight: 600;
	}

	.dots-navigation {
		display: flex;
		justify-content: center;
		gap: 0.75rem;
		margin-bottom: 2rem;
	}

	.dot {
		width: 32px;
		height: 4px;
		border-radius: 2px;
		background: rgba(255, 255, 255, 0.15);
		border: none;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		transition: all 0.3s ease;
	}

	.dot:hover {
		background: rgba(255, 255, 255, 0.25);
	}

	.dot.active {
		width: 48px;
	}

	.dot-progress {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: var(--progress);
		background: linear-gradient(90deg, #667eea, #f093fb);
		border-radius: 2px;
		transition: width 6s linear;
	}

	.dot.active .dot-progress {
		animation: progressFill 6s linear forwards;
	}

	@keyframes progressFill {
		from {
			width: 0%;
		}
		to {
			width: 100%;
		}
	}

	.preview-grid {
		display: flex;
		justify-content: center;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.preview-card {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 1rem 0.5rem 0.5rem;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 50px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.preview-card:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(102, 126, 234, 0.3);
		transform: translateY(-2px);
	}

	.preview-card.active {
		background: rgba(102, 126, 234, 0.15);
		border-color: rgba(102, 126, 234, 0.4);
		box-shadow: 0 4px 20px rgba(102, 126, 234, 0.2);
	}

	.preview-avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		object-fit: cover;
	}

	.preview-info {
		display: flex;
		flex-direction: column;
		text-align: left;
	}

	.preview-name {
		color: #fff;
		font-size: 0.8rem;
		font-weight: 500;
	}

	.preview-company {
		color: #8892b0;
		font-size: 0.7rem;
	}

	@media (max-width: 768px) {
		.content-wrapper {
			padding: 1.5rem 0.75rem;
		}

		.section-header {
			margin-bottom: 1.5rem;
		}

		.header-badge {
			padding: 0.4rem 0.75rem;
			font-size: 0.75rem;
		}

		.main-title {
			font-size: 1.5rem;
		}

		.subtitle {
			font-size: 0.85rem;
			padding: 0 0.5rem;
		}

		.testimonial-showcase {
			flex-direction: column;
			gap: 0.75rem;
			margin-bottom: 1.5rem;
		}

		.nav-button {
			display: none;
		}

		.card-container {
			width: 100%;
			height: auto;
			min-height: 380px;
			position: relative;
		}

		.testimonial-card {
			position: relative;
			transform: none !important;
			opacity: 0;
			display: none;
			border-radius: 16px;
		}

		.testimonials-container.mounted .testimonial-card.active {
			display: block;
			opacity: 1;
			transform: none !important;
		}

		.testimonials-container.mounted .testimonial-card.prev,
		.testimonials-container.mounted .testimonial-card.next {
			display: none;
			opacity: 0;
		}

		.card-content {
			padding: 1.25rem;
		}

		.quote-icon {
			top: 1rem;
			right: 1rem;
		}

		.quote-icon :global(svg) {
			width: 24px;
			height: 24px;
		}

		.testimonial-text {
			font-size: 0.9rem;
			line-height: 1.7;
			margin-bottom: 1rem;
			padding-right: 1.5rem;
		}

		.rating {
			margin-bottom: 1rem;
		}

		.rating :global(.star) {
			width: 16px;
			height: 16px;
		}

		.author-section {
			gap: 0.75rem;
		}

		.avatar-container {
			width: 44px;
			height: 44px;
		}

		.author-name {
			font-size: 0.95rem;
		}

		.author-role {
			font-size: 0.8rem;
		}

		.dots-navigation {
			margin-bottom: 1.5rem;
			gap: 0.5rem;
		}

		.dot {
			width: 24px;
			height: 3px;
		}

		.dot.active {
			width: 36px;
		}

		.preview-grid {
			display: flex;
			gap: 0.5rem;
			padding: 0 0.25rem;
			overflow-x: auto;
			justify-content: flex-start;
			scrollbar-width: none;
			-ms-overflow-style: none;
			padding-bottom: 0.5rem;
		}

		.preview-grid::-webkit-scrollbar {
			display: none;
		}

		.preview-card {
			flex-shrink: 0;
			padding: 0.4rem 0.75rem 0.4rem 0.4rem;
		}

		.preview-avatar {
			width: 28px;
			height: 28px;
		}

		.preview-name {
			font-size: 0.75rem;
		}

		.preview-company {
			font-size: 0.65rem;
		}

		.gradient-orb {
			filter: blur(60px);
			opacity: 0.25;
		}

		.orb-1 {
			width: 200px;
			height: 200px;
		}

		.orb-2 {
			width: 150px;
			height: 150px;
		}

		.orb-3 {
			width: 180px;
			height: 180px;
		}
	}

	@media (max-width: 480px) {
		.content-wrapper {
			padding: 1rem 0.5rem;
		}

		.main-title {
			font-size: 1.25rem;
		}

		.subtitle {
			font-size: 0.8rem;
		}

		.card-container {
			min-height: 340px;
		}

		.card-content {
			padding: 1rem;
		}

		.testimonial-text {
			font-size: 0.85rem;
			line-height: 1.6;
		}

		.avatar-container {
			width: 40px;
			height: 40px;
		}

		.author-name {
			font-size: 0.9rem;
		}

		.author-role {
			font-size: 0.75rem;
		}

		.preview-info {
			display: none;
		}

		.preview-card {
			padding: 0.3rem;
		}

		.preview-avatar {
			width: 36px;
			height: 36px;
		}
	}
</style>
