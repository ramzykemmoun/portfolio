<script lang="ts">
	import { User, Briefcase, Book, Wrench, Mail, Folder, Search, GitBranch } from '@lucide/svelte';
	import Explorer from './Explorer.svelte';
	import Contact from './Contact.svelte';
	import { sidebar } from '$lib/stores/index.svelte';
	import Git from './Git.svelte';

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
			icon: Wrench
		}
	};
</script>

<div class="vscode-sidebar">
	<!-- Activity Bar (Left icons) -->
	<div class="activity-bar">
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
		{#if sidebar.section === 'explorer'}
			<Explorer bind:isResizing />
		{/if}
		{#if sidebar.section === 'contact'}
			<Contact bind:isResizing />
		{/if}
		{#if sidebar.section === 'git'}
			<Git bind:isResizing />
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
		background: #1e1e1e;
		flex-shrink: 0;
	}

	/* Activity Bar */
	.activity-bar {
		display: flex;
		flex-direction: column;
		width: 48px;
		height: 100%;
		background: #181818;
		border-right: 1px solid #2b2b2b;
		flex-shrink: 0;
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
		color: #858585;
		cursor: pointer;
		transition: color 0.15s ease;
	}

	.activity-item:hover {
		color: #ffffff;
	}

	.activity-item.active {
		color: #ffffff;
	}

	/* Active indicator (white bar on left) */
	.active-indicator {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 2px;
		height: 24px;
		background: #ffffff;
		border-radius: 0 2px 2px 0;
	}

	/* Sidebar Panel */
	.sidebar-panel {
		display: flex;
		flex-direction: column;
		min-width: 0;
		height: 100%;
		border-right: 1px solid #1e1e1e;
		overflow: hidden;
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
		background: #007acc;
	}
</style>
