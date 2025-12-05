export const getFileIcon = (name: string): string => {
	const ext = name.split('.').pop()?.toLowerCase();
	switch (ext) {
		case 'ts':
		case 'tsx':
			return '🔷';
		case 'js':
		case 'jsx':
			return '🟨';
		case 'svelte':
			return '🔶';
		case 'css':
			return '🎨';
		case 'json':
			return '📋';
		case 'md':
			return '📝';
		case 'html':
			return '🌐';
		default:
			return '📄';
	}
};
