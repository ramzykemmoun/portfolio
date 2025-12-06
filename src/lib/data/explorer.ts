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
					id: 'src/components',
					name: 'components',
					icon: 'Folder',
					children: [
						{
							id: 'aboutMe',
							name: 'AboutMe.tsx',
							icon: 'Code',
							isClickable: true
						},
						{
							id: 'education',
							name: 'Education.tsx',
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
							id: 'projects',
							name: 'Projects.tsx',
							icon: 'Code',
							isClickable: true
						},
						{
							id: 'testimonials',
							name: 'Testimonials.tsx',
							icon: 'Code',
							isClickable: true
						},
						{
							id: 'skills',
							name: 'Skills.tsx',
							icon: 'Code',
							isClickable: true
						},

					]
				},

				{ id: 'src/global.css', name: 'global.css', icon: 'Settings' }
			]
		},
		{ id: 'gitignore', name: '.gitignore', icon: 'Package' },
		{ id: 'packageJson', name: 'package.json', icon: 'Package' },
		{ id: 'tsconfigJson', name: 'tsconfig.json', icon: 'Package' },
		{ id: 'nextConfig', name: 'next.config.ts', icon: 'Package' },
		{ id: 'postcssConfig', name: 'postcss.config.mjs', icon: 'Package' },
		{ id: 'readme', name: 'README.md', icon: 'Book' },
		{ id: 'tailwindConfig', name: 'tailwind.config.js', icon: 'Settings' },
		{ id: 'packageLockJson', name: 'package-lock.json', icon: 'Package' }
	]
};
