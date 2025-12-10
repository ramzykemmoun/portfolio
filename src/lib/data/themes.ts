const themes = {
	cursor: {
		base: 'vs-dark',
		inherit: true,
		rules: [
			{ token: 'comment', foreground: '5c6370' },
			{ token: 'number', foreground: 'd19a66' },
			{ token: 'string', foreground: '98c379' },
			{ token: 'keyword', foreground: 'c678dd' },
			{ token: 'variable', foreground: 'e06c75' },
			{ token: 'identifier', foreground: '61afef' },
			{ token: 'type', foreground: '56b6c2' },
			{ token: 'tag', foreground: 'e06c75' },
			{ token: 'attribute.name', foreground: 'd19a66' }
		],
		colors: {
			'editor.foreground': '#abb2bf',
			'editor.background': '#1e1e1e',
			'editorCursor.foreground': '#abb2bf',
			'editor.selectionBackground': '#3e4451',
			'editorLineNumber.foreground': '#4b5263',
			'editorLineNumber.activeForeground': '#abb2bf',
			'editorWhitespace.foreground': '#3e4451',
			'editorBracketMatch.border': '#61afef'
		}
	},
	'one-dark-pro': {
		base: 'vs-dark',
		inherit: true,
		rules: [
			{ token: 'comment', foreground: '5c6370', fontStyle: 'italic' },
			{ token: 'keyword', foreground: 'c678dd' },
			{ token: 'string', foreground: '98c379' },
			{ token: 'number', foreground: 'd19a66' },
			{ token: 'type', foreground: 'e5c07b' },
			{ token: 'class', foreground: 'e5c07b' },
			{ token: 'function', foreground: '61afef' },
			{ token: 'variable', foreground: 'abb2bf' },
			{ token: 'operator', foreground: '56b6c2' },
			{ token: 'tag', foreground: 'e06c75' }
		],
		colors: {
			'editor.background': '#282c34',
			'editor.foreground': '#abb2bf',
			'editorCursor.foreground': '#528bff',
			'editor.lineHighlightBackground': '#2c313c',
			'editor.selectionBackground': '#3e4451',
			'editorLineNumber.foreground': '#4b5263',
			'editorLineNumber.activeForeground': '#abb2bf'
		}
	},
	dracula: {
		base: 'vs-dark',
		inherit: true,
		rules: [
			{ token: 'comment', foreground: '6272a4' },
			{ token: 'keyword', foreground: 'ff79c6' },
			{ token: 'string', foreground: 'f1fa8c' },
			{ token: 'number', foreground: 'bd93f9' },
			{ token: 'type', foreground: '8be9fd' },
			{ token: 'class', foreground: '8be9fd' },
			{ token: 'function', foreground: '50fa7b' },
			{ token: 'variable', foreground: 'f8f8f2' },
			{ token: 'operator', foreground: 'ff79c6' },
			{ token: 'tag', foreground: 'ff79c6' }
		],
		colors: {
			'editor.background': '#282a36',
			'editor.foreground': '#f8f8f2',
			'editorCursor.foreground': '#f8f8f0',
			'editor.lineHighlightBackground': '#44475a',
			'editor.selectionBackground': '#44475a',
			'editorLineNumber.foreground': '#6272a4',
			'editorLineNumber.activeForeground': '#f8f8f2'
		}
	},
	'github-theme': {
		base: 'vs-dark',
		inherit: true,
		rules: [
			{ token: 'comment', foreground: '8b949e' },
			{ token: 'keyword', foreground: 'ff7b72' },
			{ token: 'string', foreground: 'a5d6ff' },
			{ token: 'number', foreground: '79c0ff' },
			{ token: 'type', foreground: 'ff7b72' },
			{ token: 'class', foreground: 'f0883e' },
			{ token: 'function', foreground: 'd2a8ff' },
			{ token: 'variable', foreground: 'c9d1d9' },
			{ token: 'operator', foreground: 'c9d1d9' },
			{ token: 'tag', foreground: '7ee787' }
		],
		colors: {
			'editor.background': '#0d1117',
			'editor.foreground': '#c9d1d9',
			'editorCursor.foreground': '#58a6ff',
			'editor.lineHighlightBackground': '#161b22',
			'editor.selectionBackground': '#1f6feb44',
			'editorLineNumber.foreground': '#6e7681',
			'editorLineNumber.activeForeground': '#c9d1d9'
		}
	},
	'tokyo-night': {
		base: 'vs-dark',
		inherit: true,
		rules: [
			{ token: 'comment', foreground: '565f89', fontStyle: 'italic' },
			{ token: 'keyword', foreground: 'bb9af7' },
			{ token: 'string', foreground: '9ece6a' },
			{ token: 'number', foreground: 'ff9e64' },
			{ token: 'type', foreground: '2ac3de' },
			{ token: 'class', foreground: '7dcfff' },
			{ token: 'function', foreground: '7aa2f7' },
			{ token: 'variable', foreground: 'c0caf5' },
			{ token: 'operator', foreground: '89ddff' },
			{ token: 'tag', foreground: 'f7768e' }
		],
		colors: {
			'editor.background': '#1a1b26',
			'editor.foreground': '#c0caf5',
			'editorCursor.foreground': '#c0caf5',
			'editor.lineHighlightBackground': '#292e42',
			'editor.selectionBackground': '#33467c',
			'editorLineNumber.foreground': '#565f89',
			'editorLineNumber.activeForeground': '#a9b1d6'
		}
	},
	catppuccin: {
		base: 'vs-dark',
		inherit: true,
		rules: [
			{ token: 'comment', foreground: '6c7086', fontStyle: 'italic' },
			{ token: 'keyword', foreground: 'cba6f7' },
			{ token: 'string', foreground: 'a6e3a1' },
			{ token: 'number', foreground: 'fab387' },
			{ token: 'type', foreground: 'f9e2af' },
			{ token: 'class', foreground: 'f9e2af' },
			{ token: 'function', foreground: '89b4fa' },
			{ token: 'variable', foreground: 'cdd6f4' },
			{ token: 'operator', foreground: '89dceb' },
			{ token: 'tag', foreground: 'f38ba8' }
		],
		colors: {
			'editor.background': '#1e1e2e',
			'editor.foreground': '#cdd6f4',
			'editorCursor.foreground': '#f5e0dc',
			'editor.lineHighlightBackground': '#313244',
			'editor.selectionBackground': '#585b70',
			'editorLineNumber.foreground': '#6c7086',
			'editorLineNumber.activeForeground': '#cdd6f4'
		}
	},
	monokai: {
		base: 'vs-dark',
		inherit: true,
		rules: [
			{ token: 'comment', foreground: '75715e' },
			{ token: 'keyword', foreground: 'f92672' },
			{ token: 'string', foreground: 'e6db74' },
			{ token: 'number', foreground: 'ae81ff' },
			{ token: 'type', foreground: '66d9ef' },
			{ token: 'class', foreground: 'a6e22e' },
			{ token: 'function', foreground: 'a6e22e' },
			{ token: 'variable', foreground: 'f8f8f2' },
			{ token: 'operator', foreground: 'f92672' },
			{ token: 'tag', foreground: 'f92672' }
		],
		colors: {
			'editor.background': '#272822',
			'editor.foreground': '#f8f8f2',
			'editorCursor.foreground': '#f8f8f0',
			'editor.lineHighlightBackground': '#3e3d32',
			'editor.selectionBackground': '#49483e',
			'editorLineNumber.foreground': '#90908a',
			'editorLineNumber.activeForeground': '#f8f8f2'
		}
	},
	nord: {
		base: 'vs-dark',
		inherit: true,
		rules: [
			{ token: 'comment', foreground: '616e88' },
			{ token: 'keyword', foreground: '81a1c1' },
			{ token: 'string', foreground: 'a3be8c' },
			{ token: 'number', foreground: 'b48ead' },
			{ token: 'type', foreground: '8fbcbb' },
			{ token: 'class', foreground: '8fbcbb' },
			{ token: 'function', foreground: '88c0d0' },
			{ token: 'variable', foreground: 'd8dee9' },
			{ token: 'operator', foreground: '81a1c1' },
			{ token: 'tag', foreground: '81a1c1' }
		],
		colors: {
			'editor.background': '#2e3440',
			'editor.foreground': '#d8dee9',
			'editorCursor.foreground': '#d8dee9',
			'editor.lineHighlightBackground': '#3b4252',
			'editor.selectionBackground': '#434c5e',
			'editorLineNumber.foreground': '#4c566a',
			'editorLineNumber.activeForeground': '#d8dee9'
		}
	},
	'night-owl': {
		base: 'vs-dark',
		inherit: true,
		rules: [
			{ token: 'comment', foreground: '637777', fontStyle: 'italic' },
			{ token: 'keyword', foreground: 'c792ea' },
			{ token: 'string', foreground: 'ecc48d' },
			{ token: 'number', foreground: 'f78c6c' },
			{ token: 'type', foreground: '82aaff' },
			{ token: 'class', foreground: '82aaff' },
			{ token: 'function', foreground: '82aaff' },
			{ token: 'variable', foreground: 'd6deeb' },
			{ token: 'operator', foreground: 'c792ea' },
			{ token: 'tag', foreground: '7fdbca' }
		],
		colors: {
			'editor.background': '#011627',
			'editor.foreground': '#d6deeb',
			'editorCursor.foreground': '#80a4c2',
			'editor.lineHighlightBackground': '#010e1a',
			'editor.selectionBackground': '#1d3b53',
			'editorLineNumber.foreground': '#4b6479',
			'editorLineNumber.activeForeground': '#d6deeb'
		}
	},
	'solarized-dark': {
		base: 'vs-dark',
		inherit: true,
		rules: [
			{ token: 'comment', foreground: '586e75', fontStyle: 'italic' },
			{ token: 'keyword', foreground: '859900' },
			{ token: 'string', foreground: '2aa198' },
			{ token: 'number', foreground: 'd33682' },
			{ token: 'type', foreground: 'b58900' },
			{ token: 'class', foreground: '268bd2' },
			{ token: 'function', foreground: '268bd2' },
			{ token: 'variable', foreground: '839496' },
			{ token: 'operator', foreground: '93a1a1' },
			{ token: 'tag', foreground: '268bd2' }
		],
		colors: {
			'editor.background': '#002b36',
			'editor.foreground': '#839496',
			'editorCursor.foreground': '#d30102',
			'editor.lineHighlightBackground': '#073642',
			'editor.selectionBackground': '#073642',
			'editorLineNumber.foreground': '#586e75',
			'editorLineNumber.activeForeground': '#93a1a1'
		}
	},
	cobalt2: {
		base: 'vs-dark',
		inherit: true,
		rules: [
			{ token: 'comment', foreground: '0088ff', fontStyle: 'italic' },
			{ token: 'keyword', foreground: 'ff9d00' },
			{ token: 'string', foreground: '3ad900' },
			{ token: 'number', foreground: 'ff628c' },
			{ token: 'type', foreground: '80ffbb' },
			{ token: 'class', foreground: '80ffbb' },
			{ token: 'function', foreground: 'ffc600' },
			{ token: 'variable', foreground: 'e1efff' },
			{ token: 'operator', foreground: 'ff9d00' },
			{ token: 'tag', foreground: '9effff' }
		],
		colors: {
			'editor.background': '#193549',
			'editor.foreground': '#e1efff',
			'editorCursor.foreground': '#ffc600',
			'editor.lineHighlightBackground': '#1f4662',
			'editor.selectionBackground': '#155a80',
			'editorLineNumber.foreground': '#1f4662',
			'editorLineNumber.activeForeground': '#e1efff'
		}
	}
};

export default themes;
