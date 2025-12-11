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
		{ label: 'Terminal', shortcut: '', action: () => (terminal.open = !terminal.open) },
		{ label: 'Help', shortcut: '' }
	];

	let activeMenu = $state<string | null>(null);
</script>

{#if searchDialogOpen}
	<SearchDialog bind:searchDialogOpen />
{/if}

<header class="vscode-titlebar">
	<div class="app-icon">
		<img src={rkIcon} alt="RK" />
	</div>

	<nav class="menu-bar">
		{#each menuItems as item}
			<button
				class="menu-item"
				class:active={activeMenu === item.label}
				onmouseenter={() => activeMenu && (activeMenu = item.label)}
				onclick={() => {
					activeMenu = activeMenu === item.label ? null : item.label;
					item.action && item.action();
				}}
			>
				{item.label}
			</button>
		{/each}
	</nav>

	<div class="window-title">
		<span class="title-text">Ramzy KEMMOUN - Portfolio</span>
		<span class="title-separator">—</span>
		<span class="title-file">RK IDE</span>
	</div>

	<div class="right-actions">
		<button class="search-btn" onclick={() => (searchDialogOpen = true)}>
			<Search class="w-4 h-4" />
			<span>Search</span>
			<span class="shortcut">Ctrl+Shift+F</span>
		</button>

		<div class="status-items">
			<button class="status-btn" title="Run and Debug">
				<Play class="w-4 h-4" />
			</button>
			<button class="status-btn" title="Source Control">
				<GitBranch class="w-4 h-4" />
				<span class="badge">3</span>
			</button>
			<button class="status-btn" title="Sync Changes">
				<Cloud class="w-4 h-4" />
			</button>
			<button class="status-btn" title="Notifications">
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
	}

	.app-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		padding-left: 4px;
	}

	.icon-text {
		font-size: 11px;
		font-weight: 700;
		color: var(--color-primary-300);
		letter-spacing: -0.5px;
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

	/* Right Actions */
	.right-actions {
		display: flex;
		align-items: center;
		gap: 4px;
		padding-right: 8px;
		-webkit-app-region: no-drag;
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

	/* Window Controls */
	.window-controls {
		display: flex;
		align-items: center;
		height: 100%;
		-webkit-app-region: no-drag;
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

	@media (max-width: 800px) {
		.menu-bar {
			display: none;
		}

		.search-btn span:not(.shortcut) {
			display: none;
		}

		.shortcut {
			display: none;
		}

		.window-title {
			padding-left: 10px;
		}
	}
</style>
