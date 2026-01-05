<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { file, agent, terminal } from '$lib/stores/index.svelte';
	import Icon from '$lib/components/Icon.svelte';

	let { searchDialogOpen = $bindable() }: { searchDialogOpen: boolean } = $props();

	let commandPalette: HTMLDivElement;
	let searchInput: HTMLInputElement;

	let searchTerm = $state('');
	let selectedIndex = $state(0);

	const commands = [
		{
			label: 'Terminal: Toggle Terminal',
			shortcut: 'Ctrl+`',
			icon: '󰆍',
			action: () => {
				terminal.open = !terminal.open;
				searchDialogOpen = false;
			}
		},
		{
			label: 'View: Toggle AI Chat',
			shortcut: 'Ctrl+Shift+A',
			icon: '󰚩',
			action: () => {
				agent.open = !agent.open;
				searchDialogOpen = false;
			}
		},
		{
			label: 'Help: Contact Ramzy KEMMOUN',
			shortcut: '',
			icon: '󰋖',
			action: () => {
				searchDialogOpen = false;
			}
		}
	];

	const files = [
		{
			name: 'AboutMe.tsx',
			path: 'src/components/',
			icon: 'react',
			action: () => {
				file.section = 'aboutMe';
				searchDialogOpen = false;
			}
		},
		{
			name: 'Projects.tsx',
			path: 'src/components/',
			icon: 'react',
			action: () => {
				file.section = 'projects';
				searchDialogOpen = false;
			}
		},
		{
			name: 'Experiences.tsx',
			path: 'src/components/',
			icon: 'react',
			action: () => {
				file.section = 'experiences';
				searchDialogOpen = false;
			}
		},
		{
			name: 'Skills.tsx',
			path: 'src/components/',
			icon: 'react',
			action: () => {
				file.section = 'skills';
				searchDialogOpen = false;
			}
		},
		{
			name: 'Education.tsx',
			path: 'src/components/',
			icon: 'react',
			action: () => {
				file.section = 'education';
				searchDialogOpen = false;
			}
		},
		{
			name: 'global.css',
			path: 'src/styles/',
			icon: 'css',
			action: () => {
				file.section = 'src/global.css';
				searchDialogOpen = false;
			}
		},
		{
			name: 'package.json',
			icon: 'nodejs',
			path: '',
			action: () => {
				searchDialogOpen = false;
				file.section = 'packageJson';
			}
		},
		{
			name: 'tsconfig.json',
			icon: 'nodejs',
			path: '',
			action: () => {
				searchDialogOpen = false;
				file.section = 'tsconfigJson';
			}
		},
		{
			name: 'README.md',
			icon: 'md',
			path: '',
			action: () => {
				searchDialogOpen = false;
				file.section = 'readme';
			}
		},
		{
			name: 'tailwind.config.js',
			icon: 'js',
			path: '',
			action: () => {
				searchDialogOpen = false;
				file.section = 'tailwindConfig';
			}
		},
		{
			name: 'package-lock.json',
			icon: 'nodejs',
			path: '',
			action: () => {
				searchDialogOpen = false;
				file.section = 'packageLockJson';
			}
		},
		{
			name: '.gitignore',
			icon: 'git',
			path: '',
			action: () => {
				searchDialogOpen = false;
				file.section = 'gitignore';
			}
		},
		{
			name: 'next.config.ts',
			icon: 'nextjs',
			path: '',
			action: () => {
				searchDialogOpen = false;
				file.section = 'nextConfig';
			}
		},
		{
			name: 'postcss.config.mjs',
			icon: 'js',
			path: '',
			action: () => {
				searchDialogOpen = false;
				file.section = 'postcssConfig';
			}
		}
	];

	let filteredCommands = $derived(
		searchTerm.trim() === '' || searchTerm.startsWith('>')
			? commands.filter((cmd) =>
					cmd.label.toLowerCase().includes(searchTerm.replace('>', '').trim().toLowerCase())
				)
			: []
	);

	let filteredFiles = $derived(
		searchTerm.startsWith('>')
			? []
			: searchTerm.trim() === ''
				? files
				: files.filter((f) => f.name.toLowerCase().includes(searchTerm.trim().toLowerCase()))
	);

	let allItems = $derived([...filteredCommands, ...filteredFiles]);

	$effect(() => {
		selectedIndex = 0;
	});

	function handleGlobalEvents(event: KeyboardEvent | MouseEvent) {
		if (!searchDialogOpen) return;

		if (event instanceof KeyboardEvent && event.key === 'Escape') {
			event.preventDefault();
			searchDialogOpen = false;
		}

		if (event instanceof MouseEvent) {
			const target = event.target as Node;
			if (commandPalette && !commandPalette.contains(target) && event.clientY > 30) {
				searchDialogOpen = false;
			}
		}
	}

	onMount(() => {
		if (!browser) return;

		window.addEventListener('keydown', handleGlobalEvents);
		window.addEventListener('click', handleGlobalEvents);

		if (searchInput) {
			searchInput.focus();
		}
	});

	onDestroy(() => {
		if (!browser) return;

		window.removeEventListener('keydown', handleGlobalEvents);
		window.removeEventListener('click', handleGlobalEvents);
	});

	function handleInputKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			searchDialogOpen = false;
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			selectedIndex = Math.min(selectedIndex + 1, allItems.length - 1);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			selectedIndex = Math.max(selectedIndex - 1, 0);
		} else if (event.key === 'Enter' && allItems[selectedIndex]) {
			event.preventDefault();
			allItems[selectedIndex].action();
		}
	}

	function highlightMatch(text: string, query: string): string {
		if (!query.trim()) return text;
		const cleanQuery = query.replace('>', '').trim();
		if (!cleanQuery) return text;
		const regex = new RegExp(`(${cleanQuery})`, 'gi');
		return text.replace(regex, '<mark class="highlight">$1</mark>');
	}
</script>
<div class="search-backdrop" onclick={() => (searchDialogOpen = false)}></div>
<div bind:this={commandPalette} class="command-palette">
	<div class="search-input-wrapper">
		<svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.35-4.35" />
		</svg>
		<input
			bind:this={searchInput}
			bind:value={searchTerm}
			onkeydown={handleInputKeydown}
			type="text"
			placeholder="Search files by name (prefix > for commands)"
			class="search-input"
		/>
		{#if searchTerm}
			<button class="clear-btn" onclick={() => (searchTerm = '')}>
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M18 6L6 18M6 6l12 12" />
				</svg>
			</button>
		{/if}
	</div>
	<div class="results-container">
		{#if filteredCommands.length > 0}
			<div class="section-header">
				<span class="section-icon">⌘</span>
				<span>Commands</span>
			</div>
			{#each filteredCommands as command, i}
				{@const globalIndex = i}
				<div
					role="button"
					tabindex="0"
					aria-label={command.label}
					class="result-item"
					class:selected={selectedIndex === globalIndex}
					onclick={command.action}
					onmouseenter={() => (selectedIndex = globalIndex)}
				>
					<span class="item-icon command-icon">{command.icon}</span>
					<span class="item-label">{@html highlightMatch(command.label, searchTerm)}</span>
					{#if command.shortcut}
						<span class="shortcut">{command.shortcut}</span>
					{/if}
				</div>
			{/each}
		{/if}
		{#if filteredFiles.length > 0}
			<div class="section-header">
				<span class="section-icon">📁</span>
				<span>Files</span>
			</div>
			{#each filteredFiles as fileItem, i}
				{@const globalIndex = filteredCommands.length + i}
				<div
					role="button"
					tabindex="0"
					aria-label={fileItem.name}
					class="result-item file-item"
					class:selected={selectedIndex === globalIndex}
					onclick={fileItem.action}
					onmouseenter={() => (selectedIndex = globalIndex)}
				>
					<span class="item-icon file-icon">
						<Icon icon={fileItem.icon} />
					</span>
					<span class="item-label">{@html highlightMatch(fileItem.name, searchTerm)}</span>
					<span class="file-path">{fileItem.path}</span>
				</div>
			{/each}
		{/if}
		{#if allItems.length === 0}
			<div class="no-results">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<path
						d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span>No results found for "{searchTerm}"</span>
			</div>
		{/if}
	</div>
	<div class="palette-footer">
		<div class="footer-hint">
			<kbd>↑↓</kbd> navigate
		</div>
		<div class="footer-hint">
			<kbd>↵</kbd> select
		</div>
		<div class="footer-hint">
			<kbd>esc</kbd> close
		</div>
	</div>
</div>

<style>
	.search-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
		z-index: 100;
		animation: fadeIn 0.15s ease-out;
	}

	.command-palette {
		position: fixed;
		top: 15%;
		left: 50%;
		transform: translateX(-50%);
		width: 90%;
		max-width: 600px;
		background: linear-gradient(180deg, var(--color-surface-800) 0%, var(--color-surface-900) 100%);
		border: 1px solid var(--color-surface-700);
		border-radius: 8px;
		box-shadow:
			0 0 0 1px var(--color-surface-800),
			0 25px 50px -12px rgba(0, 0, 0, 0.6),
			0 0 80px rgba(0, 120, 215, 0.1);
		z-index: 101;
		overflow: hidden;
		animation: slideDown 0.2s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateX(-50%) translateY(-20px);
		}
		to {
			opacity: 1;
			transform: translateX(-50%) translateY(0);
		}
	}

	.search-input-wrapper {
		display: flex;
		align-items: center;
		padding: 12px 16px;
		gap: 12px;
		border-bottom: 1px solid var(--color-surface-700);
		background: var(--color-surface-800);
	}

	.search-icon {
		width: 18px;
		height: 18px;
		color: var(--color-surface-500);
		flex-shrink: 0;
	}

	.search-input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		color: var(--color-surface-200);
		font-size: 14px;
		font-family: 'Segoe UI', system-ui, sans-serif;
	}

	.search-input::placeholder {
		color: var(--color-surface-400);
	}

	.clear-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		background: transparent;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		color: var(--color-surface-500);
		transition: all 0.15s ease;
	}

	.clear-btn:hover {
		background: var(--color-surface-700);
		color: var(--color-surface-200);
	}

	.clear-btn svg {
		width: 14px;
		height: 14px;
	}

	.results-container {
		max-height: 400px;
		overflow-y: auto;
		padding: 6px;
	}

	.results-container::-webkit-scrollbar {
		width: 8px;
	}

	.results-container::-webkit-scrollbar-track {
		background: transparent;
	}

	.results-container::-webkit-scrollbar-thumb {
		background: var(--color-surface-700);
		border-radius: 4px;
	}

	.results-container::-webkit-scrollbar-thumb:hover {
		background: var(--color-surface-600);
	}

	.section-header {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 12px 6px;
		font-size: 11px;
		font-weight: 600;
		color: var(--color-surface-500);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.section-icon {
		font-size: 10px;
	}

	.result-item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 12px;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.1s ease;
	}

	.result-item:hover,
	.result-item.selected {
		background: var(--color-surface-700);
	}

	.result-item.selected {
		background: var(--color-surface-600);
		box-shadow: inset 0 0 0 1px var(--color-primary-500);
	}

	.item-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		flex-shrink: 0;
		font-size: 14px;
	}

	.command-icon {
		color: var(--color-primary-400);
	}

	.file-icon {
		color: var(--color-surface-200);
	}

	.item-label {
		flex: 1;
		font-size: 13px;
		color: var(--color-primary-200);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.item-label :global(.highlight) {
		background: var(--color-warning-500);
		color: var(--color-surface-900);
		border-radius: 2px;
		padding: 0 2px;
	}

	.shortcut {
		font-size: 11px;
		color: var(--color-surface-400);
		background: var(--color-surface-800);
		padding: 3px 6px;
		border-radius: 4px;
		border: 1px solid var(--color-surface-700);
		font-family: 'SF Mono', 'Consolas', monospace;
	}

	.file-path {
		font-size: 11px;
		color: var(--color-surface-400);
		white-space: nowrap;
	}

	.no-results {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 12px;
		padding: 40px 20px;
		color: var(--color-surface-400);
		font-size: 13px;
	}

	.no-results svg {
		width: 32px;
		height: 32px;
		opacity: 0.5;
	}

	.palette-footer {
		display: flex;
		justify-content: center;
		gap: 20px;
		padding: 10px 16px;
		background: rgba(0, 0, 0, 0.2);
		border-top: 1px solid var(--color-surface-700);
	}

	.footer-hint {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 11px;
		color: var(--color-surface-400);
	}

	.footer-hint kbd {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 20px;
		height: 18px;
		padding: 0 5px;
		background: var(--color-surface-800);
		border: 1px solid var(--color-surface-700);
		border-radius: 3px;
		font-size: 10px;
		font-family: 'SF Mono', 'Consolas', monospace;
		color: var(--color-surface-500);
	}
</style>
