<script lang="ts">
	import { Puzzle, Mail, Folder, Search, GitBranch } from '@lucide/svelte';
	import Explorer from './Explorer.svelte';
	import Contact from './Contact.svelte';
	import SearchPanel from './Search.svelte';
	import Extensions from './Extensions.svelte';
	import Git from './Git.svelte';
	import { sidebar } from '$lib/stores/index.svelte';
	import { Portal, Tooltip } from '@skeletonlabs/skeleton-svelte';

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

<div class="vscode-sidebar bg-surface-950">
	<div class="activity-bar bg-surface-900">
		{#each Object.entries(sections) as [key, section]}
			<Tooltip positioning={{ placement: 'top' }}>
				<Tooltip.Trigger>
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
				</Tooltip.Trigger>
				<Portal>
					<Tooltip.Positioner>
						<Tooltip.Content class="card p-2 preset-filled-surface-950-50">
							<span>{section.title}</span>
							<Tooltip.Arrow
								class="[--arrow-size:--spacing(2)] [--arrow-background:var(--color-surface-950-50)]"
							>
								<Tooltip.ArrowTip />
							</Tooltip.Arrow>
						</Tooltip.Content>
					</Tooltip.Positioner>
				</Portal>
			</Tooltip>
		{/each}
	</div>

	{#if sidebar.open}
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
	{/if}
</div>

<style>
	.vscode-sidebar {
		display: flex;
		height: 100%;
		min-height: 0;
		flex-shrink: 0;
	}

	/* Activity Bar */
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

	/* Active indicator (white bar on left) */
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

	/* Sidebar Panel */
	.sidebar-panel {
		display: flex;
		flex-direction: column;
		min-width: 0;
		height: 100%;
		border-right: 1px solid var(--color-surface-800);
		overflow: hidden;
		background: var(--color-surface-800);
	}

	/* Resize Handle */
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

	/* Responsive: Tablet */
	@media (max-width: 1024px) {
		.vscode-sidebar {
			/* Auto-collapse sidebar panel on tablet */
		}
	}

	/* Responsive: Mobile */
	@media (max-width: 768px) {
		.vscode-sidebar {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			height: 48px;
			z-index: 100;
			flex-direction: row;
			border-left: none;
			border-top: 1px solid var(--color-surface-800);
		}

		.activity-bar {
			flex-direction: row;
			width: 100%;
			height: 48px;
			border-right: none;
			justify-content: space-around;
		}

		.activity-item {
			width: 48px;
			height: 48px;
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

		/* Hide sidebar panel and resize handle on mobile */
		.resize-handle,
		.sidebar-panel {
			display: none;
		}
	}
</style>
