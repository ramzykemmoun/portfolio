<script lang="ts">
	import { X, Circle, Puzzle, Webcam } from '@lucide/svelte';
	import { file } from '$lib/stores/index.svelte';
	import Icon from '$lib/components/Icon.svelte';

	const tabs = $derived([
		{
			label: file.sectionFileName,
			id: 'code',
			modified: false,
			icon: file.sectionIcon,
			component: null
		},
		{
			label: 'Extension: Contact',
			id: 'contact',
			modified: false,
			icon: null,
			component: Puzzle
		},
		{
			label: 'Preview',
			id: 'live',
			modified: false,
			icon: null,
			component: Webcam
		}
	]);
</script>

<div class="vscode-tabs">
	{#each tabs as tab}
		<button class="tab" class:active={file.view === tab.id} onclick={() => (file.view = tab.id)}>
			<span class="tab-icon">
				{#if tab.icon}
					<Icon icon={tab.icon} />
				{:else if tab.component}
					<tab.component class="w-4 h-4" />
				{/if}
			</span>
			<span class="tab-label">{tab.label}</span>
			<span class="tab-close">
				{#if tab.modified}
					<Circle class="w-3 h-3 fill-current" />
				{:else}
					<X class="w-4 h-4" />
				{/if}
			</span>
		</button>
	{/each}
	<div class="tabs-spacer"></div>
</div>

<style>
	.vscode-tabs {
		display: flex;
		height: 35px;
		background: var(--color-surface-950);
		border-bottom: 1px solid var(--color-surface-800);
		overflow-x: auto;
		overflow-y: hidden;
	}

	.vscode-tabs::-webkit-scrollbar {
		height: 3px;
	}

	.vscode-tabs::-webkit-scrollbar-thumb {
		background: var(--color-surface-700);
	}

	.tab {
		display: flex;
		align-items: center;
		gap: 6px;
		height: 100%;
		padding: 0 10px;
		background: var(--color-surface-800);
		border: none;
		border-right: 1px solid var(--color-surface-900);
		color: var(--color-surface-400);
		font-size: 13px;
		font-family: 'Segoe UI', sans-serif;
		cursor: pointer;
		white-space: nowrap;
		transition: background 0.1s ease;
	}

	.tab:hover {
		background: var(--color-surface-700);
	}

	.tab.active {
		background: var(--color-surface-900);
		color: white;
		border-top: 2px solid var(--color-primary-500);
		margin-bottom: -1px;
	}

	.tab-icon {
		font-size: 14px;
	}

	.tab-label {
		max-width: 120px;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tab-close {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		border-radius: 4px;
		opacity: 0;
		transition:
			opacity 0.1s ease,
			background 0.1s ease;
	}

	.tab:hover .tab-close,
	.tab.active .tab-close {
		opacity: 0.6;
	}

	.tab-close:hover {
		opacity: 1 !important;
		background: var(--color-surface-600);
	}

	.tabs-spacer {
		flex: 1;
		min-width: 0;
		background: var(--color-surface-950);
	}

	/* Responsive: Mobile */
	@media (max-width: 768px) {
		.tab {
			padding: 0 8px;
			font-size: 12px;
		}

		.tab-label {
			max-width: 80px;
		}

		.tab-close {
			width: 16px;
			height: 16px;
		}
	}

	@media (max-width: 480px) {
		.tab-label {
			display: none;
		}

		.tab {
			padding: 0 10px;
		}

		.tab-icon {
			font-size: 16px;
		}
	}
</style>
