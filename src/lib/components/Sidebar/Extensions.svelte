<script lang="ts">
	import { onMount } from 'svelte';
	import { sidebar, config } from '$lib/stores/index.svelte';
	import { themes as themesData, extensions } from '$lib/data/sections/extensions';

	import {
		Puzzle,
		Palette,
		Search,
		Download,
		Check,
		ChevronDown,
		ChevronRight,
		Settings,
		RefreshCw
	} from '@lucide/svelte';

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

	let searchTerm = $state('');
	let activeTab = $state<'installed' | 'themes' | 'extensions'>('installed');
	let expandedSections = $state<Set<string>>(new Set(['installed', 'themes']));

	let themes = $state(themesData);
	let installedThemes = $derived(themes.filter((t) => t.installed));
	let installedExtensions = $derived(extensions.filter((e) => e.installed));

	let filteredThemes = $derived(
		searchTerm.trim() === ''
			? themes
			: themes.filter(
					(t) =>
						t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
						t.author.toLowerCase().includes(searchTerm.toLowerCase())
				)
	);

	let filteredExtensions = $derived(
		searchTerm.trim() === ''
			? extensions
			: extensions.filter(
					(e) =>
						e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
						e.author.toLowerCase().includes(searchTerm.toLowerCase())
				)
	);

	function toggleSection(section: string) {
		const newSet = new Set(expandedSections);
		if (newSet.has(section)) {
			newSet.delete(section);
		} else {
			newSet.add(section);
		}
		expandedSections = newSet;
	}

	function renderStars(rating: number) {
		const fullStars = Math.floor(rating);
		const hasHalf = rating % 1 >= 0.5;
		let stars = '★'.repeat(fullStars);
		if (hasHalf) stars += '½';
		return stars;
	}
</script>

<div class="extensions-panel" style="width: {sidebar.width}px;">
	<!-- Header -->
	<div class="ext-header">
		<div class="header-title">
			<Puzzle class="w-4 h-4" />
			<span>EXTENSIONS</span>
		</div>
		<div class="header-actions">
			<button class="action-btn" title="Refresh">
				<RefreshCw class="w-4 h-4" />
			</button>
			<button class="action-btn" title="Settings">
				<Settings class="w-4 h-4" />
			</button>
		</div>
	</div>

	<!-- Search -->
	<div class="search-section">
		<div class="search-wrapper">
			<Search class="w-4 h-4 search-icon" />
			<input
				type="text"
				bind:value={searchTerm}
				placeholder="Search Extensions in Marketplace"
				class="search-input"
			/>
		</div>
	</div>

	<!-- Tabs -->
	<div class="tabs">
		<button
			class="tab"
			class:active={activeTab === 'installed'}
			onclick={() => (activeTab = 'installed')}
		>
			Installed
			<span class="tab-count">{installedThemes.length + installedExtensions.length}</span>
		</button>
		<button
			class="tab"
			class:active={activeTab === 'themes'}
			onclick={() => (activeTab = 'themes')}
		>
			<Palette class="w-3 h-3" />
			Themes
		</button>
		<button
			class="tab"
			class:active={activeTab === 'extensions'}
			onclick={() => (activeTab = 'extensions')}
		>
			<Puzzle class="w-3 h-3" />
			Extensions
		</button>
	</div>

	<!-- Content -->
	<div class="content">
		{#if activeTab === 'installed'}
			<!-- Installed Themes -->
			<div class="section">
				<button class="section-header" onclick={() => toggleSection('installed-themes')}>
					{#if expandedSections.has('installed-themes')}
						<ChevronDown class="w-4 h-4" />
					{:else}
						<ChevronRight class="w-4 h-4" />
					{/if}
					<Palette class="w-4 h-4 text-purple" />
					<span>Themes</span>
					<span class="section-count">{installedThemes.length}</span>
				</button>
				{#if expandedSections.has('installed-themes')}
					<div class="ext-list">
						{#each installedThemes as theme}
							<div
								key={theme.id}
								class="ext-card"
								class:active={theme.id === config.theme}
								onclick={() => {
									config.theme = theme.id;
								}}
							>
								<div class="ext-icon" style="background: {theme.color};">
									{theme.icon}
								</div>
								<div class="ext-info">
									<div class="ext-name">
										{theme.name}
										{#if theme.active}
											<span class="active-badge">Active</span>
										{/if}
									</div>
									<div class="ext-author">{theme.author}</div>
								</div>
								<button class="ext-action installed">
									<Check class="w-3 h-3" />
								</button>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Installed Extensions -->
			<div class="section">
				<button class="section-header" onclick={() => toggleSection('installed-ext')}>
					{#if expandedSections.has('installed-ext')}
						<ChevronDown class="w-4 h-4" />
					{:else}
						<ChevronRight class="w-4 h-4" />
					{/if}
					<Puzzle class="w-4 h-4 text-blue" />
					<span>Extensions</span>
					<span class="section-count">{installedExtensions.length}</span>
				</button>
				{#if expandedSections.has('installed-ext')}
					<div class="ext-list">
						{#each installedExtensions as ext}
							<div class="ext-card">
								<div class="ext-icon" style="background: {ext.color};">
									{ext.icon}
								</div>
								<div class="ext-info">
									<div class="ext-name">{ext.name}</div>
									<div class="ext-author">{ext.author}</div>
								</div>
								<button class="ext-action installed">
									<Check class="w-3 h-3" />
								</button>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{:else if activeTab === 'themes'}
			<!-- All Themes -->
			<div class="marketplace-header">
				<span>Popular Themes</span>
			</div>
			<div class="ext-list marketplace">
				{#each filteredThemes as theme}
					<div class="ext-card detailed" class:active={theme.id === config.theme}>
						<div class="ext-icon large" style="background: {theme.color};">
							{theme.icon}
						</div>
						<div class="ext-details">
							<div class="ext-name">{theme.name}</div>
							<div class="ext-author">{theme.author}</div>
							<div class="ext-description">{theme.description}</div>
							<div class="ext-meta">
								<span class="rating">
									<span class="stars">{renderStars(theme.rating)}</span>
									{theme.rating}
								</span>
								<span class="downloads">
									<Download class="w-3 h-3" />
									{theme.downloads}
								</span>
							</div>
						</div>
						<button
							class="ext-action"
							class:installed={theme.installed}
							onclick={() => {
								if (!theme.installed) {
									themes = themes.map((t) => (t.id === theme.id ? { ...t, installed: true } : t));
								}
							}}
						>
							{#if theme.installed}
								<Check class="w-4 h-4" />
							{:else}
								Install
							{/if}
						</button>
					</div>
				{/each}
			</div>
		{:else if activeTab === 'extensions'}
			<!-- All Extensions -->
			<div class="marketplace-header">
				<span>Popular Extensions</span>
			</div>
			<div class="ext-list marketplace">
				{#each filteredExtensions as ext}
					<div class="ext-card detailed">
						<div class="ext-icon large" style="background: {ext.color};">
							{ext.icon}
						</div>
						<div class="ext-details">
							<div class="ext-name">{ext.name}</div>
							<div class="ext-author">{ext.author}</div>
							<div class="ext-description">{ext.description}</div>
							<div class="ext-meta">
								<span class="rating">
									<span class="stars">{renderStars(ext.rating)}</span>
									{ext.rating}
								</span>
								<span class="downloads">
									<Download class="w-3 h-3" />
									{ext.downloads}
								</span>
							</div>
						</div>
						<button class="ext-action" class:installed={ext.installed}>
							{#if ext.installed}
								<Check class="w-4 h-4" />
							{:else}
								Install
							{/if}
						</button>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.extensions-panel {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: var(--color-surface-900);
		color: var(--color-primary-500);
		font-size: 12px;
		overflow: hidden;
	}

	.ext-header {
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
		color: var(--color-surface-color-500);
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.action-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		color: #cccccc;
	}

	.search-section {
		padding: 12px;
		border-bottom: 1px solid var(--color-surface-color-800);
	}

	.search-wrapper {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 12px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--color-surface-color-800);
		border-radius: 6px;
		transition: border-color 0.15s ease;
	}

	.search-wrapper:focus-within {
		border-color: #007acc;
	}

	.search-input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		color: var(--color-surface-color-200);
		font-size: 12px;
	}

	.search-input::placeholder {
		color: var(--color-surface-color-50);
	}

	.search-icon {
		color: var(--color-surface-color-200);
		background: var(--color-surface-color-200);
	}

	.tabs {
		display: flex;
		border-bottom: 1px solid var(--color-surface-color-800);
	}

	.tab {
		display: flex;
		align-items: center;
		gap: 4px;
		flex: 1;
		padding: 10px 12px;
		background: transparent;
		border: none;
		border-bottom: 2px solid transparent;
		color: #808080;
		font-size: 11px;
		cursor: pointer;
		transition: all 0.15s ease;
		justify-content: center;
	}

	.tab:hover {
		color: #cccccc;
		background: rgba(255, 255, 255, 0.03);
	}

	.tab.active {
		color: #ffffff;
		border-bottom-color: var(--color-primary-700);
	}

	.tab-count {
		font-size: 10px;
		background: rgba(255, 255, 255, 0.1);
		padding: 1px 6px;
		border-radius: 10px;
	}

	.content {
		flex: 1;
		overflow-y: auto;
	}

	.section {
		border-bottom: 1px solid var(--color-surface-800);
	}

	.section-header {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		padding: 10px 12px;
		background: rgba(255, 255, 255, 0.02);
		border: none;
		color: #cccccc;
		font-size: 11px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.15s ease;
	}

	.section-header:hover {
		background: rgba(255, 255, 255, 0.05);
	}

	.section-count {
		margin-left: auto;
		font-size: 10px;
		color: #808080;
		background: rgba(255, 255, 255, 0.08);
		padding: 2px 8px;
		border-radius: 10px;
	}

	.marketplace-header {
		padding: 10px 12px;
		font-size: 11px;
		font-weight: 600;
		color: var(--color-primary-500);
		background: rgba(255, 255, 255, 0.02);
		border-bottom: 1px solid var(--color-surface-800);
	}

	.ext-list {
		padding: 4px 0;
	}

	.ext-list.marketplace {
		padding: 8px;
	}

	.ext-card {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 12px;
		cursor: pointer;
		transition: background 0.15s ease;
	}

	.ext-card:hover {
		background: rgba(255, 255, 255, 0.05);
	}

	.ext-card.active {
		background: var(--color-primary-700);
		border-left: 2px solid var(--color-primary-700);
	}

	.ext-card.detailed {
		padding: 12px;
		margin-bottom: 8px;
		background: rgba(255, 255, 255, 0.03);
		border-radius: 8px;
		border: 1px solid var(--color-surface-800);
		align-items: flex-start;
	}

	.ext-card.detailed:hover {
		background: rgba(255, 255, 255, 0.06);
		border-color: var(--color-surface-800);
	}

	.ext-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 6px;
		font-size: 16px;
		flex-shrink: 0;
	}

	.ext-icon.large {
		width: 48px;
		height: 48px;
		font-size: 24px;
	}

	.ext-info {
		flex: 1;
		min-width: 0;
	}

	.ext-details {
		flex: 1;
		min-width: 0;
	}

	.ext-name {
		display: flex;
		align-items: center;
		gap: 6px;
		font-weight: 500;
		color: #ffffff;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.active-badge {
		font-size: 9px;
		font-weight: 600;
		color: var(--success-500);
		background: rgba(74, 222, 128, 0.15);
		padding: 2px 6px;
		border-radius: 4px;
	}

	.ext-author {
		font-size: 11px;
		color: var(--color-surface-50);
		margin-top: 2px;
	}

	.ext-description {
		font-size: 11px;
		color: var(--color-surface-300);
		margin-top: 4px;
		line-height: 1.4;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.ext-meta {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-top: 8px;
		font-size: 10px;
		color: var(--color-primary-500);
	}

	.rating,
	.downloads {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.stars {
		color: #f59e0b;
	}

	.ext-action {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 6px 12px;
		background: var(--color-primary-700);
		border: none;
		border-radius: 4px;
		color: #ffffff;
		font-size: 11px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.15s ease;
		flex-shrink: 0;
	}

	.ext-action:hover {
		background: var(--primary-600);
	}

	.ext-action.installed {
		padding: 6px;
		background: var(--success-500);
		color: #4ade80;
	}

	.ext-action.installed:hover {
		background: rgba(239, 68, 68, 0.15);
		color: #ef4444;
	}

	/* Scrollbar */
	.content::-webkit-scrollbar {
		width: 8px;
	}

	.content::-webkit-scrollbar-track {
		background: transparent;
	}

	.content::-webkit-scrollbar-thumb {
		background: #424242;
		border-radius: 4px;
	}

	.content::-webkit-scrollbar-thumb:hover {
		background: #4f4f4f;
	}
</style>
