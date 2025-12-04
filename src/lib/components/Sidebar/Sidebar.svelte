<script lang="ts">
	import { Skull, Activity, FileSymlink } from '@lucide/svelte';
	import Explorer from './Explorer.svelte';
	import { section } from '$lib/stores/section.svelte';
	import { cn } from '$lib/utils';

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
	let sidebarWidth = $state(256);

	let open = $state(false);

	$inspect(sidebarWidth);
	$inspect(open);

	const startResize = (e: MouseEvent) => {
		e.preventDefault();
		isResizing = true;
	};

	const changeSection = (tag: string) => {
		if (open && section.tag === tag) {
			open = false;
		} else {
			open = true;
			section.tag = tag;
		}
	};
</script>

<div class="bg-green-500 flex flex-col">
	<div class="flex flex-1 h-full">
		<ul class="w-12 px-4 py-2">
			{#each Object.entries(links) as [key, link]}
				<li class="flex items-center justify-center">
					<button
						type="button"
						class={cn('btn-icon', section.tag === key && open && 'preset-filled-surface-500')}
						onclick={() => changeSection(key)}
					>
						<link.icon />
					</button>
				</li>
			{/each}
		</ul>

		{#if open}
			<Explorer bind:isResizing bind:sidebarWidth />
			<div
				onmousedown={startResize}
				class="w-4 cursor-col-resize bg-blue-700 hover:bg-blue-900 shrink-0"
			></div>
		{/if}
	</div>
</div>
