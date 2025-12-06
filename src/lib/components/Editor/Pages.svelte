<script lang="ts">
	import { X, Circle } from '@lucide/svelte';
	import { file } from '$lib/stores/index.svelte';

	const tabs = $derived([
		{
			label: file.sectionFileName,
			id: 'code',
			modified: false
		},
		{
			label: 'Contact.tsx',
			id: 'contact',
			modified: false
		},
		{
			label: 'Preview',
			id: 'live',
			modified: false
		}
	]);

	const getFileIcon = (label: string) => {
		if (label.includes('.svelte')) return 'react';
		return '📄';
	};
</script>

<div class="vscode-tabs">
	{#each tabs as tab}
		<button class="tab" class:active={file.view === tab.id} onclick={() => (file.view = tab.id)}>
			<span class="tab-icon">{getFileIcon(tab.label)}</span>
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
		background: #181818;
		border-bottom: 1px solid #252526;
		overflow-x: auto;
		overflow-y: hidden;
	}

	.vscode-tabs::-webkit-scrollbar {
		height: 3px;
	}

	.vscode-tabs::-webkit-scrollbar-thumb {
		background: #424242;
	}

	.tab {
		display: flex;
		align-items: center;
		gap: 6px;
		height: 100%;
		padding: 0 10px;
		background: #2d2d2d;
		border: none;
		border-right: 1px solid #252526;
		color: #969696;
		font-size: 13px;
		font-family: 'Segoe UI', sans-serif;
		cursor: pointer;
		white-space: nowrap;
		transition: background 0.1s ease;
	}

	.tab:hover {
		background: #2a2a2a;
	}

	.tab.active {
		background: #1e1e1e;
		color: #ffffff;
		border-bottom: 1px solid #1e1e1e;
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
		background: rgba(255, 255, 255, 0.1);
	}

	.tabs-spacer {
		flex: 1;
		min-width: 0;
		background: #181818;
	}
</style>
