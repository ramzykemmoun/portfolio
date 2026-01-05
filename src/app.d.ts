// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

declare module '*&url' {
	const content: string;
	export default content;
}

declare module '*.jfif' {
	const value: string;
	export default value;
}

declare module '@vercel/analytics/sveltekit';
