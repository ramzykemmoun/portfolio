<script lang="ts">
	import react from '$lib/assets/logos/react.svg';

	let { icon, size = 18 }: { icon: string; size?: number } = $props();

	function getIcon(ext: string): string {
		switch (ext) {
			case 'jsx':
			case 'tsx':
			case 'react':
				return react;
			case 'ts':
			case 'js':
				return react;
			default:
				return react;
		}
	}
	let src = $derived(getIcon(icon));
</script>

<div>
	<img {src} alt={icon} width={size} height={size} />
</div>
