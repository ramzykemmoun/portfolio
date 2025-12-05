<script lang="ts">
	import { ChevronRight, Home, FolderOpen } from '@lucide/svelte';
	import { file } from '$lib/stores/index.svelte';

	// Breadcrumb path based on current section
	const getBreadcrumbs = () => {
		const section = file.section || 'aboutMe';
		return [
			{ label: 'src', icon: FolderOpen },
			{ label: 'components', icon: FolderOpen },
			{ label: `${section[0].toUpperCase() + section.slice(1)}.tsx`, icon: null }
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
				{#if crumb.icon}
					<crumb.icon class="breadcrumb-icon" />
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
		background: #1e1e1e;
		border-bottom: 1px solid #252526;
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
		color: #969696;
		cursor: pointer;
		white-space: nowrap;
		transition:
			background 0.1s ease,
			color 0.1s ease;
	}

	.breadcrumb-item:hover {
		background: rgba(255, 255, 255, 0.08);
		color: #cccccc;
	}

	.breadcrumb-item.active {
		color: #cccccc;
	}

	.breadcrumb-icon {
		width: 14px;
		height: 14px;
		color: #dcb67a;
	}

	.breadcrumb-separator {
		width: 14px;
		height: 14px;
		color: #5a5a5a;
		flex-shrink: 0;
	}
</style>
