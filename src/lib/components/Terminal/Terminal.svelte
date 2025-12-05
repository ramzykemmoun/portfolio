<script lang="ts">
	import { onMount } from 'svelte';
	import {
		X,
		Plus,
		ChevronDown,
		Trash2,
		SplitSquareVertical,
		Maximize2,
		Terminal as TerminalIcon,
		ChevronUp
	} from '@lucide/svelte';

	interface Props {
		onclose?: () => void;
	}

	let { onclose }: Props = $props();

	interface TerminalLine {
		type: 'input' | 'output' | 'error' | 'success';
		content: string;
		timestamp: Date;
	}

	let isOpen = $state(true);
	let isMaximized = $state(false);
	let currentInput = $state('');
	let history = $state<TerminalLine[]>([
		{ type: 'output', content: "Welcome to Ramzy's Portfolio Terminal!", timestamp: new Date() },
		{ type: 'output', content: 'Type "help" for available commands.', timestamp: new Date() },
		{ type: 'output', content: '', timestamp: new Date() }
	]);
	let commandHistory = $state<string[]>([]);
	let historyIndex = $state(-1);
	let inputRef: HTMLInputElement;
	let terminalRef: HTMLButtonElement;

	const commands: Record<string, () => string[]> = {
		help: () => [
			'Available commands:',
			'  help      - Show this help message',
			'  about     - About Ramzy KEMMOUN',
			'  skills    - List technical skills',
			'  contact   - Contact information',
			'  projects  - View projects',
			'  clear     - Clear terminal',
			'  date      - Show current date',
			'  whoami    - Display user info',
			''
		],
		about: () => [
			'╔══════════════════════════════════════╗',
			'║       RAMZY KEMMOUN                  ║',
			'║       Full-Stack Developer           ║',
			'╚══════════════════════════════════════╝',
			'',
			'Passionate developer specializing in',
			'modern web technologies and cloud.',
			''
		],
		skills: () => [
			'Technical Skills:',
			'├── Languages: TypeScript, Python, Go, Rust',
			'├── Frontend: Svelte, React, Vue',
			'├── Backend: Node.js, FastAPI, NestJS',
			'├── Database: PostgreSQL, MongoDB, Redis',
			'└── DevOps: Docker, Kubernetes, AWS',
			''
		],
		contact: () => [
			'Contact Information:',
			'📧 Email: contact@ramzy.dev',
			'🔗 GitHub: github.com/ramzykemmoun',
			'💼 LinkedIn: linkedin.com/in/ramzykemmoun',
			''
		],
		projects: () => [
			'Featured Projects:',
			'1. Neural Commerce - AI e-commerce platform',
			'2. CryptoVault - Secure crypto wallet',
			'3. CloudSync Pro - Enterprise file sync',
			'',
			'Visit the Projects section for more details.',
			''
		],
		clear: () => {
			history = [];
			return [];
		},
		date: () => [new Date().toLocaleString(), ''],
		whoami: () => ['visitor@ramzy-portfolio', '']
	};

	const executeCommand = (cmd: string) => {
		const trimmedCmd = cmd.trim().toLowerCase();

		if (trimmedCmd) {
			commandHistory = [...commandHistory, cmd];
			historyIndex = commandHistory.length;
		}

		history = [...history, { type: 'input', content: `$ ${cmd}`, timestamp: new Date() }];

		if (trimmedCmd === '') {
			// Empty
		} else if (commands[trimmedCmd]) {
			const output = commands[trimmedCmd]();
			output.forEach((line) => {
				history = [...history, { type: 'output', content: line, timestamp: new Date() }];
			});
		} else {
			history = [
				...history,
				{
					type: 'error',
					content: `Command not found: ${trimmedCmd}. Type "help" for available commands.`,
					timestamp: new Date()
				}
			];
		}

		currentInput = '';
		scrollToBottom();
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			executeCommand(currentInput);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (historyIndex > 0) {
				historyIndex--;
				currentInput = commandHistory[historyIndex] || '';
			}
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (historyIndex < commandHistory.length - 1) {
				historyIndex++;
				currentInput = commandHistory[historyIndex] || '';
			} else {
				historyIndex = commandHistory.length;
				currentInput = '';
			}
		} else if (e.key === 'l' && e.ctrlKey) {
			e.preventDefault();
			commands.clear();
		}
	};

	const scrollToBottom = () => {
		setTimeout(() => {
			if (terminalRef) {
				terminalRef.scrollTop = terminalRef.scrollHeight;
			}
		}, 10);
	};

	const focusInput = () => {
		inputRef?.focus();
	};

	onMount(() => {
		focusInput();
	});
</script>

<div class="terminal-container">
	<!-- Terminal Header -->
	<div class="terminal-header">
		<div class="header-tabs">
			<button class="tab active">
				<TerminalIcon class="w-3 h-3" />
				<span>bash</span>
				<X class="tab-close w-3 h-3" />
			</button>
			<button class="tab-add" title="New Terminal">
				<Plus class="w-4 h-4" />
			</button>
		</div>

		<div class="header-actions">
			<button class="action-btn" title="Split Terminal">
				<SplitSquareVertical class="w-4 h-4" />
			</button>
			<button class="action-btn" title="Clear" onclick={() => commands.clear()}>
				<Trash2 class="w-4 h-4" />
			</button>
			<button class="action-btn" title="Maximize" onclick={() => (isMaximized = !isMaximized)}>
				<Maximize2 class="w-4 h-4" />
			</button>
			<button class="action-btn close" title="Close" onclick={() => onclose?.()}>
				<X class="w-4 h-4" />
			</button>
		</div>
	</div>

	<button
		class="terminal-body"
		bind:this={terminalRef}
		onclick={focusInput}
		role="textbox"
		tabindex="0"
	>
		{#each history as line}
			<div class="terminal-line {line.type}">
				{#if line.type === 'input'}
					<span class="prompt">➜</span>
					<span class="path">~/portfolio</span>
				{/if}
				<span class="content">{line.content}</span>
			</div>
		{/each}

		<div class="terminal-line input current">
			<span class="prompt">➜</span>
			<span class="path">~/portfolio</span>
			<span class="dollar">$</span>
			<input
				bind:this={inputRef}
				bind:value={currentInput}
				onkeydown={handleKeydown}
				type="text"
				class="terminal-input"
				spellcheck="false"
				autocomplete="off"
			/>
		</div>
	</button>
</div>

<style>
	.terminal-container {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 0;
		background: #1e1e1e;
		font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
		font-size: 13px;
	}

	/* Header */
	.terminal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 35px;
		min-height: 35px;
		padding: 0 8px;
		background: #252526;
		border-bottom: 1px solid #1e1e1e;
		flex-shrink: 0;
	}

	.header-tabs {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.tab {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 4px 10px;
		background: #1e1e1e;
		border: none;
		border-radius: 4px 4px 0 0;
		color: #cccccc;
		font-size: 12px;
		cursor: pointer;
	}

	.tab.active {
		color: white;
	}

	.tab-close {
		opacity: 0;
		transition: opacity 0.1s ease;
	}

	.tab-add {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		background: transparent;
		border: none;
		border-radius: 4px;
		color: #858585;
		cursor: pointer;
	}

	.tab-add:hover {
		background: rgba(255, 255, 255, 0.1);
		color: white;
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: 2px;
	}

	.action-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		background: transparent;
		border: none;
		border-radius: 4px;
		color: #858585;
		cursor: pointer;
	}

	.action-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		color: white;
	}

	.action-btn.close:hover {
		background: rgba(255, 0, 0, 0.2);
		color: #ff6b6b;
	}

	/* Terminal Body */
	.terminal-body {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		overflow-x: hidden;
		padding: 8px 12px;
		background: #1e1e1e;
		cursor: text;
	}

	.terminal-body::-webkit-scrollbar {
		width: 8px;
	}

	.terminal-body::-webkit-scrollbar-thumb {
		background: #424242;
		border-radius: 4px;
	}

	/* Terminal Lines */
	.terminal-line {
		display: flex;
		align-items: center;
		gap: 8px;
		min-height: 20px;
		line-height: 1.5;
	}

	.terminal-line.output {
		color: #cccccc;
	}
	.terminal-line.error {
		color: #f14c4c;
	}
	.terminal-line.success {
		color: #4ec9b0;
	}
	.terminal-line.input {
		color: #cccccc;
	}

	.prompt {
		color: #4ec9b0;
		font-weight: bold;
	}
	.path {
		color: #569cd6;
	}
	.dollar {
		color: #dcdcaa;
	}
	.content {
		white-space: pre-wrap;
		word-break: break-word;
	}

	/* Input */
	.terminal-input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		color: #cccccc;
		font-family: inherit;
		font-size: inherit;
		caret-color: #ffffff;
	}

	.terminal-input::selection {
		background: #264f78;
	}
</style>
