<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { getFileIcon } from '$lib/utils/icons';
	import { file, agent, terminal } from '$lib/stores/index.svelte';

	let { searchDialogOpen = $bindable() }: { searchDialogOpen: boolean } = $props();

	let commandPalette: HTMLDivElement;
	let searchInput: HTMLInputElement; // Reste pour le bind:this pour le focus

	let searchTerm = $state('');

	const buttons = [
		{
			label: 'Toggle Terminal',
			action: () => {
				terminal.open = !terminal.open;
			}
		},
		{
			label: 'Toggle AI Chat ',
			action: () => {
				agent.open = !agent.open;
			}
		},
		{
			label: 'Contact Ramzy KEMMOUN',
			icon: 'trash',
			action: () => {}
		}
	];

	const files = [
		{
			name: 'AboutMe.tsx',
			action: () => {
				file.section = 'aboutMe';
			}
		},
		{
			name: 'Projects.tsx',
			action: () => {
				file.section = 'projects';
			}
		},
		{
			name: 'Experiences.tsx',
			action: () => {
				file.section = 'experiences';
			}
		},
		{
			name: 'Skills.tsx',
			action: () => {
				file.section = 'skills';
			}
		},
		{
			name: 'Education.tsx',
			action: () => {
				file.section = 'education';
			}
		},
		{ name: 'global.css', action: () => {} },
		{ name: 'package.json', action: () => {} },
		{ name: 'tsconfig.json', action: () => {} },
		{ name: 'vite.config.ts', action: () => {} },
		{ name: 'README.md', action: () => {} },
		{ name: 'tailwind.config.js', action: () => {} },
		{ name: 'postcss.config.js', action: () => {} },
		{ name: 'package-lock.json', action: () => {} }
	];

	let filteredFiles = $derived(
		searchTerm.trim() === ''
			? files
			: files.filter((file) => file.name.toLowerCase().includes(searchTerm.trim().toLowerCase()))
	);

	function handleGlobalEvents(event: KeyboardEvent | MouseEvent) {
		if (!searchDialogOpen) return;

		if (event instanceof KeyboardEvent && event.key === 'Escape') {
			event.preventDefault();
			searchDialogOpen = false;
		}

		if (event instanceof MouseEvent) {
			const target = event.target as Node;
			if (commandPalette && !commandPalette.contains(target) && event.clientY > 30) {
				searchDialogOpen = false;
			}
		}
	}

	onMount(() => {
		if (!browser) return;

		window.addEventListener('keydown', handleGlobalEvents);
		window.addEventListener('click', handleGlobalEvents);

		if (searchInput) {
			searchInput.focus();
		}
	});

	onDestroy(() => {
		if (!browser) return;

		window.removeEventListener('keydown', handleGlobalEvents);
		window.removeEventListener('click', handleGlobalEvents);
	});

	function handleInputKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			searchDialogOpen = false;
		}
	}
</script>

<div
	bind:this={commandPalette}
	class="flex flex-col w-200 max-w-lg bg-surface-900 p-3 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 rounded-lg shadow-2xl"
>
	<input
		bind:this={searchInput}
		bind:value={searchTerm}
		on:keydown={handleInputKeydown}
		type="text"
		placeholder="Search files by name (append : to go to lines or @ to go to symbol)"
		class="bg-transparent text-white border-b-2 border-surface-200 p-2 outline-none focus:border-color-primary-500 transition-colors duration-200"
	/>
	<div class="flex flex-col gap-1 mt-2 max-h-60 overflow-y-auto">
		{#each buttons as button}
			<div
				class="flex items-center gap-3 hover:bg-surface-200/20 px-2 py-1 cursor-pointer rounded-md text-color-primary-500 font-semibold transition-colors duration-150"
				on:click={button.action}
			>
				{button.label}
			</div>
		{/each}
	</div>

	<div class="flex flex-col gap-1 mt-2 max-h-40 overflow-y-auto border-t border-surface-200 pt-2">
		{#each filteredFiles as file}
			<div
				class="flex items-center gap-3 hover:bg-surface-200/20 px-2 py-1 cursor-pointer rounded-md text-white transition-colors duration-150"
				on:click={file.action}
			>
				{getFileIcon(file.name)}
				{file.name}
			</div>
		{/each}
	</div>
</div>
