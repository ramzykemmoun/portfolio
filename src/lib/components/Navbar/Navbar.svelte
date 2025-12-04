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

	const menuItems = [
		{ label: 'File', shortcut: '' },
		{ label: 'Edit', shortcut: '' },
		{ label: 'Selection', shortcut: '' },
		{ label: 'View', shortcut: '' },
		{ label: 'Go', shortcut: '' },
		{ label: 'Run', shortcut: '' },
		{ label: 'Terminal', shortcut: '' },
		{ label: 'Help', shortcut: '' }
	];

	let activeMenu = $state<string | null>(null);
</script>

<header class="vscode-titlebar">
	<!-- App Icon -->
	<div class="app-icon">
		<span class="icon-text">RK</span>
	</div>

	<!-- Menu Bar -->
	<nav class="menu-bar">
		{#each menuItems as item}
			<button
				class="menu-item"
				class:active={activeMenu === item.label}
				onmouseenter={() => activeMenu && (activeMenu = item.label)}
				onclick={() => (activeMenu = activeMenu === item.label ? null : item.label)}
			>
				{item.label}
			</button>
		{/each}
	</nav>

	<!-- Window Title (Draggable Area) -->
	<div class="window-title">
		<span class="title-text">Ramzy KEMMOUN - Portfolio</span>
		<span class="title-separator">—</span>
		<span class="title-file">Visual Studio Code</span>
	</div>

	<!-- Right Side Actions -->
	<div class="right-actions">
		<!-- Search -->
		<button class="action-btn search-btn">
			<Search class="w-4 h-4" />
			<span>Search</span>
			<span class="shortcut">Ctrl+Shift+F</span>
		</button>

		<!-- Status Items -->
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

	<!-- Window Controls -->
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
		height: 30px;
		background: #1f1f1f;
		border-bottom: 1px solid #252526;
		font-family: 'Segoe UI', sans-serif;
		font-size: 12px;
		user-select: none;
		-webkit-app-region: drag;
	}

	/* App Icon */
	.app-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 100%;
		background: linear-gradient(135deg, #4759cc, #005a2e);
		-webkit-app-region: no-drag;
	}

	.icon-text {
		font-size: 11px;
		font-weight: 700;
		color: white;
		letter-spacing: -0.5px;
	}

	/* Menu Bar */
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
		color: #cccccc;
		font-size: 12px;
		cursor: pointer;
		transition: background 0.1s ease;
	}

	.menu-item:hover,
	.menu-item.active {
		background: rgba(255, 255, 255, 0.1);
	}

	/* Window Title */
	.window-title {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		color: #cccccc;
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
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 4px;
		color: #888;
		font-size: 11px;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.search-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		color: #ccc;
	}

	.shortcut {
		color: #666;
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
		color: #858585;
		cursor: pointer;
		transition: all 0.1s ease;
	}

	.status-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		color: #ccc;
	}

	.badge {
		position: absolute;
		top: 2px;
		right: 2px;
		min-width: 14px;
		height: 14px;
		padding: 0 4px;
		background: #007acc;
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
		color: #cccccc;
		cursor: pointer;
		transition: background 0.15s ease;
	}

	.control-btn:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.control-btn.close:hover {
		background: #e81123;
		color: white;
	}

	/* Responsive */
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
