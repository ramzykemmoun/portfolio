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

<div class="bg-surface-900 h-8 flex border border-surface-950">
	{#each routes as route}
		<button class="flex items-center hover:bg-surface-950 pl-2"
			>{route.label}<ChevronRight class="w-5 h-5" /></button
		>
	{/each}
</div>
