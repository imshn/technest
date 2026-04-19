import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy Policy | TechNest",
  description: "Privacy Policy for TechNest and its automation tools.",
  alternates: { canonical: "https://technestsolutions.in/privacy" },
  robots: { index: false, follow: false },
}

const LAST_UPDATED = "April 19, 2025"
const CONTACT_EMAIL = "hello@technestsolutions.in"
const SITE_URL = "https://technestsolutions.in"

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh pt-24 pb-24">
        <div className="max-w-180 mx-auto px-6 md:px-10">
          <div className="pt-10 pb-16">
            <p className="text-xs font-medium text-primary tracking-widest uppercase mb-3">Legal</p>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-foreground mb-3">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>
          </div>

          <div className="prose prose-sm md:prose-base prose-neutral dark:prose-invert max-w-none
            prose-headings:font-semibold prose-headings:tracking-tight
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline">

            <p>
              TechNest (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates{" "}
              <a href={SITE_URL}>{SITE_URL}</a> and associated automation tools. This Privacy Policy
              explains how we collect, use, and protect information when you use our website or services.
            </p>

            <h2>1. Information We Collect</h2>

            <h3>Information you provide directly</h3>
            <ul>
              <li><strong>Contact enquiries</strong> — name and email address when you book a call or send a message</li>
              <li><strong>Newsletter sign-ups</strong> — email address only</li>
              <li><strong>Project engagements</strong> — business details, project requirements, and communications shared during a client engagement</li>
            </ul>

            <h3>Information collected automatically</h3>
            <ul>
              <li><strong>Usage data</strong> — pages visited, time spent, referring URLs, collected via Google Analytics 4 and Vercel Analytics (anonymised)</li>
              <li><strong>Device data</strong> — browser type, operating system, screen size (no personally identifiable device fingerprinting)</li>
              <li><strong>Cookies</strong> — session cookies for the admin panel; analytics cookies from Google Analytics. No advertising or tracking cookies are set.</li>
            </ul>

            <h3>Twitter / X account data</h3>
            <p>
              When you authorise our automation tools to connect to your Twitter/X account, we may access:
            </p>
            <ul>
              <li>Your Twitter/X username and public profile information</li>
              <li>Tweets, replies, and engagement data you explicitly configure us to read or act upon</li>
            </ul>
            <p>
              We do <strong>not</strong> store your Twitter/X credentials. Access is granted via OAuth
              tokens which you can revoke at any time through your Twitter/X account settings. We do
              not sell, share, or use Twitter/X data for any purpose beyond the specific automation
              you have configured.
            </p>

            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>To deliver and improve our services</li>
              <li>To respond to enquiries and communicate about projects</li>
              <li>To send the newsletter (only if you subscribed — unsubscribe any time)</li>
              <li>To analyse website usage in aggregate to improve content and performance</li>
              <li>To operate configured automation workflows on connected platforms</li>
            </ul>
            <p>We do not sell your personal data to third parties. We do not use your data for advertising.</p>

            <h2>3. Data Storage and Security</h2>
            <p>
              Website data is stored on Vercel (US/EU infrastructure). Client project data is stored
              on secure, access-controlled servers. Newsletter subscriber emails are stored in our
              own database hosted on a private VPS. We use HTTPS, access controls, and API key
              authentication to protect all data in transit and at rest.
            </p>
            <p>
              No method of transmission over the internet is 100% secure. We take commercially
              reasonable steps to protect your information but cannot guarantee absolute security.
            </p>

            <h2>4. Data Retention</h2>
            <ul>
              <li><strong>Newsletter emails</strong> — retained until you unsubscribe</li>
              <li><strong>Analytics data</strong> — retained for 14 months per Google Analytics defaults</li>
              <li><strong>Client project data</strong> — retained for the duration of the engagement plus 12 months, then deleted or anonymised</li>
              <li><strong>Twitter/X OAuth tokens</strong> — deleted immediately upon revocation or end of service</li>
            </ul>

            <h2>5. Third-Party Services</h2>
            <p>We use the following third-party services that may process your data:</p>
            <ul>
              <li><strong>Google Analytics 4</strong> — website analytics (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>)</li>
              <li><strong>Vercel</strong> — website hosting and analytics (<a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a>)</li>
              <li><strong>Twitter/X API</strong> — for authorised automation only (<a href="https://twitter.com/en/privacy" target="_blank" rel="noopener noreferrer">Twitter Privacy Policy</a>)</li>
              <li><strong>Calendly</strong> — meeting scheduling (data governed by Calendly&apos;s privacy policy)</li>
            </ul>

            <h2>6. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent at any time (including unsubscribing from the newsletter)</li>
              <li>Object to or restrict certain processing</li>
            </ul>
            <p>
              To exercise any of these rights, email us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We will respond within 30 days.
            </p>

            <h2>7. Children&apos;s Privacy</h2>
            <p>
              Our Services are not directed to children under the age of 13. We do not knowingly
              collect personal information from children. If you believe we have inadvertently
              collected such data, please contact us and we will delete it promptly.
            </p>

            <h2>8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you of significant
              changes by updating the &quot;Last updated&quot; date. Your continued use of our Services
              after any change constitutes your acceptance of the revised policy.
            </p>

            <h2>9. Contact</h2>
            <p>
              For any privacy-related questions or requests, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
