<script lang="ts">
	import { ChevronRight } from '@lucide/svelte';
	const routes = [
		{
			label: 'Dashboard',
			href: '/dashboard'
		},
		{
			label: 'Search',
			href: '/search'
		},
		{
			label: 'Settings',
			href: '/settings'
		}
	];
</script>

<div class="bg-cyan-500 h-8 flex border border-cyan-600">
	{#each routes as route}
		<button class="flex items-center hover:bg-cyan-600 pl-2" onclick={() => navigate(route.href)}
			>{route.label}<ChevronRight class="w-5 h-5" /></button
		>
	{/each}
</div>
