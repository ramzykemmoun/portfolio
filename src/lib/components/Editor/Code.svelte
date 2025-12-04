<script lang="ts">
	import loader from '@monaco-editor/loader';
	import { onMount, onDestroy } from 'svelte';
	import { sidebar } from '$lib/stores/sidebar.svelte';
	import { browser } from '$app/environment';

	let editor: monaco.editor.IStandaloneCodeEditor | undefined;
	let monaco: typeof import('monaco-editor') | undefined;
	let editorContainer: HTMLElement;

	onMount(async () => {
		if (!browser) return;

		monaco = await loader.init();

		editor = monaco.editor.create(editorContainer, {
			value: 'const x = 5;',
			language: 'javascript',
			theme: 'vs-dark',
			automaticLayout: true,
			autoClosingQuotes: 'always',
			autoClosingBrackets: 'always',
			autoClosingTags: 'always',
			autoClosingPairs: [
				{ open: '{', close: '}' },
				{ open: '[', close: ']' },
				{ open: '(', close: ')' },
				{ open: '<', close: '>' }
			]
		});
	});

	$effect(() => {
		sidebar.isOpen;
		sidebar.width;
		if (editor) {
			editor.layout({ width: 0, height: 0 });
			window.requestAnimationFrame(() => {
				const rect = editorContainer.getBoundingClientRect();
				editor.layout({ width: rect.width, height: rect.height });
			});
		}
	});

	onDestroy(() => {
		editor?.dispose();
		monaco?.editor.getModels().forEach((model) => model.dispose());
	});
</script>

<div class="flex-1">
	<div bind:this={editorContainer} class="h-full"></div>
</div>
