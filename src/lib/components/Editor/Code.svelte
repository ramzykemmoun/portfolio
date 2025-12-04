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
				// Règles de coloration (syntax highlighting)
				{ token: 'comment', foreground: '5c6370' }, // Gris ardoise doux
				{ token: 'number', foreground: 'd19a66' }, // Marron/Orange (Chiffres)
				{ token: 'string', foreground: '98c379' }, // Vert menthe doux (Strings)
				{ token: 'keyword', foreground: 'c678dd' }, // Violet clair (Mots-clés: function, let, const, etc.)
				{ token: 'variable', foreground: 'e06c75' }, // Rouge rosé (Variables non assignées)
				{ token: 'identifier', foreground: '61afef' }, // Bleu ciel (Noms de fonction/classe)
				{ token: 'type', foreground: '56b6c2' }, // Cyan
				{ token: 'tag', foreground: 'e06c75' }, // Rouge rosé (Tags HTML)
				{ token: 'attribute.name', foreground: 'd19a66' } // Marron/Orange (Noms d'attributs)
			],
			colors: {
				// Couleurs de l'interface
				'editor.foreground': '#abb2bf', // Texte général (Gris clair)
				'editor.background': '#1A1B26', // Fond général de l'éditeur (Noir/Bleu Nuit)
				'editorCursor.foreground': '#abb2bf', // Curseur
				'editor.selectionBackground': '#3e4451', // Sélection de texte
				'editorLineNumber.foreground': '#4b5263', // Numéros de ligne (Gris foncé)
				'editorLineNumber.activeForeground': '#abb2bf', // Numéro de ligne actif
				'editorWhitespace.foreground': '#3e4451', // Espaces blancs
				'editorBracketMatch.border': '#61afef' // Bordure de la paire de crochets (Bleu)
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
			autoClosingPairs: [
				{ open: '{', close: '}' },
				{ open: '[', close: ']' },
				{ open: '(', close: ')' },
				{ open: '<', close: '>' }
			]
		});
	});

	$effect(() => {
		sidebar.open;
		sidebar.width;
		file.section;

		if (editor) {
			editor.setValue(sectionCodes[file.section]);
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
