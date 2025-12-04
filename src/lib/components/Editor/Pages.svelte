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

<div class="bg-cyan-500 h-8 flex border-r border-t border-cyan-600">
	{#each pages as page}
		<button
			class="flex items-center hover:bg-cyan-600 border-l border-r border-cyan-600 px-4"
			onclick={() => {
				file.view = page.id;
			}}>{page.label}</button
		>
	{/each}
</div>
