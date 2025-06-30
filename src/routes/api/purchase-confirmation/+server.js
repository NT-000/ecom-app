import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const req = await request.json();
	console.log('request body:', req);

	return json({ success: true });
}
