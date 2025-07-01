import { json } from '@sveltejs/kit';
import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY } from '$env/static/private';

sgMail.setApiKey(SENDGRID_API_KEY);

const PDF_GUIDE_URL =
	'https://file-examples.com/storage/fe555466b88dcaaea9cfa3a/2017/10/file-sample_150kB.pdf';

export async function POST({ request }) {
	const req = await request.json();

	const response = await fetch(PDF_GUIDE_URL);
	const pdfBuffer = await response.arrayBuffer();
	const base64Pdf = Buffer.from(pdfBuffer).toString('base64');

	const customerEmail = req.data.object.customer_details.email;
	const customerName = req.data.object.customer_details.name;

	const message = {
		to: customerEmail,
		from: 'niccothue6@gmail.com',
		subject: 'Purchase confirmation - Enter The Loop',
		html: `
		<h1>Thank your for the purchase!</h1>
<p>Dear ${customerName}</p>
<p>We appreciate the purchase of <strong>Enter The Loop</strong>, by author <strong>Dr.Dean</strong></p>
<p>The ebook will be attached to this email as a PDF.</p>
<p>If you have any other questions regarding the book don't hesitate to ask.</p>
<p>Send an email to niccothue6@gmail.com, and we will get back to you as soon as possible.</p>
<p>Best regards, Dr.Dean.</p>
`,
		attachments: [
			{
				content: base64Pdf,
				fileName: 'Ebook - Enter The Loop',
				type: 'application/pdf',
				disposition: 'attachment'
			}
		]
	};

	await sgMail.send(message);

	return json({ success: true, response: 'Email sent successfully.' });
}
