<script lang="ts">
	import { onMount } from 'svelte';
	import { sidebar, file } from '$lib/stores/index.svelte';
	import {
		Search,
		Replace,
		ChevronDown,
		ChevronRight,
		FileCode,
		CaseSensitive,
		WholeWord,
		Regex,
		Filter,
		RefreshCw,
		X
	} from '@lucide/svelte';
	import Icon from '../Icon.svelte';

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

	// State
	let searchTerm = $state('');
	let replaceTerm = $state('');
	let showReplace = $state(false);
	let caseSensitive = $state(false);
	let wholeWord = $state(false);
	let useRegex = $state(false);
	let showFilters = $state(false);
	let includeFiles = $state('');
	let excludeFiles = $state('');
	let expandedFiles = $state<Set<string>>(new Set(['AboutMe.tsx', 'Projects.tsx']));

	// Mock search results
	const allResults = [
		{
			fileName: 'AboutMe.tsx',
			filePath: 'src/components/',
			icon: 'react',
			section: 'aboutMe',
			matches: [
				{ line: 12, content: 'const AboutMe = () => {', match: 'About' },
				{ line: 24, content: '  return <div className="about-section">', match: 'about' },
				{ line: 45, content: '    <h1>About Me</h1>', match: 'About' }
			]
		},
		{
			fileName: 'Projects.tsx',
			filePath: 'src/components/',
			icon: 'react',
			section: 'projects',
			matches: [
				{ line: 8, content: 'interface Project {', match: 'Project' },
				{ line: 34, content: '  const projects: Project[] = [', match: 'projects' }
			]
		},
		{
			fileName: 'Skills.tsx',
			filePath: 'src/components/',
			icon: 'react',
			section: 'skills',
			matches: [
				{ line: 15, content: '  const skillCategories = [', match: 'skill' },
				{ line: 67, content: '    <SkillBar level={skill.level} />', match: 'skill' },
				{ line: 89, content: '  // Animate skills on scroll', match: 'skills' }
			]
		},
		{
			fileName: 'Experiences.tsx',
			filePath: 'src/components/',
			icon: 'react',
			section: 'experiences',
			matches: [{ line: 22, content: 'const experiences = [', match: 'experience' }]
		},
		{
			fileName: 'global.css',
			filePath: 'src/styles/',
			icon: 'css',
			section: null,
			matches: [
				{ line: 45, content: '.about-section {', match: 'about' },
				{ line: 112, content: '  /* About page styles */', match: 'About' }
			]
		}
	];

	let searchResults = $derived(
		searchTerm.trim() === ''
			? []
			: allResults.filter(
					(result) =>
						result.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
						result.matches.some((m) => m.content.toLowerCase().includes(searchTerm.toLowerCase()))
				)
	);

	let totalMatches = $derived(searchResults.reduce((acc, file) => acc + file.matches.length, 0));

	function toggleFile(fileName: string) {
		const newSet = new Set(expandedFiles);
		if (newSet.has(fileName)) {
			newSet.delete(fileName);
		} else {
			newSet.add(fileName);
		}
		expandedFiles = newSet;
	}

	function goToFile(section: string | null) {
		if (section) {
			file.section = section;
			file.view = 'code';
		}
	}

	function highlightMatch(content: string, term: string): string {
		if (!term.trim()) return content;
		const regex = new RegExp(`(${term})`, 'gi');
		return content.replace(regex, '<mark class="highlight">$1</mark>');
	}
</script>

<div class="search-panel" style="width: {sidebar.width}px;">
	<!-- Header -->
	<div class="search-header">
		<div class="header-title">
			<Search class="w-4 h-4" />
			<span>SEARCH</span>
		</div>
		<div class="header-actions">
			<button class="action-btn" title="Refresh" onclick={() => (searchTerm = searchTerm)}>
				<RefreshCw class="w-4 h-4" />
			</button>
			<button
				class="action-btn"
				title="Clear"
				onclick={() => {
					searchTerm = '';
					replaceTerm = '';
				}}
			>
				<X class="w-4 h-4" />
			</button>
		</div>
	</div>

	<!-- Search Input Section -->
	<div class="search-inputs">
		<!-- Search Row -->
		<div class="input-row">
			<button class="toggle-replace" onclick={() => (showReplace = !showReplace)}>
				{#if showReplace}
					<ChevronDown class="w-4 h-4" />
				{:else}
					<ChevronRight class="w-4 h-4" />
				{/if}
			</button>
			<div class="input-wrapper">
				<input type="text" bind:value={searchTerm} placeholder="Search" class="search-input" />
				<div class="input-actions">
					<button
						class="filter-btn"
						class:active={caseSensitive}
						title="Match Case"
						onclick={() => (caseSensitive = !caseSensitive)}
					>
						<CaseSensitive class="w-4 h-4" />
					</button>
					<button
						class="filter-btn"
						class:active={wholeWord}
						title="Match Whole Word"
						onclick={() => (wholeWord = !wholeWord)}
					>
						<WholeWord class="w-4 h-4" />
					</button>
					<button
						class="filter-btn"
						class:active={useRegex}
						title="Use Regular Expression"
						onclick={() => (useRegex = !useRegex)}
					>
						<Regex class="w-4 h-4" />
					</button>
				</div>
			</div>
		</div>

		<!-- Replace Row -->
		{#if showReplace}
			<div class="input-row replace-row">
				<div class="spacer"></div>
				<div class="input-wrapper">
					<input type="text" bind:value={replaceTerm} placeholder="Replace" class="search-input" />
					<div class="input-actions">
						<button class="replace-btn" title="Replace">
							<Replace class="w-4 h-4" />
						</button>
						<button class="replace-btn" title="Replace All">
							<span class="replace-all-icon">⟳</span>
						</button>
					</div>
				</div>
			</div>
		{/if}

		<!-- Files Filter Toggle -->
		<button class="filter-toggle" onclick={() => (showFilters = !showFilters)}>
			<Filter class="w-3 h-3" />
			<span>files to include/exclude</span>
			{#if showFilters}
				<ChevronDown class="w-3 h-3" />
			{:else}
				<ChevronRight class="w-3 h-3" />
			{/if}
		</button>

		<!-- File Filters -->
		{#if showFilters}
			<div class="file-filters">
				<input
					type="text"
					bind:value={includeFiles}
					placeholder="files to include (e.g. *.tsx, src/**)"
					class="filter-input"
				/>
				<input
					type="text"
					bind:value={excludeFiles}
					placeholder="files to exclude (e.g. node_modules)"
					class="filter-input"
				/>
			</div>
		{/if}
	</div>

	<!-- Results Section -->
	<div class="results-section">
		{#if searchTerm.trim() === ''}
			<div class="no-search">
				<Search class="w-8 h-8" />
				<span>Type to search in files</span>
				<span class="hint">Use Ctrl+Shift+F for quick access</span>
			</div>
		{:else if searchResults.length === 0}
			<div class="no-results">
				<span>No results found for "{searchTerm}"</span>
			</div>
		{:else}
			<!-- Results Header -->
			<div class="results-header">
				<span>{totalMatches} results in {searchResults.length} files</span>
			</div>

			<!-- Results List -->
			<div class="results-list">
				{#each searchResults as result}
					<div class="result-file">
						<!-- File Header -->
						<button class="file-header" onclick={() => toggleFile(result.fileName)}>
							{#if expandedFiles.has(result.fileName)}
								<ChevronDown class="w-4 h-4 chevron" />
							{:else}
								<ChevronRight class="w-4 h-4 chevron" />
							{/if}
							<Icon icon={result.icon} size={16} />
							<span class="file-name">{result.fileName}</span>
							<span class="file-path">{result.filePath}</span>
							<span class="match-count">{result.matches.length}</span>
						</button>

						<!-- File Matches -->
						{#if expandedFiles.has(result.fileName)}
							<div class="file-matches">
								{#each result.matches as match}
									<button class="match-item" onclick={() => goToFile(result.section)}>
										<span class="line-number">{match.line}</span>
										<span class="match-content"
											>{@html highlightMatch(match.content, searchTerm)}</span
										>
									</button>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.search-panel {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: var(--color-surface-900);
		color: var(--color-surface-200);
		font-size: 12px;
		overflow: hidden;
	}

	.search-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 16px;
		border-bottom: 1px solid var(--color-surface-800);
		background: rgba(255, 255, 255, 0.02);
	}

	.header-title {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: var(--color-primary-500);
	}

	.header-actions {
		display: flex;
		gap: 4px;
	}

	.action-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 26px;
		height: 26px;
		background: transparent;
		border: none;
		border-radius: 4px;
		color: var(--color-surface-500);
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.action-btn:hover {
		background: var(--color-surface-800);
		color: var(--color-surface-200);
	}

	.search-inputs {
		padding: 12px;
		border-bottom: 1px solid var(--color-surface-800);
	}

	.input-row {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-bottom: 8px;
	}

	.replace-row {
		margin-top: 8px;
	}

	.toggle-replace {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		background: transparent;
		border: none;
		color: var(--color-surface-500);
		cursor: pointer;
		flex-shrink: 0;
	}

	.toggle-replace:hover {
		color: var(--color-surface-200);
	}

	.spacer {
		width: 20px;
		flex-shrink: 0;
	}

	.input-wrapper {
		flex: 1;
		display: flex;
		align-items: center;
		background: var(--color-surface-800);
		border: 1px solid var(--color-surface-700);
		border-radius: 4px;
		overflow: hidden;
		transition: border-color 0.15s ease;
	}

	.input-wrapper:focus-within {
		border-color: var(--color-primary-500);
		box-shadow: 0 0 0 1px var(--color-primary-500);
	}

	.search-input {
		flex: 1;
		padding: 8px 10px;
		background: transparent;
		border: none;
		outline: none;
		color: var(--color-surface-200);
		font-size: 12px;
	}

	.search-input::placeholder {
		color: var(--color-surface-400);
	}

	.input-actions {
		display: flex;
		padding: 0 4px;
	}

	.filter-btn,
	.replace-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		background: transparent;
		border: none;
		border-radius: 3px;
		color: var(--color-surface-400);
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.filter-btn:hover,
	.replace-btn:hover {
		background: var(--color-surface-700);
		color: var(--color-surface-200);
	}

	.filter-btn.active {
		background: var(--color-primary-500);
		color: var(--color-surface-50);
	}

	.replace-all-icon {
		font-size: 14px;
	}

	.filter-toggle {
		display: flex;
		align-items: center;
		gap: 6px;
		width: 100%;
		padding: 6px 8px;
		margin-top: 4px;
		background: transparent;
		border: none;
		border-radius: 4px;
		color: var(--color-surface-400);
		font-size: 11px;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.filter-toggle:hover {
		background: var(--color-surface-800);
		color: var(--color-surface-200);
	}

	.file-filters {
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin-top: 8px;
		padding-left: 26px;
	}

	.filter-input {
		padding: 6px 10px;
		background: var(--color-surface-800);
		border: 1px solid var(--color-surface-700);
		border-radius: 4px;
		color: var(--color-surface-200);
		font-size: 11px;
		outline: none;
		transition: border-color 0.15s ease;
	}

	.filter-input:focus {
		border-color: var(--color-primary-500);
	}

	.filter-input::placeholder {
		color: var(--color-surface-500);
	}

	.results-section {
		flex: 1;
		overflow-y: auto;
	}

	.no-search,
	.no-results {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 12px;
		padding: 40px 20px;
		color: var(--color-surface-400);
		text-align: center;
	}

	.no-search .hint {
		font-size: 10px;
		color: var(--color-surface-500);
	}

	.results-header {
		padding: 8px 12px;
		font-size: 11px;
		color: var(--color-surface-500);
		background: rgba(255, 255, 255, 0.02);
		border-bottom: 1px solid var(--color-surface-800);
	}

	.results-list {
		padding: 4px 0;
	}

	.result-file {
		border-bottom: 1px solid var(--color-surface-800);
	}

	.file-header {
		display: flex;
		align-items: center;
		gap: 6px;
		width: 100%;
		padding: 6px 8px;
		background: transparent;
		border: none;
		color: var(--color-surface-200);
		font-size: 12px;
		cursor: pointer;
		transition: background 0.15s ease;
	}

	.file-header:hover {
		background: var(--color-surface-800);
	}

	.file-header .chevron {
		color: var(--color-surface-500);
		flex-shrink: 0;
	}

	.file-name {
		font-weight: 500;
	}

	.file-path {
		flex: 1;
		color: var(--color-surface-400);
		font-size: 11px;
		text-align: left;
	}

	.match-count {
		font-size: 10px;
		background: var(--color-surface-800);
		padding: 2px 6px;
		border-radius: 10px;
		color: var(--color-surface-500);
	}

	.file-matches {
		padding-left: 32px;
	}

	.match-item {
		display: flex;
		align-items: flex-start;
		gap: 8px;
		width: 100%;
		padding: 4px 8px;
		background: transparent;
		border: none;
		color: var(--color-surface-200);
		font-size: 12px;
		text-align: left;
		cursor: pointer;
		transition: background 0.15s ease;
	}

	.match-item:hover {
		background: var(--color-surface-800);
	}

	.line-number {
		flex-shrink: 0;
		min-width: 32px;
		color: var(--color-surface-400);
		font-family: 'SF Mono', 'Consolas', monospace;
		font-size: 11px;
	}

	.match-content {
		flex: 1;
		font-family: 'SF Mono', 'Consolas', monospace;
		font-size: 11px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.match-content :global(.highlight) {
		background: var(--color-warning-500);
		color: var(--color-surface-900);
		border-radius: 2px;
		padding: 0 2px;
	}

	.results-section::-webkit-scrollbar {
		width: 8px;
	}

	.results-section::-webkit-scrollbar-track {
		background: transparent;
	}

	.results-section::-webkit-scrollbar-thumb {
		background: var(--color-surface-700);
		border-radius: 4px;
	}

	.results-section::-webkit-scrollbar-thumb:hover {
		background: var(--color-surface-600);
	}
</style>
