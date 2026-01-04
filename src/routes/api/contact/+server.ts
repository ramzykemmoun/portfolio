import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD, EMAIL_USER, TARGET_USER } from '$env/static/private';

export async function POST({ request }) {
	try {
		const { email, message } = await request.json();

		if (!email || !message) {
			return json({ error: 'Email and message are required' }, { status: 400 });
		}

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: EMAIL_USER,
				pass: EMAIL_PASSWORD
			}
		});

		const mailOptions = {
			from: EMAIL_USER,
			to: TARGET_USER,
			replyTo: email,
			subject: `Portfolio Contact from ${email}`,
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
					<h2 style="color: #333; border-bottom: 2px solid #007acc; padding-bottom: 10px;">
						New Contact Message
					</h2>
					<p><strong>From:</strong> ${email}</p>
					<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 15px 0;">
						<p style="margin: 0; white-space: pre-wrap;">${message}</p>
					</div>
					<p style="color: #666; font-size: 12px;">
						This message was sent from your portfolio contact form.
					</p>
				</div>
			`
		};

		await transporter.sendMail(mailOptions);

		return json({ success: true, message: 'Email sent successfully' });
	} catch (error) {
		console.error('Email error:', error);
		return json({ error: 'Failed to send email' }, { status: 500 });
	}
}
