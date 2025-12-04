import { codeToHtml, createHighlighter } from 'shiki';

async function highlighter(code: string, lang: string, meta: string) {
	await createHighlighter({
		langs: ['typescript'],
		themes: ['github-dark']
	});
	const html = codeToHtml(code, {
		lang: 'typescript',
		themes: {
			githubDark: 'github-dark'
		}
	});

	return html;
}

export default highlighter;
