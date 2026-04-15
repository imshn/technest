export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // TODO: Replace with your newsletter service
    // Examples:
    // - Resend API: https://resend.com
    // - Mailchimp: https://mailchimp.com
    // - ConvertKit: https://convertkit.com
    // - Substack: https://substack.com
    // - Custom database

    // Placeholder: Log to console (replace with actual service)
    console.log('[Newsletter] New subscription:', email)

    // Example with Resend (uncomment and configure):
    /*
    import { Resend } from 'resend'
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    await resend.contacts.create({
      email: email,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    })
    */

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('[Newsletter] Error:', error)
    return new Response(JSON.stringify({ error: 'Subscription failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
