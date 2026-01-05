export const rootNode = {
	id: 'root',
	icon: 'Folder',
	children: [
		{
			id: 'node_modules',
			name: 'node_modules',
			icon: 'Folder',
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
							icon: 'react.ts',
							isClickable: true,
							hasPreview: true
						},
						{
							id: 'education',
							name: 'Education.tsx',
							icon: 'react.ts',
							isClickable: true,
							hasPreview: true
						},
						{
							id: 'experiences',
							name: 'Experiences.tsx',
							icon: 'react.ts',
							isClickable: true,
							hasPreview: true
						},
						{
							id: 'projects',
							name: 'Projects.tsx',
							icon: 'react.ts',
							isClickable: true,
							hasPreview: true
						},
						{
							id: 'testimonials',
							name: 'Testimonials.tsx',
							icon: 'react.ts',
							isClickable: true,
							hasPreview: true
						},
						{
							id: 'skills',
							name: 'Skills.tsx',
							icon: 'react.ts',
							isClickable: true,
							hasPreview: true
						},
						{
							id: 'contact',
							name: 'Contact.tsx',
							icon: 'react.ts',
							isClickable: true,
							hasPreview: true
						}
					]
				},

				{ id: 'src/global.css', name: 'global.css', icon: 'css', isClickable: true }
			]
		},
		{ id: 'env', name: '.env', icon: 'env', isClickable: true },
		{ id: 'gitignore', name: '.gitignore', icon: 'git', isClickable: true },
		{ id: 'jsonPackage', name: 'package.json', icon: 'nodejs', isClickable: true },
		{ id: 'packageLockJson', name: 'package-lock.json', icon: 'nodejs', isClickable: true },
		{ id: 'tailwindConfig', name: 'tailwind.config.js', icon: 'js', isClickable: true },
		{ id: 'nextConfig', name: 'next.config.ts', icon: 'nextjs', isClickable: true },
		{ id: 'postcssConfig', name: 'postcss.config.mjs', icon: 'js', isClickable: true },
		{ id: 'readme', name: 'README.md', icon: 'md', isClickable: true },
		{ id: 'tsconfigJson', name: 'tsconfig.json', icon: 'ts', isClickable: true }
	]
};
