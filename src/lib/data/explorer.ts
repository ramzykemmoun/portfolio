export const rootNode = {
	id: 'root',
	icon: 'Folder',
	children: [
		{
			id: 'node_modules',
			name: 'node_modules',
			icon: 'Package',
			children: []
		},
		{
			id: 'public',
			name: 'public',
			icon: 'Folder',
			children: [
				{
					id: 'public/assets',
					name: 'assets',
					icon: 'Folder',
					children: []
				}
			]
		},
		{
			id: 'src',
			name: 'src',
			icon: 'Folder',
			children: [
				{
					id: 'src/sections',
					name: 'sections',
					icon: 'Folder',
					children: [
						{
							id: 'aboutMe',
							name: 'AboutMe.tsx',
							icon: 'Code',
							isClickable: true
						},
						{
							id: 'projects',
							name: 'Projects.tsx',
							icon: 'Code',
							isClickable: true
						},
						{
							id: 'experiences',
							name: 'Experiences.tsx',
							icon: 'Code',
							isClickable: true
						},
						{
							id: 'skills',
							name: 'Skills.tsx',
							icon: 'Code',
							isClickable: true
						},
						{
							id: 'education',
							name: 'Education.tsx',
							icon: 'Code',
							isClickable: true
						}
					]
				},

				{ id: 'src/global.css', name: 'global.css', icon: 'Settings' }
			]
		},
		{ id: 'package.json', name: 'package.json', icon: 'Package' },
		{ id: 'tsconfig.json', name: 'tsconfig.json', icon: 'Package' },
		{ id: 'vite.config.ts', name: 'vite.config.ts', icon: 'Package' },
		{ id: 'README.md', name: 'README.md', icon: 'Book' },
		{ id: 'tailwind.config.js', name: 'tailwind.config.js', icon: 'Settings' },
		{ id: 'postcss.config.js', name: 'postcss.config.js', icon: 'Settings' },
		{ id: 'package-lock.json', name: 'package-lock.json', icon: 'Package' }
	]
};
