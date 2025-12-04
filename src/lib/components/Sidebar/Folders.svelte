<script lang="ts">
	import { FileIcon, FolderIcon } from '@lucide/svelte';
	import { TreeView, createTreeViewCollection, useTreeView } from '@skeletonlabs/skeleton-svelte';
	import { sidebar, file } from '$lib/stores/index.svelte';
	import { rootNode } from '$lib/data/explorer';

	const collection = createTreeViewCollection({
		nodeToValue: (node) => node.id,
		nodeToString: (node) => node.name,
		rootNode,
		defaultExpanded: true
	});

	const treeView = useTreeView({
		id: 'explorer',
		defaultExpandedValue: [
			'root',
			'node_modules',
			'public',
			'public/assets',
			'src',
			'src/sections'
		],
		collection
	});
</script>

<div class="w-full flex flex-col items-center gap-4 p-4">
	<TreeView.Provider value={treeView}>
		<TreeView.Label>Ramzy-KEMMOUN-Portfolio</TreeView.Label>
		<TreeView.Tree>
			{#each collection.rootNode.children || [] as node, index (node)}
				{@render treeNode(node, [index])}
			{/each}
		</TreeView.Tree>
	</TreeView.Provider>
</div>

{#snippet treeNode(node: Node, indexPath: number[])}
	<TreeView.NodeProvider value={{ node, indexPath }}>
		{#if node.children}
			<TreeView.Branch>
				<TreeView.BranchControl>
					<TreeView.BranchIndicator />
					<TreeView.BranchText>
						<FolderIcon class="size-4" />
						{node.name}
					</TreeView.BranchText>
				</TreeView.BranchControl>
				<TreeView.BranchContent>
					<TreeView.BranchIndentGuide />
					{#each node.children as childNode, childIndex (childNode)}
						{@render treeNode(childNode, [...indexPath, childIndex])}
					{/each}
				</TreeView.BranchContent>
			</TreeView.Branch>
		{:else}
			<TreeView.Item value={node.id} onclick={() => node.isClickable && (file.section = node.id)}>
				<FileIcon class="size-4" />
				{node.name}
			</TreeView.Item>
		{/if}
	</TreeView.NodeProvider>
{/snippet}
