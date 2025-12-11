<script lang="ts">
	import { Send, Mail, MessageSquare, CheckCircle2, Loader2, Sparkles } from '@lucide/svelte';

	let email = $state('');
	let message = $state('');
	let sending = $state(false);
	let sent = $state(false);
	let focusedField = $state<string | null>(null);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!email || !message) return;

		sending = true;
		await new Promise((resolve) => setTimeout(resolve, 2000));
		sending = false;
		sent = true;

		setTimeout(() => {
			sent = false;
			email = '';
			message = '';
		}, 3000);
	}
</script>

<div class="contact-page relative">
	<div class="bg-shape shape-1"></div>
	<div class="bg-shape shape-2"></div>
	<div class="bg-grid"></div>

	<div class="content-wrapper">
		<div class="header">
			<h2 class="title">
				<span class="gradient-text">Let's Connect</span>
			</h2>
			<p class="subtitle">Have a project in mind or just want to say Salam Alaikum?</p>
		</div>

		<div class="card-container">
			<div class="glass-card">
				{#if sent}
					<div class="success-message">
						<div class="success-icon">
							<CheckCircle2 size={48} />
						</div>
						<h3>Message Sent!</h3>
						<p>Thanks for reaching out. I'll get back to you soon.</p>
						<button class="reset-btn" onclick={() => (sent = false)}> Send another </button>
					</div>
				{:else}
					<form onsubmit={handleSubmit}>
						<div class="input-group" class:focused={focusedField === 'email'}>
							<label for="email">
								<Mail size={18} />
								<span>Email</span>
							</label>
							<div class="input-wrapper">
								<input
									type="email"
									id="email"
									bind:value={email}
									onfocus={() => (focusedField = 'email')}
									onblur={() => (focusedField = null)}
									placeholder="your@email.com"
									required
									disabled={sending}
								/>
								<div class="focus-border"></div>
							</div>
						</div>

						<div class="input-group" class:focused={focusedField === 'message'}>
							<label for="message">
								<MessageSquare size={18} />
								<span>Message</span>
							</label>
							<div class="input-wrapper">
								<textarea
									id="message"
									bind:value={message}
									onfocus={() => (focusedField = 'message')}
									onblur={() => (focusedField = null)}
									placeholder="Tell me about your project..."
									rows="5"
									required
									disabled={sending}
								></textarea>
								<div class="focus-border"></div>
							</div>
						</div>

						<button type="submit" class="submit-btn" disabled={sending || !email || !message}>
							{#if sending}
								<Loader2 class="spin" size={20} />
								<span>Sending...</span>
							{:else}
								<span>Send Message</span>
								<Send size={18} class="send-icon" />
							{/if}
						</button>
					</form>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.contact-page {
		display: flex;
		align-items: center;
		justify-content: center;
		overflow-x: hidden;
		z-index: 1;
	}

	@keyframes float {
		0% {
			transform: translate(0, 0) rotate(0deg);
		}
		100% {
			transform: translate(30px, 30px) rotate(10deg);
		}
	}

	.content-wrapper {
		width: 100%;
		max-width: 500px;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		z-index: 2;
	}

	.header {
		text-align: center;
	}

	.title {
		font-size: 2.5rem;
		font-weight: 800;
		margin-bottom: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		color: var(--color-surface-50);
	}

	.gradient-text {
		background: linear-gradient(135deg, var(--color-primary-400), var(--color-secondary-400));
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	.subtitle {
		color: var(--color-surface-400);
		font-size: 1.1rem;
	}
	.card-container {
		position: relative;
	}

	.glass-card {
		background: var(--color-surface-900);
		backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 20px;
		padding: 2.5rem;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--color-surface-300);
		transition: color 0.3s ease;
	}

	.input-group.focused label {
		color: var(--color-primary-400);
	}

	.input-wrapper {
		position: relative;
		background: rgba(0, 0, 0, 0.2);
		border-radius: 12px;
		overflow: hidden;
		transition: background 0.3s ease;
	}

	.input-group.focused .input-wrapper {
		background: rgba(0, 0, 0, 0.3);
	}

	input,
	textarea {
		width: 100%;
		padding: 1rem;
		background: transparent;
		border: none;
		color: var(--color-surface-50);
		font-size: 1rem;
		outline: none;
		font-family: inherit;
	}

	input::placeholder,
	textarea::placeholder {
		color: var(--color-surface-500);
		opacity: 0.7;
	}

	textarea {
		resize: vertical;
		min-height: 120px;
	}

	.focus-border {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background: linear-gradient(90deg, var(--color-primary-500), var(--color-secondary-500));
		transform: scaleX(0);
		transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.input-group.focused .focus-border {
		transform: scaleX(1);
	}

	/* Submit Button */
	.submit-btn {
		margin-top: 1rem;
		padding: 1rem;
		border: none;
		border-radius: 12px;
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-500));
		color: white;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.submit-btn::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
		transition: left 0.5s ease;
	}

	.submit-btn:hover:not(:disabled)::before {
		left: 100%;
	}

	.submit-btn:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 10px 20px rgba(var(--color-primary-500-rgb), 0.3); /* Assuming rgb vars exist or fallback */
		filter: brightness(1.1);
	}

	.submit-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		background: var(--color-surface-700);
	}

	:global(.send-icon) {
		transition: transform 0.3s ease;
	}

	.submit-btn:hover :global(.send-icon) {
		transform: translateX(3px) translateY(-3px);
	}

	/* Success State */
	.success-message {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 2rem 0;
		color: var(--color-surface-50);
	}

	.success-icon {
		margin-bottom: 1.5rem;
		color: var(--color-success-500);
	}

	.success-message h3 {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.success-message p {
		color: var(--color-surface-400);
		margin-bottom: 2rem;
	}

	.reset-btn {
		background: transparent;
		border: 1px solid var(--color-surface-600);
		color: var(--color-surface-300);
		padding: 0.5rem 1rem;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s;
	}

	.reset-btn:hover {
		background: var(--color-surface-800);
		color: var(--color-surface-100);
		border-color: var(--color-surface-500);
	}

	.top-right {
		top: -20px;
		right: -20px;
		background: var(--color-secondary-500);
		opacity: 0.2;
	}

	.bottom-left {
		bottom: -20px;
		left: -20px;
		background: var(--color-primary-500);
		opacity: 0.2;
	}

	/* Responsiveness */
	@media (max-width: 600px) {
		.glass-card {
			padding: 1.5rem;
		}

		.title {
			font-size: 2rem;
		}
	}
</style>
