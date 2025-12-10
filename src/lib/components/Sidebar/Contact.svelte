<script lang="ts">
	import { onMount } from 'svelte';
	import { sidebar } from '$lib/stores/index.svelte';
	import { Mail, MessageSquare, Send, User, CheckCircle2, Loader2 } from '@lucide/svelte';

	/** @type {{ isResizing: boolean }} */
	let { isResizing = $bindable() } = $props();

	let minWidth = 200;
	let maxWidth = 900;

	const resize = (e: MouseEvent) => {
		if (!isResizing) return;

		const newWidth = e.clientX;

		if (newWidth >= minWidth && newWidth <= maxWidth) {
			sidebar.width = newWidth;
		}
	};

	const stopResize = () => {
		if (isResizing) {
			isResizing = false;
			document.body.style.userSelect = '';
			document.body.style.cursor = '';
		}
	};

	onMount(() => {
		document.addEventListener('mousemove', resize);
		document.addEventListener('mouseup', stopResize);

		return () => {
			document.removeEventListener('mousemove', resize);
			document.removeEventListener('mouseup', stopResize);
		};
	});

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let isSubmitting = $state(false);
	let isSuccess = $state(false);

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		isSubmitting = true;

		// Simulate network request
		await new Promise((resolve) => setTimeout(resolve, 1500));

		isSubmitting = false;
		isSuccess = true;

		// Reset form
		name = '';
		email = '';
		message = '';

		setTimeout(() => {
			isSuccess = false;
		}, 3000);
	};
</script>

<div class="contact-container" style="width: {sidebar.width}px;">
	<div class="header">
		<span class="header-title">CONTACT</span>
	</div>

	<div class="content">
		<div class="info-text">
			Feel free to reach out for collaborations, questions, or just to say hi!
		</div>

		<form onsubmit={handleSubmit} class="contact-form">
			<div class="form-group">
				<label for="email" class="form-label">
					<Mail size={14} />
					Email
				</label>
				<input
					class="form-input"
					type="email"
					id="email"
					bind:value={email}
					placeholder="ramzykemmoun@gmail.com"
					required
				/>
			</div>

			<div class="form-group">
				<label for="message" class="form-label">
					<MessageSquare size={14} />
					Message
				</label>
				<textarea
					class="form-textarea"
					id="message"
					bind:value={message}
					placeholder="Type your message here..."
					required
					rows="6"
				></textarea>
			</div>

			<button type="submit" class="submit-btn" class:success={isSuccess} disabled={isSubmitting}>
				{#if isSubmitting}
					<Loader2 size={16} class="animate-spin" />
					Sending...
				{:else if isSuccess}
					<CheckCircle2 size={16} />
					Sent!
				{:else}
					<Send size={16} />
					Send Message
				{/if}
			</button>
		</form>
	</div>
</div>

<style>
	.contact-container {
		height: 100%;
		background: var(--color-surface-900);
		color: var(--color-surface-50);
		display: flex;
		flex-direction: column;
		font-size: 13px;
	}

	.header {
		padding: 10px 20px;
		border-bottom: 1px solid var(--surface-800);
		background: rgba(255, 255, 255, 0.02);
	}

	.header-title {
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: var(--color-surface-500);
	}

	.content {
		padding: 20px;
		overflow-y: auto;
		flex: 1;
	}

	.info-text {
		color: var(--surface-color-200);
		margin-bottom: 24px;
		line-height: 1.5;
		font-size: 13px;
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.form-label {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
		font-weight: 600;
		color: var(--color-primary-500);
	}

	.form-input,
	.form-textarea {
		width: 100%;
		background: var(--color-surface-800); /* Slightly lighter than bg */
		border: 1px solid var(--color-primary-700);
		color: var(--surface-color-50);
		padding: 8px 10px;
		font-family: inherit;
		font-size: 13px;
		border-radius: 8px;
		outline: none;
		transition:
			border-color 0.15s,
			background-color 0.15s;
	}

	.form-input:focus,
	.form-textarea:focus {
		border-color: var(--color-primary-700);
		background: var(--surface-950);
	}

	.form-input::placeholder,
	.form-textarea::placeholder {
		color: var(--surface-color-200);
		opacity: 0.5;
	}

	.form-textarea {
		resize: vertical;
		min-height: 80px;
	}

	.submit-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		margin-top: 8px;
		padding: 10px;
		background: var(--color-primary-700);
		color: white;
		border: none;
		border-radius: 4px;
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.submit-btn:hover:not(:disabled) {
		background: var(--color-primary-600);
	}

	.submit-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.submit-btn.success {
		background: var(--color-success-700);
	}
</style>
