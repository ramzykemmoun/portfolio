<script lang="ts">
	import loader from '@monaco-editor/loader';
	import { onMount, onDestroy } from 'svelte';
	import { sidebar, file, config } from '$lib/stores/index.svelte';
	import { browser } from '$app/environment';
	import { sectionCodes } from '$lib/data/sections';
	import themes from '$lib/data/themes';

	let editor: any;
	let monaco: any;
	let editorContainer: HTMLElement;

	onMount(async () => {
		if (!browser) return;

		monaco = await loader.init();
		if (!monaco) return;

		monaco.editor.defineTheme(config.theme, themes[config.theme as keyof typeof themes]);

		editor = monaco.editor.create(editorContainer, {
			value: sectionCodes[file.section as keyof typeof sectionCodes] as string,
			language: 'typescript',
			theme: config.theme,
			automaticLayout: true,
			autoClosingQuotes: 'always',
			autoClosingBrackets: 'always',
			scrollBeyondLastLine: false,
			fontSize: 14,
			lineHeight: 22,
			minimap: {
				enabled: true
			}
		});
	});

	$effect(() => {
		sidebar.open;
		sidebar.width;
		file.section;

		if (editor) {
			editor.setValue(sectionCodes[file.section as keyof typeof sectionCodes] as string);
			editor.layout();
		}
	});

	$effect(() => {
		config.theme;
		if (editor) {
			monaco.editor.defineTheme(config.theme, themes[config.theme as keyof typeof themes]);
			editor.updateOptions({ theme: config.theme });
		}
	});

	onDestroy(() => {
		editor?.dispose();
		monaco?.editor.getModels().forEach((model: any) => model.dispose());
	});
</script>

<div class="code-container" bind:this={editorContainer}></div>

<style>
	.code-container {
		width: 100%;
		height: 100%;
		min-height: 100px;
	}
</style>
