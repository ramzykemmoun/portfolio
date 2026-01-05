<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { X, Send, Bot, User, Copy, RotateCcw, MessageSquare, Zap } from '@lucide/svelte';
	import { marked } from 'marked';

	import { agent } from '$lib/stores/index.svelte';
	import { generateMessage } from '$lib/ai/services/chat';

	marked.setOptions({
		breaks: true,
		gfm: true
	});

	const parseMarkdown = (content: string): string => {
		return marked.parse(content) as string;
	};

	let inputValue = $state('');
	let isTyping = $state(false);

	interface Message {
		id: number;
		role: 'user' | 'assistant';
		content: string;
		timestamp: Date;
	}

	let messages = $state<Message[]>([]);

	onMount(() => {
		if (browser && window.innerWidth < 768) {
			agent.open = false;
		}
	});

	export const toggleAgent = () => {
		agent.open = !agent.open;
	};

	const sendMessage = async () => {
		if (!inputValue.trim()) return;

		messages = [
			...messages,
			{
				id: messages.length + 1,
				role: 'user',
				content: inputValue,
				timestamp: new Date()
			}
		];

		const userMsg = inputValue;
		inputValue = '';
		isTyping = true;

		const generatedText = await generateMessage(userMsg, messages);

		messages = [
			...messages,
			{
				id: messages.length + 1,
				role: 'assistant',
				content: generatedText,
				timestamp: new Date()
			}
		];

		isTyping = false;
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	const suggestions = [
		'Who are you',
		'What is your vision',
		'What is your mission',
		'What is your goal'
	];
</script>

<div class="agent-sidebar" class:open={agent.open}>
	<button
		class="toggle-btn"
		onclick={toggleAgent}
		title={agent.open ? 'Close AI Panel' : 'Open AI Panel'}
	>
		{#if agent.open}
			<Bot class="w-5 h-5" />
		{:else}
			<Bot class="w-5 h-5" />
		{/if}
	</button>

	{#if agent.open}
		<div class="agent-panel">
			<div class="agent-header">
				<div class="header-title">
					<div class="header-icon">
						<Zap class="w-4 h-4" />
					</div>
					<span>rk-v3</span>
					<span class="header-badge">Beta</span>
				</div>
				<button class="header-close" onclick={toggleAgent}>
					<X class="w-4 h-4" />
				</button>
			</div>

			<div class="agent-messages">
				<div class="text-primary-400 text-center">
					{#if messages.length <= 1}
						Hi! I'm rk-v3, the AI coding assistant of Ramzy, how can I help you today?
					{/if}
				</div>
				{#each messages as message}
					<div
						class="message"
						class:user={message.role === 'user'}
						class:assistant={message.role === 'assistant'}
					>
						<div class="message-avatar">
							{#if message.role === 'assistant'}
								<Bot class="w-4 h-4" />
							{:else}
								<User class="w-4 h-4" />
							{/if}
						</div>
						<div class="message-content">
							<div class="message-header">
								<span class="message-role">{message.role === 'assistant' ? 'Ramzy' : 'You'}</span>
							</div>
							<div class="message-text markdown-content">
								{@html parseMarkdown(message.content)}
							</div>
							{#if message.role === 'assistant'}
								<div class="message-actions">
									<button class="action-btn" title="Copy">
										<Copy class="w-3 h-3" />
									</button>
									<button class="action-btn" title="Regenerate">
										<RotateCcw class="w-3 h-3" />
									</button>
								</div>
							{/if}
						</div>
					</div>
				{/each}

				{#if isTyping}
					<div class="message assistant">
						<div class="message-avatar">
							<Bot class="w-4 h-4" />
						</div>
						<div class="message-content">
							<div class="typing-indicator">
								<span></span>
								<span></span>
								<span></span>
							</div>
						</div>
					</div>
				{/if}
			</div>

			{#if messages.length <= 1}
				<div class="suggestions">
					{#each suggestions as suggestion}
						<button
							class="suggestion-btn"
							onclick={() => {
								inputValue = suggestion;
								sendMessage();
							}}
						>
							<MessageSquare class="w-3 h-3" />
							{suggestion}
						</button>
					{/each}
				</div>
			{/if}

			<div class="agent-input">
				<textarea
					bind:value={inputValue}
					onkeydown={handleKeydown}
					placeholder="Ask me anything..."
					rows="1"
				></textarea>
				<button class="send-btn" onclick={sendMessage} disabled={!inputValue.trim()}>
					<Send class="w-4 h-4" />
				</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.agent-sidebar {
		display: flex;
		height: 100%;
		background: var(--color-surface-950);
		border-left: 1px solid var(--color-surface-800);
		transition: width 0.3s ease;
		width: 48px;
		flex-shrink: 0;
	}

	.agent-sidebar.open {
		width: 350px;
	}

	.toggle-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		background: transparent;
		border: none;
		color: var(--color-surface-400);
		cursor: pointer;
		transition: color 0.15s ease;
		flex-shrink: 0;
	}

	.toggle-btn:hover {
		color: var(--color-surface-50);
	}

	.agent-panel {
		flex: 1;
		display: flex;
		flex-direction: column;
		background: var(--color-surface-900);
		border-left: 1px solid var(--color-surface-800);
		overflow: hidden;
		animation: slideIn 0.2s ease;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateX(10px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.agent-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 12px;
		background: var(--color-surface-800);
		border-bottom: 1px solid var(--color-surface-700);
	}

	.header-title {
		display: flex;
		align-items: center;
		gap: 8px;
		color: var(--color-surface-50);
		font-size: 13px;
		font-weight: 600;
	}

	.header-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-400));
		border-radius: 5px;
	}

	.header-badge {
		padding: 1px 5px;
		background: var(--color-surface-700);
		border: 1px solid var(--color-primary-500);
		border-radius: 3px;
		font-size: 9px;
		color: var(--color-primary-200);
		text-transform: uppercase;
	}

	.header-close {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		background: transparent;
		border: none;
		border-radius: 4px;
		color: var(--color-surface-400);
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.header-close:hover {
		background: var(--color-surface-700);
		color: var(--color-surface-50);
	}

	.agent-messages {
		flex: 1;
		overflow-y: auto;
		padding: 12px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.agent-messages::-webkit-scrollbar {
		width: 5px;
	}

	.agent-messages::-webkit-scrollbar-thumb {
		background: var(--color-surface-700);
		border-radius: 3px;
	}

	.message {
		display: flex;
		gap: 8px;
	}

	.message-avatar {
		width: 24px;
		height: 24px;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.message.assistant .message-avatar {
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-400));
		color: white;
	}

	.message.user .message-avatar {
		background: var(--color-surface-700);
		color: var(--color-surface-400);
	}

	.message-content {
		flex: 1;
		min-width: 0;
	}

	.message-header {
		margin-bottom: 3px;
	}

	.message-role {
		font-size: 11px;
		font-weight: 600;
		color: var(--color-primary-400);
	}

	.message-text {
		font-size: 12px;
		line-height: 1.5;
		color: var(--color-primary-200);
	}

	.markdown-content :global(p) {
		margin: 0 0 0.5em 0;
	}

	.markdown-content :global(p:last-child) {
		margin-bottom: 0;
	}

	.markdown-content :global(strong) {
		font-weight: 600;
		color: var(--color-primary-100);
	}

	.markdown-content :global(em) {
		font-style: italic;
	}

	.markdown-content :global(code) {
		background: var(--color-surface-800);
		padding: 0.15em 0.4em;
		border-radius: 4px;
		font-family: 'Fira Code', 'Consolas', monospace;
		font-size: 0.9em;
		color: var(--color-primary-300);
	}

	.markdown-content :global(pre) {
		background: var(--color-surface-950);
		padding: 0.75em;
		border-radius: 6px;
		overflow-x: auto;
		margin: 0.5em 0;
		border: 1px solid var(--color-surface-800);
	}

	.markdown-content :global(pre code) {
		background: transparent;
		padding: 0;
		font-size: 0.85em;
	}

	.markdown-content :global(ul),
	.markdown-content :global(ol) {
		margin: 0.5em 0;
		padding-left: 1.5em;
	}

	.markdown-content :global(li) {
		margin: 0.25em 0;
	}

	.markdown-content :global(a) {
		color: var(--color-primary-400);
		text-decoration: underline;
	}

	.markdown-content :global(a:hover) {
		color: var(--color-primary-300);
	}

	.markdown-content :global(blockquote) {
		border-left: 3px solid var(--color-primary-500);
		padding-left: 0.75em;
		margin: 0.5em 0;
		color: var(--color-surface-400);
		font-style: italic;
	}

	.markdown-content :global(h1),
	.markdown-content :global(h2),
	.markdown-content :global(h3) {
		font-weight: 600;
		margin: 0.75em 0 0.25em 0;
		color: var(--color-primary-100);
	}

	.markdown-content :global(h1) {
		font-size: 1.2em;
	}

	.markdown-content :global(h2) {
		font-size: 1.1em;
	}

	.markdown-content :global(h3) {
		font-size: 1em;
	}

	.markdown-content :global(hr) {
		border: none;
		border-top: 1px solid var(--color-surface-700);
		margin: 0.75em 0;
	}

	.message-actions {
		display: flex;
		gap: 4px;
		margin-top: 6px;
	}

	.action-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		background: transparent;
		border: 1px solid var(--color-surface-700);
		border-radius: 4px;
		color: var(--color-surface-500);
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.action-btn:hover {
		background: var(--color-surface-700);
		color: var(--color-surface-200);
	}

	.typing-indicator {
		display: flex;
		gap: 4px;
		padding: 6px 0;
	}

	.typing-indicator span {
		width: 6px;
		height: 6px;
		background: var(--color-primary-500);
		border-radius: 50%;
		animation: typing 1.4s infinite ease-in-out;
	}

	.typing-indicator span:nth-child(2) {
		animation-delay: 0.2s;
	}
	.typing-indicator span:nth-child(3) {
		animation-delay: 0.4s;
	}

	@keyframes typing {
		0%,
		60%,
		100% {
			transform: translateY(0);
			opacity: 0.5;
		}
		30% {
			transform: translateY(-4px);
			opacity: 1;
		}
	}

	.suggestions {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		padding: 0 12px 10px;
	}

	.suggestion-btn {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 5px 10px;
		background: var(--color-surface-800);
		border: 1px solid var(--color-surface-700);
		border-radius: 100px;
		color: var(--color-surface-400);
		font-size: 11px;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.suggestion-btn:hover {
		background: var(--color-surface-700);
		color: var(--color-surface-50);
		border-color: var(--color-primary-500);
	}

	.agent-input {
		display: flex;
		align-items: flex-end;
		gap: 8px;
		padding: 10px 12px;
		border-top: 1px solid var(--color-surface-700);
		background: var(--color-surface-800);
	}

	.agent-input textarea {
		flex: 1;
		padding: 8px 10px;
		background: var(--color-surface-900);
		border: 1px solid var(--color-primary-700);
		border-radius: 6px;
		color: var(--color-primary-200);
		font-size: 12px;
		font-family: inherit;
		resize: none;
		outline: none;
		transition: border-color 0.15s ease;
	}

	.agent-input textarea:focus {
		border-color: var(--color-primary-500);
	}

	.agent-input textarea::placeholder {
		color: var(--color-surface-500);
	}

	.send-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-400));
		border: none;
		border-radius: 6px;
		color: white;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.send-btn:hover:not(:disabled) {
		transform: scale(1.05);
	}

	.send-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	@media (max-width: 1024px) {
		.agent-sidebar.open {
			width: 300px;
		}

		.suggestion-btn {
			padding: 6px 10px;
			font-size: 10px;
		}
	}

	@media (max-width: 768px) {
		.agent-sidebar {
			position: fixed;
			top: 64px;
			right: 16px;
			width: auto;
			height: auto;
			background: transparent;
			border: none;
			z-index: 1000;
		}

		.agent-sidebar .toggle-btn {
			width: 52px;
			height: 52px;
			background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-400));
			border-radius: 50%;
			color: white;
			box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
		}

		.agent-sidebar .toggle-btn:hover {
			transform: scale(1.05);
		}

		.agent-sidebar.open {
			position: fixed;
			inset: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			border: none;
			display: flex;
			align-items: flex-end;
			justify-content: center;
			padding: 0;
		}

		.agent-sidebar.open .toggle-btn {
			display: none;
		}

		.agent-sidebar.open .agent-panel {
			width: 100%;
			max-width: 100%;
			height: 85vh;
			max-height: 85vh;
			border-radius: 16px 16px 0 0;
			border: none;
			animation: slideUp 0.3s ease;
		}

		@keyframes slideUp {
			from {
				opacity: 0;
				transform: translateY(100%);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}

		.agent-header {
			padding: 14px 16px;
			border-radius: 16px 16px 0 0;
		}

		.header-title {
			font-size: 14px;
		}

		.header-close {
			width: 32px;
			height: 32px;
		}

		.agent-messages {
			padding: 16px;
			gap: 16px;
		}

		.message-avatar {
			width: 28px;
			height: 28px;
		}

		.message-text {
			font-size: 14px;
		}

		.message-role {
			font-size: 12px;
		}

		.suggestions {
			padding: 0 16px 12px;
			gap: 8px;
		}

		.suggestion-btn {
			padding: 8px 14px;
			font-size: 12px;
		}

		.agent-input {
			padding: 12px 16px;
			padding-bottom: max(12px, env(safe-area-inset-bottom));
		}

		.agent-input textarea {
			padding: 12px 14px;
			font-size: 14px;
		}

		.send-btn {
			width: 40px;
			height: 40px;
		}

		.action-btn {
			width: 28px;
			height: 28px;
		}
	}

	@media (max-width: 380px) {
		.agent-sidebar.open .agent-panel {
			height: 90vh;
		}

		.header-badge {
			display: none;
		}

		.suggestion-btn {
			padding: 6px 10px;
			font-size: 11px;
		}
	}
</style>
