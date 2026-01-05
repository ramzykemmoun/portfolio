<script lang="ts">
	import { onMount } from 'svelte';
	import {
		X,
		Plus,
		ChevronDown,
		Trash2,
		Split,
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
			'  help       - Show this help message',
			'  about      - About Ramzy KEMMOUN',
			'  skills     - List technical skills',
			'  contact    - Contact information',
			'  projects   - View projects',
			'  experience - Work experience',
			'  education  - Education background',
			'  clear      - Clear terminal',
			'  date       - Show current date',
			'  whoami     - Display user info',
			'  ls         - List portfolio sections',
			''
		],
		about: () => [
			'╔══════════════════════════════════════════════════╗',
			'║           RAMZY KEMMOUN                          ║',
			'║           Full-Stack Developer                   ║',
			'║           Bouzareah, Algiers, Algeria            ║',
			'╚══════════════════════════════════════════════════╝',
			'',
			'> Passionate developer who turns coffee into code.',
			'> Building the future, one commit at a time.',
			'> "First, solve the problem. Then, write the code."',
			'',
			'Stats:',
			'  ├── Years Coding: 5+',
			'  ├── Projects Built: 30+',
			'  ├── Coffee Consumed: ∞',
			'  └── Bugs Fixed: 9999',
			'',
			'Interests: Contribution, OpenSource, Dev, AI, History',
			''
		],
		skills: () => [
			'Technical Skills:',
			'├── Languages',
			'│   └── TypeScript, Python, JavaScript, Go, Java',
			'├── Frontend',
			'│   └── Svelte, React, Next.js, Vue, Tailwind',
			'├── Backend',
			'│   └── Node.js, NestJS, Express, FastAPI, Flask',
			'├── Database',
			'│   └── PostgreSQL, MongoDB, Redis, Prisma',
			'├── AI/ML',
			'│   └── TensorFlow, LangChain, Computer Vision, LLMs',
			'└── DevOps',
			'    └── Docker, AWS, Git, CI/CD',
			''
		],
		contact: () => [
			'Contact Information:',
			'',
			'📧 Email:    kemmounramzy93@gmail.com',
			'🔗 GitHub:   github.com/ramzykemmoun',
			'💼 LinkedIn: linkedin.com/in/ramzy-kemmoun-1a3725237',
			'📸 Instagram: instagram.com/ramzy.coding',
			'',
			'Type "contact" in sidebar to send a message!',
			''
		],
		projects: () => [
			'Featured Projects:',
			'',
			'1. PointageVDC',
			'   └── Employee timetracking and attendance platform',
			'   └── [React, Tailwind, Nest.js, PostgreSQL]',
			'',
			'2. Nightbyte Website',
			'   └── Responsive landing page for an agency',
			'   └── [SaaS, Design System, Web]',
			'',
			'3. Mohandisson - JobPlatform',
			'   └── Job/freelance platform for companies',
			'   └── [React, Node.js, E-Payment]',
			'',
			'4. Tibiane',
			'   └── Encyclopedia of Algerian logos',
			'   └── [Next.js, Tailwind, Design]',
			'',
			'5. Zappicon - Icon Library',
			'   └── Smart searchable icon platform',
			'   └── [Next.js, Animation, UI/UX]',
			'',
			'6. MyWkfl - Workflow Automation',
			'   └── Automates social posts, email, content',
			'   └── [AI, Automation, LLMs]',
			'',
			'7. Geni OCR',
			'   └── Identity extraction from scanned docs',
			'   └── [Python, Agentic AI, Computer Vision]',
			'',
			'Visit Projects section for more details!',
			''
		],
		experience: () => [
			'Work Experience:',
			'',
			'🟢 Front-End Developer @ Mizaniya Pay (Sep 2025 - Present)',
			'   └── Fintech web applications with React.js',
			'',
			'🔵 Back-end Developer @ SlickPay (Apr 2025 - May 2025)',
			'   └── Scalable Node.js APIs with WebSocket/WebRTC',
			'',
			'🟣 AI Intern @ Zad AI (Nov 2024 - Jul 2025)',
			'   └── Multimodal AI for defect detection',
			'',
			'🟡 Fullstack JS Instructor @ Code213 (Feb 2024 - May 2025)',
			'   └── Project-based web dev bootcamps',
			'',
			'🟠 Instructor @ Hsoub Academy (Aug 2023 - Sep 2024)',
			'   └── TypeScript and real-time apps courses',
			'',
			'⚪ Freelance Developer (2023 - Present)',
			'   └── Fullstack: React, Next.js, Node.js, Python',
			''
		],
		education: () => [
			'Education:',
			'',
			'🎓 Master in Computer Vision (2023-2025)',
			'   USTHB - Algiers, Algeria',
			'   └── Deep Learning, Image Processing, Generative AI',
			'   └── Thesis: Automatic Defect Inspection in Plastic',
			'',
			'📜 Bachelor in Computer Science (2020-2023)',
			'   USTHB - Algiers, Algeria',
			'   └── Algorithms, OOP, Databases, Networks',
			'   └── Thesis: Generation of Artistic Images in Web App',
			'',
			'📚 Baccalaureate - Electrical Engineering (2017-2020)',
			'   Ahmed Chetibi High School - Algiers',
			'   └── Grade: 15.42/20',
			''
		],
		ls: () => [
			'Portfolio Sections:',
			'├── AboutMe.tsx',
			'├── Education.tsx',
			'├── Experiences.tsx',
			'├── Projects.tsx',
			'├── Skills.tsx',
			'├── Testimonials.tsx',
			'└── Contact.tsx',
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
				<Split class="w-4 h-4" />
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
		background: var(--color-surface-900);
		font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
		font-size: 13px;
	}

	.terminal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 35px;
		min-height: 35px;
		padding: 0 8px;
		background: var(--color-surface-800);
		border-bottom: 1px solid var(--color-surface-900);
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
		background: var(--color-primary-900);
		border: none;
		border-radius: 4px 4px 0 0;
		color: var(--color-primary-200);
		font-size: 12px;
		cursor: pointer;
	}

	.tab.active {
		color: var(--color-surface-50);
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
		color: var(--color-surface-400);
		cursor: pointer;
	}

	.tab-add:hover {
		background: var(--color-surface-700);
		color: var(--color-surface-50);
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
		color: var(--color-primary-400);
		cursor: pointer;
	}

	.action-btn:hover {
		background: var(--color-primary-700);
		color: var(--color-surface-50);
	}

	.action-btn.close:hover {
		background: var(--color-error-500);
		color: white;
	}

	.terminal-body {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		overflow-x: hidden;
		padding: 8px 12px;
		background: var(--color-surface-900);
		cursor: text;
	}

	.terminal-body::-webkit-scrollbar {
		width: 8px;
	}

	.terminal-body::-webkit-scrollbar-thumb {
		background: var(--color-surface-700);
		border-radius: 4px;
	}

	.terminal-line {
		display: flex;
		align-items: center;
		gap: 8px;
		min-height: 20px;
		line-height: 1.5;
	}

	.terminal-line.output {
		color: white;
	}
	.terminal-line.error {
		color: red;
	}
	.terminal-line.success {
		color: green;
	}
	.terminal-line.input {
		color: white;
	}

	.prompt {
		color: green;
		font-weight: bold;
	}
	.path {
		color: white;
	}
	.dollar {
		color: green;
	}
	.content {
		white-space: pre-wrap;
		word-break: break-word;
	}

	.terminal-input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		color: white;
		font-family: inherit;
		font-size: inherit;
		caret-color: var(--color-secondary-500);
	}

	.terminal-input::selection {
		background: var(--color-primary-700);
	}
</style>
