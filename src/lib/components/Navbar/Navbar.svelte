<script lang="ts">
	import {
		Menu,
		Minus,
		Square,
		X,
		Search,
		Play,
		Bug,
		GitBranch,
		Cloud,
		Bell,
		Settings,
		ChevronDown
	} from '@lucide/svelte';
	import SearchDialog from './SearchDialog.svelte';

	import rkIcon from '$lib/assets/logos/rk-icon.png';
	import { terminal } from '$lib/stores/index.svelte';

	let searchDialogOpen = $state<boolean>(false);
	let mobileMenuOpen = $state<boolean>(false);

	const menuItems = [
		{ label: 'File', shortcut: '' },
		{ label: 'Edit', shortcut: '' },
		{ label: 'Selection', shortcut: '' },
		{
			label: 'View',
			shortcut: '',
			action: () => {
				searchDialogOpen = !searchDialogOpen;
			}
		},
		{ label: 'Go', shortcut: '' },
		{ label: 'Run', shortcut: '' },
		{ label: 'Terminal', shortcut: '' },
		{ label: 'Help', shortcut: '' }
	];

	let activeMenu = $state<string | null>(null);
	let isRunning = $state(false);

	const menuStructure: Record<string, { label: string; shortcut?: string; action?: () => void }[]> =
		{
			File: [
				{ label: 'New File', shortcut: 'Ctrl+N' },
				{ label: 'Open Folder...', shortcut: 'Ctrl+K Ctrl+O' },
				{ label: 'Save', shortcut: 'Ctrl+S' },
				{ label: 'Auto Save', shortcut: '' },
				{ label: 'Exit', shortcut: 'Alt+F4' }
			],
			Edit: [
				{ label: 'Undo', shortcut: 'Ctrl+Z' },
				{ label: 'Redo', shortcut: 'Ctrl+Y' },
				{ label: 'Cut', shortcut: 'Ctrl+X' },
				{ label: 'Copy', shortcut: 'Ctrl+C' },
				{ label: 'Paste', shortcut: 'Ctrl+V' }
			],
			Selection: [
				{ label: 'Select All', shortcut: 'Ctrl+A' },
				{ label: 'Expand Selection', shortcut: 'Shift+Alt+Right' }
			],
			View: [
				{
					label: 'Command Palette...',
					shortcut: 'Ctrl+Shift+P',
					action: () => (searchDialogOpen = true)
				},
				{ label: 'Open View...', shortcut: '' },
				{ label: 'Appearance', shortcut: '' },
				{ label: 'Output', shortcut: 'Ctrl+K Ctrl+H' }
			],
			Go: [
				{ label: 'Go to File...', shortcut: 'Ctrl+P' },
				{ label: 'Go to Symbol...', shortcut: 'Ctrl+Shift+O' }
			],
			Run: [
				{
					label: 'Start Debugging',
					shortcut: 'F5',
					action: () => toggleRun()
				},
				{ label: 'Run Without Debugging', shortcut: 'Ctrl+F5' }
			],
			Terminal: [
				{
					label: 'New Terminal',
					shortcut: 'Ctrl+Shift+`',
					action: () => (terminal.open = true)
				}
			],
			Help: [
				{ label: 'Welcome', shortcut: '' },
				{ label: 'About', shortcut: '' }
			]
		};

	function toggleRun() {
		isRunning = !isRunning;
		setTimeout(() => {
			isRunning = false;
		}, 3000);
	}

	function handleMenuClick(action?: () => void) {
		if (action) action();
		activeMenu = null;
		mobileMenuOpen = false;
	}

	function handleOutsideClick(e: MouseEvent) {
		if (
			activeMenu &&
			!(e.target as Element).closest('.menu-item') &&
			!(e.target as Element).closest('.mobile-menu')
		) {
			activeMenu = null;
		}
		if (
			mobileMenuOpen &&
			!(e.target as Element).closest('.mobile-menu') &&
			!(e.target as Element).closest('.mobile-menu-btn')
		) {
			mobileMenuOpen = false;
		}
	}
</script>

{#if searchDialogOpen}
	<SearchDialog bind:searchDialogOpen />
{/if}

<header class="vscode-titlebar">
	<button class="mobile-menu-btn" onclick={() => (mobileMenuOpen = !mobileMenuOpen)}>
		{#if mobileMenuOpen}
			<X class="w-4 h-4" />
		{:else}
			<Menu class="w-4 h-4" />
		{/if}
	</button>

	<div class="app-icon">
		<img src={rkIcon} alt="RK" />
	</div>

	<nav class="menu-bar">
		{#each menuItems as item}
			<div class="menu-wrapper">
				<button
					class="menu-item"
					class:active={activeMenu === item.label}
					onmouseenter={() => activeMenu && (activeMenu = item.label)}
					onclick={() => {
						if (item.action) {
							item.action();
							activeMenu = null;
						} else {
							activeMenu = activeMenu === item.label ? null : item.label;
						}
					}}
				>
					{item.label}
				</button>
				{#if activeMenu === item.label && menuStructure[item.label]}
					<div class="dropdown-menu">
						{#each menuStructure[item.label] as subItem}
							<button
								class="dropdown-item"
								onclick={(e) => {
									e.stopPropagation();
									handleMenuClick(subItem.action);
								}}
							>
								<span class="label">{subItem.label}</span>
								{#if subItem.shortcut}
									<span class="shortcut">{subItem.shortcut}</span>
								{/if}
							</button>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</nav>

	<div class="window-title">
		<span class="title-text">Ramzy KEMMOUN</span>
		<span class="title-separator">—</span>
		<span class="title-file">RK IDE</span>
	</div>

	<div class="right-actions">
		<button class="search-btn" onclick={() => (searchDialogOpen = true)}>
			<Search class="w-4 h-4" />
			<span class="search-text">Search</span>
			<span class="shortcut">Ctrl+Shift+F</span>
		</button>

		<div class="status-items">
			<button class="status-btn" title="Run and Debug" onclick={toggleRun}>
				{#if isRunning}
					<div class="spinner"></div>
				{:else}
					<Play class="w-4 h-4 text-green-400" />
				{/if}
			</button>
			<button class="status-btn hide-mobile" title="Source Control">
				<GitBranch class="w-4 h-4" />
				<span class="badge">3</span>
			</button>
			<button class="status-btn hide-mobile" title="Sync Changes">
				<Cloud class="w-4 h-4" />
			</button>
			<button class="status-btn hide-mobile" title="Notifications">
				<Bell class="w-4 h-4" />
			</button>
			<button class="status-btn" title="Settings">
				<Settings class="w-4 h-4" />
			</button>
		</div>
	</div>

	<div class="window-controls">
		<button class="control-btn minimize">
			<Minus class="w-4 h-4" />
		</button>
		<button class="control-btn maximize">
			<Square class="w-3 h-3" />
		</button>
		<button class="control-btn close">
			<X class="w-4 h-4" />
		</button>
	</div>
</header>
{#if mobileMenuOpen}
	<div class="mobile-menu-overlay" onclick={() => (mobileMenuOpen = false)}></div>
	<nav class="mobile-menu">
		<div class="mobile-menu-header">
			<img src={rkIcon} alt="RK" class="mobile-logo" />
			<span>RK IDE</span>
		</div>
		{#each menuItems as item}
			<div class="mobile-menu-section">
				<button
					class="mobile-menu-item"
					class:expanded={activeMenu === item.label}
					onclick={() => {
						if (item.action) {
							item.action();
							mobileMenuOpen = false;
						} else {
							activeMenu = activeMenu === item.label ? null : item.label;
						}
					}}
				>
					{item.label}
					{#if menuStructure[item.label]}
						<ChevronDown class={`w-4 h-4 chevron ${activeMenu === item.label ? 'rotated' : ''}`} />
					{/if}
				</button>
				{#if activeMenu === item.label && menuStructure[item.label]}
					<div class="mobile-submenu">
						{#each menuStructure[item.label] as subItem}
							<button class="mobile-submenu-item" onclick={() => handleMenuClick(subItem.action)}>
								{subItem.label}
							</button>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</nav>
{/if}

<svelte:window onclick={handleOutsideClick} />

<style>
	.vscode-titlebar {
		display: flex;
		align-items: center;
		height: 38px;
		background: var(--color-surface-900);
		border-bottom: 1px solid var(--color-surface-800);
		font-family: 'Segoe UI', sans-serif;
		font-size: 12px;
		user-select: none;
		-webkit-app-region: drag;
		overflow-x: auto;
		overflow-y: hidden;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.vscode-titlebar::-webkit-scrollbar {
		display: none;
	}

	.app-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		padding-left: 4px;
		flex-shrink: 0;
	}

	.menu-bar {
		display: flex;
		align-items: center;
		height: 100%;
		-webkit-app-region: no-drag;
	}

	.menu-item {
		padding: 0 8px;
		height: 100%;
		background: transparent;
		border: none;
		color: var(--color-primary-200);
		font-size: 12px;
		cursor: pointer;
		transition: background 0.1s ease;
	}

	.menu-item:hover,
	.menu-item.active {
		background: var(--color-primary-400);
	}

	.window-title {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		color: var(--color-primary-200);
		font-size: 12px;
		overflow: hidden;
	}

	.title-text {
		opacity: 0.8;
	}

	.title-separator {
		opacity: 0.4;
	}

	.title-file {
		opacity: 0.6;
	}

	.right-actions {
		display: flex;
		align-items: center;
		gap: 4px;
		padding-right: 8px;
		-webkit-app-region: no-drag;
		flex-shrink: 0;
	}

	.search-btn {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 3px 8px;
		background: var(--color-surface-800);
		border: 1px solid var(--color-surface-700);
		border-radius: 4px;
		color: var(--color-surface-400);
		font-size: 11px;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.search-btn:hover {
		background: var(--color-surface-700);
		color: var(--color-surface-300);
	}

	.shortcut {
		color: var(--color-primary-3000);
		font-size: 10px;
	}

	.status-items {
		display: flex;
		align-items: center;
		gap: 2px;
	}

	.status-btn {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 26px;
		height: 22px;
		background: transparent;
		border: none;
		border-radius: 4px;
		color: var(--color-surface-400);
		cursor: pointer;
		transition: all 0.1s ease;
	}

	.status-btn:hover {
		background: var(--color-surface-700);
		color: var(--color-surface-200);
	}

	.badge {
		position: absolute;
		top: 2px;
		right: 2px;
		min-width: 14px;
		height: 14px;
		padding: 0 4px;
		background: var(--color-primary-500);
		border-radius: 10px;
		color: white;
		font-size: 9px;
		font-weight: 600;
		line-height: 14px;
		text-align: center;
	}

	.window-controls {
		display: flex;
		align-items: center;
		height: 100%;
		-webkit-app-region: no-drag;
		flex-shrink: 0;
	}

	.control-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 46px;
		height: 100%;
		background: transparent;
		border: none;
		color: var(--color-surface-200);
		cursor: pointer;
		transition: background 0.15s ease;
	}

	.control-btn:hover {
		background: var(--color-surface-700);
	}

	.control-btn.close:hover {
		background: var(--color-error-500);
		color: white;
	}

	@media (max-width: 900px) {
		.window-title {
			font-size: 11px;
		}

		.title-text {
			max-width: 120px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.search-btn {
			padding: 3px 6px;
		}

		.status-items {
			gap: 0;
		}

		.control-btn {
			width: 32px;
		}
	}

	.mobile-menu-btn {
		display: none;
		align-items: center;
		justify-content: center;
		width: 38px;
		height: 100%;
		background: transparent;
		border: none;
		color: var(--color-surface-300);
		cursor: pointer;
		transition: all 0.15s ease;
		-webkit-app-region: no-drag;
	}

	.mobile-menu-btn:hover {
		background: var(--color-surface-700);
		color: var(--color-surface-100);
	}

	.mobile-menu-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 999;
		animation: fadeIn 0.2s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.mobile-menu {
		position: fixed;
		top: 0;
		left: 0;
		width: 280px;
		max-width: 85vw;
		height: 100vh;
		background: #1e1e1e;
		border-right: 1px solid #3c3c3c;
		z-index: 1000;
		overflow-y: auto;
		animation: slideIn 0.25s ease;
	}

	@keyframes slideIn {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(0);
		}
	}

	.mobile-menu-header {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 16px;
		border-bottom: 1px solid #3c3c3c;
		font-size: 14px;
		font-weight: 600;
		color: var(--color-surface-100);
	}

	.mobile-logo {
		width: 28px;
		height: 28px;
	}

	.mobile-menu-section {
		border-bottom: 1px solid #2d2d2d;
	}

	.mobile-menu-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 14px 16px;
		background: transparent;
		border: none;
		color: var(--color-surface-200);
		font-size: 13px;
		cursor: pointer;
		transition: all 0.15s ease;
		text-align: left;
	}

	.mobile-menu-item:hover {
		background: #2a2d2e;
		color: var(--color-surface-100);
	}

	.mobile-menu-item.expanded {
		background: #2a2d2e;
		color: var(--color-primary-400);
	}

	.mobile-menu-item :global(.chevron) {
		transition: transform 0.2s ease;
	}

	.mobile-menu-item :global(.chevron.rotated) {
		transform: rotate(180deg);
	}

	.mobile-submenu {
		background: #252526;
	}

	.mobile-submenu-item {
		display: block;
		width: 100%;
		padding: 12px 16px 12px 32px;
		background: transparent;
		border: none;
		color: var(--color-surface-300);
		font-size: 12px;
		cursor: pointer;
		text-align: left;
		transition: all 0.15s ease;
	}

	.mobile-submenu-item:hover {
		background: #2a2d2e;
		color: var(--color-surface-100);
	}

	.menu-wrapper {
		position: relative;
		height: 100%;
	}

	.dropdown-menu {
		position: absolute;
		top: 100%;
		left: 0;
		min-width: 200px;
		background: #1e1e1e;
		border: 1px solid #3c3c3c;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
		border-radius: 0 0 4px 4px;
		padding: 4px 0;
		z-index: 1000;
		display: flex;
		flex-direction: column;
	}

	.dropdown-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 6px 16px;
		background: transparent;
		border: none;
		color: var(--color-primary-200);
		font-size: 12px;
		cursor: pointer;
		text-align: left;
		width: 100%;
	}

	.dropdown-item:hover {
		background: var(--color-primary-600);
		color: white;
	}

	.dropdown-item .shortcut {
		margin-left: 20px;
		color: var(--color-surface-400);
		font-size: 10px;
	}

	.dropdown-item:hover .shortcut {
		color: var(--color-surface-200);
	}

	.spinner {
		width: 14px;
		height: 14px;
		border: 2px solid var(--color-primary-500);
		border-top-color: transparent;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
