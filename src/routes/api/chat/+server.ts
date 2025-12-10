import { json } from '@sveltejs/kit';
import { InferenceClient } from '@huggingface/inference';
import { env } from '$env/dynamic/private';
import { SYSTEM_PROMPT } from '$lib/ai/prompts/system';

const hf = new InferenceClient(env.HF_ACCESS_TOKEN);

export async function POST({ request }) {
	const { input, history } = await request.json();

	if (!input) {
		return json({ error: 'Empty input' }, { status: 400 });
	}

	try {
		const messages = [
			{ role: 'system', content: SYSTEM_PROMPT },
			...history.map((msg: any) => ({
				role: msg.role,
				content: msg.content
			})),
			{ role: 'user', content: input }
		];

		const response = await hf.chatCompletion({
			model: 'meta-llama/Llama-3.2-1B-Instruct',
			messages: messages,
			max_tokens: 500,
			temperature: 0.7,
			top_p: 0.9
		});

		return json({
			generatedText: response.choices[0].message.content?.trim()
		});
	} catch (error: any) {
		return json(
			{
				error: error.message
			},
			{ status: 503 }
		);
	}
}
