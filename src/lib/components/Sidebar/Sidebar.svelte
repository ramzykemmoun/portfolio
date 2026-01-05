<script lang="ts">
	import { Puzzle, Mail, Folder, Search, GitBranch, X } from '@lucide/svelte';
	import Explorer from './Explorer.svelte';
	import Contact from './Contact.svelte';
	import SearchPanel from './Search.svelte';
	import Extensions from './Extensions.svelte';
	import Git from './Git.svelte';
	import { sidebar } from '$lib/stores/index.svelte';

	let isResizing = $state(false);

	const startResize = (e: MouseEvent) => {
		e.preventDefault();
		isResizing = true;
	};

	const changeSection = (section: string) => {
		if (sidebar.open && sidebar.section === section) {
			sidebar.open = false;
		} else {
			sidebar.open = true;
			sidebar.section = section;
		}
	};

	const closeSidebar = () => {
		sidebar.open = false;
	};

	export const sections = {
		explorer: {
			title: 'Explorer',
			icon: Folder,
			action: () => {}
		},
		search: {
			title: 'Search',
			icon: Search
		},
		contact: {
			title: 'Contact',
			icon: Mail
		},
		git: {
			title: 'Git',
			icon: GitBranch
		},
		extensions: {
			title: 'Extensions',
			icon: Puzzle
		}
	};
</script>

{#if sidebar.open}
	<div class="mobile-overlay" onclick={closeSidebar}></div>
{/if}

<div class="vscode-sidebar bg-surface-950" class:panel-open={sidebar.open}>
	<div class="activity-bar bg-surface-900">
		{#each Object.entries(sections) as [key, section]}
			<button
				type="button"
				class="activity-item"
				class:active={sidebar.section === key && sidebar.open}
				onclick={() => changeSection(key)}
				title={section.title}
			>
				<section.icon class="w-6 h-6" />
				{#if sidebar.section === key && sidebar.open}
					<div class="active-indicator"></div>
				{/if}
			</button>
		{/each}
	</div>

	{#if sidebar.open}
		<div class="sidebar-panel-wrapper">
			<button class="mobile-close-btn" onclick={closeSidebar}>
				<X class="w-5 h-5" />
			</button>

			{#if sidebar.section === 'explorer'}
				<Explorer bind:isResizing />
			{/if}
			{#if sidebar.section === 'contact'}
				<Contact bind:isResizing />
			{/if}
			{#if sidebar.section === 'git'}
				<Git bind:isResizing />
			{/if}
			{#if sidebar.section === 'extensions'}
				<Extensions bind:isResizing />
			{/if}
			{#if sidebar.section === 'search'}
				<SearchPanel bind:isResizing />
			{/if}

			<div
				role="button"
				tabindex="0"
				aria-label="Resize sidebar"
				onmousedown={startResize}
				class="resize-handle"
			></div>
		</div>
	{/if}
</div>

<style>
	.vscode-sidebar {
		display: flex;
		height: 100%;
		min-height: 0;
		flex-shrink: 0;
	}

	.activity-bar {
		display: flex;
		flex-direction: column;
		width: 48px;
		height: 100%;
		border-right: 1px solid var(--color-surface-800);
		flex-shrink: 0;
		background: var(--color-surface-900);
	}

	.activity-item {
		position: relative;
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
	}

	.activity-item:hover {
		color: var(--color-surface-50);
	}

	.activity-item.active {
		color: var(--color-surface-50);
	}

	.active-indicator {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 2px;
		height: 24px;
		background: var(--color-primary-500);
		border-radius: 0 2px 2px 0;
	}

	.sidebar-panel-wrapper {
		display: flex;
		position: relative;
	}

	.mobile-close-btn {
		display: none;
	}

	.mobile-overlay {
		display: none;
	}

	.resize-handle {
		width: 4px;
		height: 100%;
		cursor: col-resize;
		background: transparent;
		transition: background 0.15s ease;
		flex-shrink: 0;
	}

	.resize-handle:hover {
		background: var(--color-primary-500);
	}

	@media (max-width: 1024px) {
		.activity-bar {
			width: 44px;
		}

		.activity-item {
			width: 44px;
			height: 44px;
		}
	}

	@media (max-width: 768px) {
		.mobile-overlay {
			display: block;
			position: fixed;
			inset: 0;
			background: rgba(0, 0, 0, 0.5);
			z-index: 998;
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

		.vscode-sidebar {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			height: auto;
			z-index: 999;
			flex-direction: column-reverse;
			border-left: none;
		}

		.activity-bar {
			flex-direction: row;
			width: 100%;
			height: 56px;
			border-right: none;
			border-top: 1px solid var(--color-surface-800);
			justify-content: space-around;
			padding: 0 8px;
			padding-bottom: env(safe-area-inset-bottom);
		}

		.activity-item {
			width: 52px;
			height: 52px;
		}

		.active-indicator {
			left: 50%;
			top: 0;
			bottom: auto;
			transform: translateX(-50%);
			width: 24px;
			height: 2px;
			border-radius: 0 0 2px 2px;
		}

		.sidebar-panel-wrapper {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 56px;
			bottom: calc(56px + env(safe-area-inset-bottom));
			height: 60vh;
			max-height: 60vh;
			background: var(--color-surface-900);
			border-radius: 16px 16px 0 0;
			flex-direction: column;
			animation: slideUp 0.3s ease;
			overflow: hidden;
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

		.mobile-close-btn {
			display: flex;
			position: absolute;
			top: 8px;
			right: 8px;
			z-index: 10;
			align-items: center;
			justify-content: center;
			width: 32px;
			height: 32px;
			background: var(--color-surface-800);
			border: none;
			border-radius: 8px;
			color: var(--color-surface-400);
			cursor: pointer;
		}

		.mobile-close-btn:hover {
			background: var(--color-surface-700);
			color: var(--color-surface-100);
		}

		.sidebar-panel-wrapper :global(.explorer-panel),
		.sidebar-panel-wrapper :global(.contact-panel),
		.sidebar-panel-wrapper :global(.extensions-panel),
		.sidebar-panel-wrapper :global(.search-panel),
		.sidebar-panel-wrapper :global(.git-panel) {
			width: 100% !important;
			height: 100% !important;
			border-radius: 16px 16px 0 0;
			overflow-y: auto !important;
			overflow-x: hidden !important;
			-webkit-overflow-scrolling: touch;
		}

		.resize-handle {
			display: none;
		}
	}

	@media (max-width: 380px) {
		.activity-bar {
			height: 52px;
			padding: 0 4px;
		}

		.activity-item {
			width: 48px;
			height: 48px;
		}

		.sidebar-panel-wrapper {
			height: 70vh;
			max-height: 70vh;
		}
	}
</style>
