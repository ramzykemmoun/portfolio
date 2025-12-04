<script lang="ts">
	import { ChevronRight } from '@lucide/svelte';
	const pages = [
		{
			label: 'Sidebar.svelte',
			href: '/sidebar',
			id: 'code'
		},
		{
			label: 'Live Preview',
			href: '/editor',
			id: 'live'
		}
	];

	import { file } from '$lib/stores/index.svelte';
</script>

<div class="bg-surface-900 h-8 flex border-r border-t border-surface-950">
	{#each pages as page}
		<button
			class="flex items-center hover:bg-surface-950 border-l border-r border-surface-950 px-4"
			onclick={() => {
				file.view = page.id;
			}}>{page.label}</button
		>
	{/each}
</div>
