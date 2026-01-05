<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { X, Sparkles, Terminal, Sun, MousePointerClick } from '@lucide/svelte';

	let isOpen = $state(false);

	onMount(() => {
		if (!browser) return;

		const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');

		if (!hasSeenWelcome) {
			setTimeout(() => {
				isOpen = true;
			}, 800);
		}
	});

	const closeDialog = () => {
		isOpen = false;
		if (browser) {
			localStorage.setItem('hasSeenWelcome', 'true');
		}
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			closeDialog();
		}
	};
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
	<div class="dialog-overlay" onclick={closeDialog} role="button" tabindex="-1">
		<div
			class="dialog-container"
			onclick={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
		>
			<div class="dialog-glow"></div>
			<div class="dialog-particles">
				{#each Array(8) as _, i}
					<span style="--i: {i};"></span>
				{/each}
			</div>

			<div class="dialog-header">
				<div class="header-icon">
					<Sparkles class="w-5 h-5" />
				</div>
				<h2 class="header-title">Welcome to My Portfolio!</h2>
				<button class="close-btn" onclick={closeDialog} aria-label="Close">
					<X class="w-4 h-4" />
				</button>
			</div>

			<div class="dialog-content">
				<p class="intro-text">
					This isn't just a portfolio — it's a <span class="highlight"
						>fully interactive IDE experience</span
					>. Explore it like you would your favorite code editor!
				</p>

				<div class="features">
					<div class="feature">
						<div class="feature-icon">
							<MousePointerClick class="w-4 h-4" />
						</div>
						<div class="feature-text">
							<strong>Click & Explore</strong>
							<span>Navigate files, open tabs, and discover hidden content</span>
						</div>
					</div>

					<div class="feature">
						<div class="feature-icon">
							<Terminal class="w-4 h-4" />
						</div>
						<div class="feature-text">
							<strong>Try the Terminal</strong>
							<span
								>Type commands like <code>help</code>, <code>skills</code>, or
								<code>projects</code></span
							>
						</div>
					</div>

					<div class="feature">
						<div class="feature-icon">
							<Sun class="w-4 h-4" />
						</div>
						<div class="feature-text">
							<strong>Change Theme</strong>
							<span>Change themes using the toggle button</span>
						</div>
					</div>

					<div class="feature">
						<div class="feature-icon">
							<Sparkles class="w-4 h-4" />
						</div>
						<div class="feature-text">
							<strong>Find Easter Eggs</strong>
							<span>There are hidden surprises everywhere — keep exploring!</span>
						</div>
					</div>
				</div>

				<p class="hint-text">💡 Pro tip: The more you explore, the more you'll discover!</p>
			</div>
			<div class="dialog-footer">
				<button class="start-btn" onclick={closeDialog}>
					<Sparkles class="w-4 h-4" />
					Start Exploring
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.dialog-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(8px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
		padding: 1rem;
		animation: fadeIn 0.3s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.dialog-container {
		position: relative;
		width: 100%;
		max-width: 480px;
		background: var(--color-surface-900);
		border: 1px solid var(--color-surface-700);
		border-radius: 16px;
		overflow: hidden;
		box-shadow:
			0 25px 50px -12px rgba(0, 0, 0, 0.5),
			0 0 0 1px rgba(255, 255, 255, 0.05);
		animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	.dialog-glow {
		position: absolute;
		top: -50%;
		left: 50%;
		transform: translateX(-50%);
		width: 300px;
		height: 200px;
		background: radial-gradient(ellipse, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
		filter: blur(40px);
		pointer-events: none;
	}

	.dialog-particles span {
		position: absolute;
		width: 4px;
		height: 4px;
		background: var(--color-primary-400);
		border-radius: 50%;
		opacity: 0;
		animation: sparkle 2s ease-in-out infinite;
		animation-delay: calc(var(--i) * 0.2s);
	}

	.dialog-particles span:nth-child(1) {
		top: 10%;
		left: 10%;
	}
	.dialog-particles span:nth-child(2) {
		top: 15%;
		right: 15%;
	}
	.dialog-particles span:nth-child(3) {
		top: 30%;
		left: 5%;
	}
	.dialog-particles span:nth-child(4) {
		top: 40%;
		right: 8%;
	}
	.dialog-particles span:nth-child(5) {
		bottom: 30%;
		left: 12%;
	}
	.dialog-particles span:nth-child(6) {
		bottom: 20%;
		right: 10%;
	}
	.dialog-particles span:nth-child(7) {
		bottom: 10%;
		left: 20%;
	}
	.dialog-particles span:nth-child(8) {
		bottom: 15%;
		right: 20%;
	}

	@keyframes sparkle {
		0%,
		100% {
			opacity: 0;
			transform: scale(0);
		}
		50% {
			opacity: 0.8;
			transform: scale(1.5);
		}
	}

	.dialog-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1.25rem 1.5rem;
		background: var(--color-surface-800);
		border-bottom: 1px solid var(--color-surface-700);
	}

	.header-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-400));
		border-radius: 10px;
		color: white;
	}

	.header-title {
		flex: 1;
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--color-surface-50);
		margin: 0;
	}

	.close-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		background: transparent;
		border: none;
		border-radius: 8px;
		color: var(--color-surface-400);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.close-btn:hover {
		background: var(--color-surface-700);
		color: var(--color-surface-50);
	}

	.dialog-content {
		padding: 1.5rem;
	}

	.intro-text {
		font-size: 0.95rem;
		line-height: 1.6;
		color: var(--color-surface-300);
		margin: 0 0 1.25rem 0;
	}

	.highlight {
		color: var(--color-primary-400);
		font-weight: 600;
	}

	.features {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 1.25rem;
	}

	.feature {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		padding: 0.75rem;
		background: var(--color-surface-800);
		border-radius: 10px;
		border: 1px solid var(--color-surface-700);
		transition: all 0.2s ease;
	}

	.feature:hover {
		border-color: var(--color-primary-600);
		background: rgba(102, 126, 234, 0.05);
	}

	.feature-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		background: var(--color-surface-700);
		border-radius: 6px;
		color: var(--color-primary-400);
		flex-shrink: 0;
	}

	.feature-text {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.feature-text strong {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--color-primary-100);
	}

	.feature-text span {
		font-size: 0.8rem;
		color: var(--color-surface-400);
	}

	.feature-text code {
		background: var(--color-surface-700);
		padding: 0.1rem 0.4rem;
		border-radius: 4px;
		font-family: 'Fira Code', monospace;
		font-size: 0.75rem;
		color: var(--color-primary-200);
	}

	.hint-text {
		font-size: 0.85rem;
		color: var(--color-surface-400);
		text-align: center;
		margin: 0;
		padding: 0.75rem;
		background: var(--color-surface-800);
		border-radius: 8px;
	}

	.dialog-footer {
		padding: 1rem 1.5rem 1.5rem;
	}

	.start-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.875rem 1.5rem;
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-400));
		border: none;
		border-radius: 10px;
		color: white;
		font-size: 0.95rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.start-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
	}

	.start-btn:active {
		transform: translateY(0);
	}

	@media (max-width: 480px) {
		.dialog-container {
			max-width: 100%;
			margin: 0.5rem;
		}

		.dialog-header {
			padding: 1rem;
		}

		.dialog-content {
			padding: 1rem;
		}

		.header-title {
			font-size: 1rem;
		}

		.feature {
			padding: 0.6rem;
		}
	}
</style>
