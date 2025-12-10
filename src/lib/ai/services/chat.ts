export async function generateMessage(input: string, history: any[]) {
	const response = await fetch('/api/chat', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ input, history })
	});

	const data = await response.json();
	if (response.status === 200) {
		return data.generatedText as string;
	} else {
		return data.error as string;
	}
}
