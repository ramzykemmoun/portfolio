<script lang="ts">
	import { ChevronRight, Home, FolderOpen } from '@lucide/svelte';
	import { file } from '$lib/stores/index.svelte';
	import Icon from '../Icon.svelte';

	const getBreadcrumbs = () => {
		return [
			{ label: 'src', icon: FolderOpen },
			{ label: 'components', icon: FolderOpen },
			{ label: file.sectionFileName, icon: file.sectionIcon }
		];
	};

	let breadcrumbs = $derived(getBreadcrumbs());
</script>

<div class="vscode-breadcrumb">
	<div class="breadcrumb-path">
		{#each breadcrumbs as crumb, i}
			{#if i > 0}
				<ChevronRight class="breadcrumb-separator" />
			{/if}
			<button class="breadcrumb-item" class:active={i === breadcrumbs.length - 1}>
				{#if typeof crumb.icon !== 'string'}
					<crumb.icon />
				{:else}
					<Icon icon={crumb.icon} />
				{/if}
				<span>{crumb.label}</span>
			</button>
		{/each}
	</div>
</div>

<style>
	.vscode-breadcrumb {
		display: flex;
		align-items: center;
		height: 32px;
		padding: 8px;
		background: var(--color-surface-900);
		border-bottom: 1px solid var(--color-surface-800);
		font-size: 12px;
		font-family: 'Segoe UI', sans-serif;
	}

	.breadcrumb-path {
		display: flex;
		align-items: center;
		gap: 2px;
		overflow: hidden;
	}

	.breadcrumb-item {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 2px 4px;
		background: transparent;
		border: none;
		border-radius: 3px;
		color: var(--color-surface-400);
		cursor: pointer;
		white-space: nowrap;
		transition:
			background 0.1s ease,
			color 0.1s ease;
	}

	.breadcrumb-item:hover {
		background: var(--color-surface-800);
		color: var(--color-surface-200);
	}

	.breadcrumb-item.active {
		color: var(--color-surface-200);
	}

	.breadcrumb-separator {
		width: 14px;
		height: 14px;
		color: var(--color-surface-500);
		flex-shrink: 0;
	}
</style>
