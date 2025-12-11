<script lang="ts">
	import react from '$lib/assets/icons/react.svg';
	import ts from '$lib/assets/icons/typescript.svg';
	import js from '$lib/assets/icons/javascript.svg';
	import css from '$lib/assets/icons/css.svg';
	import reactTs from '$lib/assets/icons/react_ts.svg';
	import json from '$lib/assets/icons/json.svg';
	import git from '$lib/assets/icons/git.svg';
	import md from '$lib/assets/icons/markdown.svg';
	import nodejs from '$lib/assets/icons/nodejs.svg';
	import nextjs from '$lib/assets/icons/next.svg';
	import settings from '$lib/assets/icons/settings.svg';
	import folderComponent from '$lib/assets/icons/folder-components.svg';
	import folderNodeModules from '$lib/assets/icons/folder-node.svg';
	import folderSrc from '$lib/assets/icons/folder-src.svg';
	import folderAssets from '$lib/assets/icons/folder-config.svg';
	import folderPublic from '$lib/assets/icons/folder-public.svg';

	let { icon, size = 18 }: { icon: string; size?: number } = $props();

	function getIcon(ext: string): string {
		switch (ext) {
			case 'jsx':
				return react;
			case 'tsx':
				return reactTs;
			case 'json':
				return json;
			case 'ts':
				return ts;
			case 'js':
			case 'mjs':
				return js;
			case 'git':
				return git;
			case 'css':
				return css;
			case 'md':
				return md;
			case 'nodejs':
				return nodejs;
			case 'nextjs':
				return nextjs;
			case 'env':
				return settings;
			case 'folder-component':
				return folderComponent;
			case 'folder-node_modules':
				return folderNodeModules;
			case 'folder-src':
				return folderSrc;
			case 'folder-assets':
				return folderAssets;
			case 'folder-public':
				return folderPublic;
			default:
				return react;
		}
	}
	let src = $derived(getIcon(icon));
</script>

<div>
	<img {src} alt={icon} width={size} height={size} />
</div>
