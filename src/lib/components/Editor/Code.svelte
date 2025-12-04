<script lang="ts">
	import loader from '@monaco-editor/loader';
	import { onMount, onDestroy } from 'svelte';
	import { sidebar, file } from '$lib/stores/index.svelte';
	import { browser } from '$app/environment';
	import { sectionCodes } from '$lib/data/codes';

	let editor: monaco.editor.IStandaloneCodeEditor | undefined;
	let monaco: typeof import('monaco-editor') | undefined;
	let editorContainer: HTMLElement;

	onMount(async () => {
		if (!browser) return;

		monaco = await loader.init();

		monaco.editor.defineTheme('cursor', {
			base: 'vs-dark',
			inherit: true,
			rules: [
				{ token: 'comment', foreground: '5c6370' },
				{ token: 'number', foreground: 'd19a66' },
				{ token: 'string', foreground: '98c379' },
				{ token: 'keyword', foreground: 'c678dd' },
				{ token: 'variable', foreground: 'e06c75' },
				{ token: 'identifier', foreground: '61afef' },
				{ token: 'type', foreground: '56b6c2' },
				{ token: 'tag', foreground: 'e06c75' },
				{ token: 'attribute.name', foreground: 'd19a66' }
			],
			colors: {
				'editor.foreground': '#abb2bf',
				'editor.background': '#1e1e1e',
				'editorCursor.foreground': '#abb2bf',
				'editor.selectionBackground': '#3e4451',
				'editorLineNumber.foreground': '#4b5263',
				'editorLineNumber.activeForeground': '#abb2bf',
				'editorWhitespace.foreground': '#3e4451',
				'editorBracketMatch.border': '#61afef'
			}
		});

		editor = monaco.editor.create(editorContainer, {
			value: sectionCodes[file.section],
			language: 'javascript',
			theme: 'cursor',
			automaticLayout: true,
			autoClosingQuotes: 'always',
			autoClosingBrackets: 'always',
			autoClosingTags: 'always',
			minimap: { enabled: true },
			scrollBeyondLastLine: false,
			fontSize: 14,
			lineHeight: 22
		});
	});

	$effect(() => {
		sidebar.open;
		sidebar.width;
		file.section;

		if (editor) {
			editor.setValue(sectionCodes[file.section]);
			editor.layout();
		}
	});

	onDestroy(() => {
		editor?.dispose();
		monaco?.editor.getModels().forEach((model) => model.dispose());
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
