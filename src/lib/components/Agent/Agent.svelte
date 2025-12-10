<script lang="ts">
	import {
		X,
		Send,
		Sparkles,
		Bot,
		User,
		Copy,
		RotateCcw,
		MessageSquare,
		Zap,
		PanelRightClose,
		PanelRightOpen
	} from '@lucide/svelte';

	import { agent } from '$lib/stores/index.svelte';

	let inputValue = $state('');
	let isTyping = $state(false);

	interface Message {
		id: number;
		role: 'user' | 'assistant';
		content: string;
		timestamp: Date;
	}

	let messages = $state<Message[]>([
		{
			id: 1,
			role: 'assistant',
			content: "Hi! I'm your AI coding assistant. How can I help you today?",
			timestamp: new Date()
		}
	]);

	export const toggleAgent = () => {
		agent.open = !agent.open;
	};

	const sendMessage = () => {
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

		setTimeout(() => {
			messages = [
				...messages,
				{
					id: messages.length + 1,
					role: 'assistant',
					content: `I understand you're asking about "${userMsg}". This is a demo response.`,
					timestamp: new Date()
				}
			];
			isTyping = false;
		}, 1500);
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	const suggestions = ['Explain this code', 'Fix the bug', 'Add comments', 'Optimize'];
</script>

<div class="agent-sidebar" class:open={agent.open}>
	<!-- Toggle Button -->
	<button
		class="toggle-btn"
		onclick={toggleAgent}
		title={agent.open ? 'Close AI Panel' : 'Open AI Panel'}
	>
		{#if agent.open}
			<PanelRightClose class="w-5 h-5" />
		{:else}
			<PanelRightOpen class="w-5 h-5" />
		{/if}
	</button>

	{#if agent.open}
		<div class="agent-panel">
			<!-- Header -->
			<div class="agent-header">
				<div class="header-title">
					<div class="header-icon">
						<Zap class="w-4 h-4" />
					</div>
					<span>AI Assistant</span>
					<span class="header-badge">Beta</span>
				</div>
				<button class="header-close" onclick={toggleAgent}>
					<X class="w-4 h-4" />
				</button>
			</div>

			<!-- Messages -->
			<div class="agent-messages">
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
								<span class="message-role"
									>{message.role === 'assistant' ? 'Assistant' : 'You'}</span
								>
							</div>
							<div class="message-text">{message.content}</div>
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

			<!-- Suggestions -->
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

			<!-- Input -->
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

	/* Toggle Button */
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

	/* Agent Panel */
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

	/* Header */
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
		color: var(--color-primary-500);
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

	/* Messages */
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
		color: var(--color-surface-400);
	}

	.message-text {
		font-size: 12px;
		line-height: 1.5;
		color: var(--color-surface-200);
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

	/* Typing Indicator */
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

	/* Suggestions */
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

	/* Input */
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
		border: 1px solid var(--color-surface-700);
		border-radius: 6px;
		color: var(--color-surface-200);
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
</style>
