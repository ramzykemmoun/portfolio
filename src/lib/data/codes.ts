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
DB_URI=found_env_file_doesnt_make_you_hacker_haha
DB_NAME=found_env_file_doesnt_make_you_hacker_haha
DB_USER=found_env_file_doesnt_make_you_hacker_haha
DB_PASSWORD=found_env_file_doesnt_make_you_hacker_haha
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

export const postcssConfig = `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    require('autoprefixer'),
    require('postcss-nested')
  ]
}

module.exports = config`;

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

export const globalCss = `@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --font-montserrat: "Montserrat", sans-serif;
  --font-k2d: "K2D", sans-serif;
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50 font-montserrat;
  }
  body {
    @apply bg-background text-foreground;
  }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 10px;
}

.custom-scrollbar {
  scrollbar-color: #4b5563 #f1f1f1;
  scrollbar-width: thin;
}`;
