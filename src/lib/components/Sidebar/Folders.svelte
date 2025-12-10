<script lang="ts">
	import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from '@lucide/svelte';
	import { file } from '$lib/stores/index.svelte';
	import { rootNode } from '$lib/data/explorer';
	import Icon from '$lib/components/Icon.svelte';

	interface TreeNode {
		id: string;
		name: string;
		icon?: string;
		isClickable?: boolean;
		children?: TreeNode[];
	}

	let expandedFolders = $state<Set<string>>(new Set(['root', 'src', 'src/components', 'public']));

	let selectedFile = $state<string | null>('aboutMe');

	const toggleFolder = (id: string) => {
		const newSet = new Set(expandedFolders);
		if (newSet.has(id)) {
			newSet.delete(id);
		} else {
			newSet.add(id);
		}
		expandedFolders = newSet;
	};

	const selectFile = (node: TreeNode) => {
		selectedFile = node.id;
		if (node.isClickable) {
			if (node.id === 'contact') {
				file.view = 'contact';
				file.section = 'contact';
			} else {
				file.view = 'code';
				file.section = node.id;
				file.sectionFileName = node.name;
			}
		}
	};
</script>

<div class="bg-surface-900">
	<div class="explorer-header">
		<span class="header-title">EXPLORER</span>
	</div>

	<div class="project-header">
		<ChevronDown class="w-3 h-3" />
		<span class="project-name">RAMZY-KEMMOUN-PORTFOLIO</span>
	</div>

	<div class="file-tree">
		{#each rootNode.children || [] as node}
			{@render treeNode(node, 0)}
		{/each}
	</div>
</div>

{#snippet treeNode(node: TreeNode, depth: number)}
	{#if node.children !== undefined}
		<button
			class="tree-item folder"
			class:expanded={expandedFolders.has(node.id)}
			style="padding-left: {12 + depth * 16}px"
			onclick={() => toggleFolder(node.id)}
		>
			<span class="chevron">
				{#if expandedFolders.has(node.id)}
					<ChevronDown class="w-4 h-4" />
				{:else}
					<ChevronRight class="w-4 h-4" />
				{/if}
			</span>
			<span class="folder-icon">
				{#if expandedFolders.has(node.id)}
					<FolderOpen class="w-4 h-4" />
				{:else}
					<Folder class="w-4 h-4" />
				{/if}
			</span>
			<span class="item-name">{node.name}</span>
		</button>

		{#if expandedFolders.has(node.id) && node.children}
			<div class="folder-children">
				{#each node.children as child}
					{@render treeNode(child, depth + 1)}
				{/each}
			</div>
		{/if}
	{:else}
		<button
			class="tree-item file"
			class:selected={selectedFile === node.id}
			style="padding-left: {12 + depth * 16 + 20}px"
			onclick={() => {
				selectFile(node);
			}}
		>
			<Icon icon={node.name.split('.').pop()?.toLowerCase() || ''} />
			<span class="item-name">{node.name}</span>
		</button>
	{/if}
{/snippet}

<style>
	.vscode-explorer {
		width: 100%;
		height: 100%;
		color: #cccccc;
		font-family: 'Segoe UI', 'SF Pro Text', sans-serif;
		font-size: 13px;
		user-select: none;
	}

	.explorer-header {
		padding: 10px 20px;
		font-size: 11px;
		font-weight: 400;
		letter-spacing: 0.04em;
		color: #bbbbbb;
		text-transform: uppercase;
	}

	.project-header {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 6px 10px;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.02em;
		color: #cccccc;
		background: transparent;
		cursor: pointer;
	}

	.project-header:hover {
		background: rgba(255, 255, 255, 0.04);
	}

	.project-name {
		text-transform: uppercase;
	}

	.file-tree {
		padding-bottom: 20px;
	}

	.tree-item {
		display: flex;
		align-items: center;
		gap: 4px;
		width: 100%;
		padding: 4px 8px;
		border: none;
		background: transparent;
		color: #cccccc;
		font-size: 13px;
		text-align: left;
		cursor: pointer;
		transition: background 0.1s ease;
	}

	.tree-item:hover {
		background: rgba(255, 255, 255, 0.06);
	}

	.tree-item:focus {
		outline: none;
		background: rgba(255, 255, 255, 0.06);
	}

	.tree-item.selected {
		background: rgba(255, 255, 255, 0.1);
	}

	.tree-item.selected:hover {
		background: rgba(255, 255, 255, 0.12);
	}

	.chevron {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		height: 16px;
		color: #858585;
		flex-shrink: 0;
	}

	.folder-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-primary-500);
		flex-shrink: 0;
	}

	.file-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-primary-500);
		width: 16px;
		font-size: 14px;
		flex-shrink: 0;
	}

	.item-name {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-left: 4px;
	}

	.folder-children {
		position: relative;
	}

	.folder-children::before {
		content: '';
		position: absolute;
		left: 23px;
		top: 0;
		bottom: 0;
		width: 1px;
		background: rgba(255, 255, 255, 0.1);
	}

	.folder.expanded .folder-icon {
		color: var(--color-primary-500);
	}

	.tree-item.file:hover .item-name {
		color: #ffffff;
	}
</style>
