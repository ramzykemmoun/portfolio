<script lang="ts">
	import { ChevronRight } from '@lucide/svelte';
	const routes = [
		{
			label: 'Sidebar.svelte',
			href: '/sidebar'
		},
		{
			label: 'Live Preview',
			href: '/editor'
		}
	];
</script>

<div class="bg-cyan-500 h-8 flex border-r border-t border-cyan-600">
	{#each routes as route}
		<button
			class="flex items-center hover:bg-cyan-600 border-l border-r border-cyan-600 px-4"
			onclick={() => navigate(route.href)}>{route.label}</button
		>
	{/each}
</div>
