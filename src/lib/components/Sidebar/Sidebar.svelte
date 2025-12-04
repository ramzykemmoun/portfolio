<script lang="ts">
	import { Skull, Activity, FileSymlink } from '@lucide/svelte';
	import Explorer from './Explorer.svelte';
	import { section } from '$lib/stores/section.svelte';
	import { cn } from '$lib/utils';
	import { sidebar } from '$lib/stores/sidebar.svelte';
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

	let isResizing = $state(false);

	const startResize = (e: MouseEvent) => {
		e.preventDefault();
		isResizing = true;
	};

	const changeSection = (tag: string) => {
		if (sidebar.open && section.tag === tag) {
			sidebar.open = false;
		} else {
			sidebar.open = true;
			section.tag = tag;
		}
	};
</script>

<div class="bg-green-500 flex-col">
	<div class="flex flex-1 h-full">
		<ul class="w-12 px-4 py-2">
			{#each Object.entries(links) as [key, link]}
				<li class="flex items-center justify-center">
					<button
						type="button"
						class={cn(
							'btn-icon',
							section.tag === key && sidebar.open && 'preset-filled-surface-500'
						)}
						onclick={() => changeSection(key)}
					>
						<link.icon />
					</button>
				</li>
			{/each}
		</ul>

		{#if sidebar.open}
			<Explorer bind:isResizing />
			<div
				role="button"
				tabindex="0"
				aria-label="Back"
				onmousedown={startResize}
				class="w-1 cursor-col-resize bg-blue-700 hover:bg-blue-900 shrink-0"
			></div>
		{/if}
	</div>
</div>
