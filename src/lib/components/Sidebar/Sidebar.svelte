<script lang="ts">
	import { Skull, Activity, FileSymlink } from '@lucide/svelte';
	import Explorer from './Explorer.svelte';
	import { section } from '$lib/stores/section.svelte';

	const links = {
		main: {
			label: 'Dashboard',
			icon: Skull
		},
		search: {
			label: 'Search',
			icon: FileSymlink
		},
		settings: {
			label: 'Settings',
			icon: Activity
		}
	};

	let open = $state(false);

	const changeSection = (tag: string) => {
		if (section.tag === tag) {
			open = !open;
		} else {
			section.tag = tag;
		}
	};
</script>

<div class="bg-green-500">
	<div class="flex">
		<ul>
			{#each Object.entries(links) as [key, link]}
				<li>
					<button type="button" class="btn preset-tonal-surface" onclick={() => changeSection(key)}
						>{link.label}</button
					>
				</li>
			{/each}
		</ul>

		{#if open}
			<Explorer />
		{/if}
	</div>
</div>
