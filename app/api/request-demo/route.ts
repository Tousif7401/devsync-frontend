import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

interface DemoRequest {
  name: string;
  email: string;
  company: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: DemoRequest = await request.json();
    const { name, email, company, message } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'tousif.cse.rymec@gmail.com';

    if (!SENDGRID_API_KEY) {
      console.error('SENDGRID_API_KEY not configured');
      return NextResponse.json(
        { success: false, error: 'Email service not configured. Please contact support.' },
        { status: 500 }
      );
    }

    // Initialize SendGrid
    sgMail.setApiKey(SENDGRID_API_KEY);

    // Verified sender email from SendGrid
    const SENDER_EMAIL = 'tousif.cse.rymec@gmail.com';
    const REPLY_TO = 'noreply@devsync.ai';

    // Send email to user (acknowledgment)
    const userEmail = {
      to: email,
      from: SENDER_EMAIL,
      replyTo: REPLY_TO,
      subject: 'Demo Request Received - DevSync AI',
      text: `Hi ${name},

Thank you for your interest in DevSync AI!

We've received your demo request and our team will contact you within 24 hours.

${company ? `Company: ${company}` : ''}
${message ? `Message: ${message}` : ''}

Best regards,
The DevSync AI Team`,
    };

    // Send email to admin (notification)
    const adminEmail = {
      to: ADMIN_EMAIL,
      from: SENDER_EMAIL,
      replyTo: email,
      subject: `New Demo Request - ${name}`,
      text: `New Demo Request Received

Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}
${message ? `Message: ${message}` : ''}

Please contact the requester to schedule a demo.`,
    };

    // Send both emails
    const userResult = await sgMail.send(userEmail)
      .then(() => ({ success: true, error: null }))
      .catch((error) => {
        console.error('User email error:', error.response?.body || error.message);
        return { success: false, error: error.message || 'Failed to send user email' };
      });

    const adminResult = await sgMail.send(adminEmail)
      .then(() => ({ success: true, error: null }))
      .catch((error) => {
        console.error('Admin email error:', error.response?.body || error.message);
        return { success: false, error: error.message || 'Failed to send admin email' };
      });

    return NextResponse.json({
      success: userResult.success || adminResult.success,
      message: userResult.success && adminResult.success
        ? 'Demo request submitted successfully!'
        : 'Demo request submitted, but there may be email delivery issues.',
      userEmailSent: userResult.success,
      adminEmailSent: adminResult.success,
      userError: userResult.error,
      adminError: adminResult.error,
    });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to submit request. Please try again.',
      },
      { status: 500 }
    );
  }
}
