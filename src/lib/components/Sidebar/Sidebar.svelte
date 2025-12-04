<script lang="ts">
	import Explorer from './Explorer.svelte';
	import { sidebar } from '$lib/stores/index.svelte';
	import { cn } from '$lib/utils';
	import { sections } from '$lib/data/index.ts';

	let isResizing = $state(false);

	const startResize = (e: MouseEvent) => {
		e.preventDefault();
		isResizing = true;
	};

	const changeSection = (section: string) => {
		if (sidebar.open && sidebar.section === section) {
			sidebar.open = false;
		} else {
			sidebar.open = true;
			sidebar.section = section;
		}
	};
</script>

<div class="bg-surface-900 flex-col">
	<div class="flex flex-1 h-full">
		<ul class="w-12 px-4 py-2">
			{#each Object.entries(sections) as [key, section]}
				<li class="flex items-center justify-center">
					<button
						type="button"
						class={cn('btn-icon', sidebar.section === key && sidebar.open && 'bg-surface-800')}
						onclick={() => changeSection(key)}
					>
						<section.icon />
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
				class="w-1 cursor-col-resize bg-surface-900 hover:bg-surface-700 shrink-0"
			></div>
		{/if}
	</div>
</div>
