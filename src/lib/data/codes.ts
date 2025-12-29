export const jsonPackage = `{
	"name": "ramzykemmoun-portfolio",
	"private": true,
	"version": "0.0.1",
	"type": "module",
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"preview": "vite preview",
		"prepare": "svelte-kit sync || echo ''",
		"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
		"check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch",
		"format": "prettier --write .",
		"lint": "prettier --check . && eslint .",
		"test:unit": "vitest",
		"test": "npm run test:unit -- --run && npm run test:e2e",
		"test:e2e": "playwright test",
		"storybook": "storybook dev -p 6006",
		"build-storybook": "storybook build"
	},
	"devDependencies": {
		"@eslint/compat": "^1.4.0",
		"@eslint/js": "^9.39.1",
		"@fontsource/ibm-plex-mono": "^5.2.7",
		"@playwright/test": "^1.56.1",
		"@shikijs/transformers": "^3.19.0",
		"@storybook/addon-svelte-csf": "^5.0.10",
		"@storybook/sveltekit": "10.1.0",
		"@sveltejs/adapter-auto": "^7.0.0",
		"@sveltejs/kit": "^2.48.5",
		"@sveltejs/vite-plugin-svelte": "^6.2.1",
		"@tailwindcss/forms": "^0.5.10",
		"@tailwindcss/typography": "^0.5.19",
		"@tailwindcss/vite": "^4.1.17",
		"@types/node": "^22",
		"@vitest/browser-playwright": "^4.0.10",
		"eslint": "^9.39.1",
		"eslint-config-prettier": "^10.1.8",
		"eslint-plugin-storybook": "10.1.0",
		"eslint-plugin-svelte": "^3.13.0",
		"globals": "^16.5.0",
		"mdsvex": "^0.12.6",
		"node-html-parser": "^7.0.1",
		"playwright": "^1.56.1",
		"prettier": "^3.6.2",
		"prettier-plugin-svelte": "^3.4.0",
		"prettier-plugin-tailwindcss": "^0.7.1",
		"shiki": "^3.19.0",
		"storybook": "10.1.0",
		"svelte": "^5.43.8",
		"svelte-check": "^4.3.4",
		"svelte-preprocess-import-assets": "^1.1.0",
		"tailwindcss": "^4.1.17",
		"typescript": "^5.9.3",
		"typescript-eslint": "^8.47.0",
		"vite": "^7.2.2",
		"vite-plugin-devtools-json": "^1.0.0",
		"vitest": "^4.0.10",
		"vitest-browser-svelte": "^2.0.1"
	},
	"dependencies": {
		"@huggingface/inference": "^4.13.5",
		"@lucide/svelte": "^0.555.0",
		"@monaco-editor/loader": "^1.7.0",
		"@skeletonlabs/skeleton": "^4.7.2",
		"@skeletonlabs/skeleton-svelte": "^4.7.2",
		"@threlte/core": "^8.3.1",
		"@threlte/extras": "^9.7.1",
		"@types/three": "^0.181.0",
		"clsx": "^2.1.1",
		"monaco-editor": "^0.55.1",
		"tailwind-merge": "^3.4.0",
		"three": "^0.181.2"
	}
}`;
export const tsconfigJson = `{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"],
      "@payload-config": ["./payload.config.ts"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts",
    "next.config.mjs"
  ],
  "exclude": ["node_modules"]
}`;

export const nextConfig = `import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig = {
  headers: async () => {
    return [
      {
        source: "/api/(.*)",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,POST,PUT,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, x-apollo-operation-name",
          },
        ],
      },
    ];
  },

  serverExternalPackages: ["payload", "@payloadcms/db-vercel-postgres"],
};

export default withPayload(nextConfig);`;
const bt = '`';

export const readme = `# 🖥️ Ramzy KEMMOUN - Portfolio

<div align="center">

![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-1E1E1E?style=for-the-badge&logo=visual-studio-code&logoColor=white)

**A unique VS Code-inspired portfolio that showcases my work as an interactive code editor experience.**

[Live Demo](https://ramzykemmoun.dev) • [GitHub](https://github.com/ramzykemmoun)

</div>

---

## ✨ Features

- **VS Code UI** - Authentic IDE experience with sidebar, tabs, terminal, and file explorer
- **Monaco Editor** - Real syntax highlighting with multiple themes
- **AI Chat Assistant** - Interactive AI panel powered by Hugging Face
- **Multiple Themes** - Cursor, One Dark Pro, Dracula, Tokyo Night, and more
- **Fully Responsive** - Optimized for desktop, tablet, and mobile
- **3D Elements** - Three.js powered visuals with Threlte

## 🛠️ Tech Stack

| Category         | Technologies               |
| --------------- | -------------------------- |
| **Framework** | SvelteKit 2, Svelte 5      |
| **Styling** | TailwindCSS 4, Skeleton UI |
| **Editor** | Monaco Editor              |
| **3D Graphics** | Three.js, Threlte          |
| **AI** | Hugging Face Inference     |
| **Testing** | Vitest, Playwright         |
| **Docs** | Storybook                  |

## 🚀 Quick Start

${bt}${bt}${bt}bash
# Clone the repository
git clone https://github.com/ramzykemmoun/portfolio.git
cd portfolio

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
${bt}${bt}${bt}

## 📁 Project Structure

${bt}${bt}${bt}
src/
├── lib/
│   ├── components/
│   │   ├── Agent/         # AI chat panel
│   │   ├── Editor/        # Code editor & sections
│   │   ├── Navbar/        # Top navigation bar
│   │   ├── Sidebar/       # File explorer & panels
│   │   └── Terminal/      # Terminal component
│   ├── data/
│   │   └── sections/      # Portfolio content data
│   └── stores/           # Svelte stores
├── routes/
│   └── themes/           # Editor themes
└── stories/              # Storybook stories
${bt}${bt}${bt}

## 🎨 Available Themes

- Cursor
- One Dark Pro
- Dracula
- GitHub Theme
- Tokyo Night
- Catppuccin

## 📱 Responsive Breakpoints

| Screen                  | Behavior                                       |
| ----------------------- | ---------------------------------------------- |
| **Desktop** (>1024px)   | Full layout with sidebar, editor, and AI panel |
| **Tablet** (768-1024px) | Collapsed agent panel                          |
| **Mobile** (<768px)     | Bottom navigation, full-width editor           |

## 📄 License

MIT © [Ramzy KEMMOUN](https://github.com/ramzykemmoun)

---

<div align="center">

**Built by Ramzy KEMMOUN and FREE PALESTINE!!!**

</div>`;

export const packageLockJson = `//too long haha`;

export const envCode = `PORT=8000
DB_URI=dont_think_you_are_hacker_just_because_you_found_an_env_file
DB_NAME=dont_think_you_are_hacker_just_because_you_found_an_env_file
DB_USER=dont_think_you_are_hacker_just_because_you_found_an_env_file
DB_PASSWORD=dont_think_you_are_hacker_just_because_you_found_an_env_file
`;

export const tailwindConfig = `import defaultConfig from "@skeletonlabs/skeleton-svelte/tailwind.config";

/** @type {import('tailwindcss').Config} */
export default {
	...defaultConfig,
	content: [
		...defaultConfig.content,
		"./src/**/*.{html,ts,svelte}",
		"./src/**/*.{html,ts,svelte}",
	],
	plugins: [defaultConfig.plugins],
};`;

export const postcssConfig = `
`;

export const gitignore = `# dependencies
node_modules
.pnpm-lock.yaml

# testing
coverage

# production
build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local`;
