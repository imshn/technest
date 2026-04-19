import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Terms of Service | TechNest",
  description: "Terms of Service for TechNest and its automation tools.",
  alternates: { canonical: "https://technestsolutions.in/terms" },
  robots: { index: false, follow: false },
}

const LAST_UPDATED = "April 19, 2025"
const CONTACT_EMAIL = "hello@technestsolutions.in"
const SITE_URL = "https://technestsolutions.in"

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh pt-24 pb-24">
        <div className="max-w-[720px] mx-auto px-6 md:px-10">
          <div className="pt-10 pb-16">
            <p className="text-xs font-medium text-primary tracking-widest uppercase mb-3">Legal</p>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-foreground mb-3">
              Terms of Service
            </h1>
            <p className="text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>
          </div>

          <div className="prose prose-sm md:prose-base prose-neutral dark:prose-invert max-w-none
            prose-headings:font-semibold prose-headings:tracking-tight
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline">

            <p>
              These Terms of Service govern your use of TechNest&apos;s website located at{" "}
              <a href={SITE_URL}>{SITE_URL}</a> and any automation tools, integrations, or services
              we operate (collectively, the &quot;Services&quot;). By accessing or using the Services,
              you agree to be bound by these Terms.
            </p>

            <h2>1. About TechNest</h2>
            <p>
              TechNest is an AI automation and software development agency founded by Shaan. We build
              multi-agent AI systems, workflow automations, SaaS platforms, and digital products for
              businesses globally. Our automation tools may interact with third-party platforms
              including Twitter/X, on behalf of authorised users.
            </p>

            <h2>2. Use of Services</h2>
            <p>You agree to use our Services only for lawful purposes and in accordance with these Terms. You must not:</p>
            <ul>
              <li>Use the Services to violate any applicable law or regulation</li>
              <li>Use the Services to send spam, unsolicited messages, or engage in abusive behaviour</li>
              <li>Attempt to gain unauthorised access to any part of the Services</li>
              <li>Use the Services in any way that could disable, overburden, or impair them</li>
              <li>Violate the terms of any third-party platform we integrate with, including Twitter/X Developer Terms</li>
            </ul>

            <h2>3. Twitter / X Integration</h2>
            <p>
              Some of our automation tools connect to the Twitter/X API. When you authorise our tools
              to access your Twitter/X account, you grant us permission to perform only the specific
              actions you have explicitly configured. We do not post, follow, or interact on your
              behalf without your instruction. We comply with the{" "}
              <a href="https://developer.twitter.com/en/developer-terms/policy" target="_blank" rel="noopener noreferrer">
                Twitter Developer Policy
              </a>{" "}
              and the{" "}
              <a href="https://twitter.com/en/tos" target="_blank" rel="noopener noreferrer">
                Twitter Terms of Service
              </a>.
            </p>

            <h2>4. Intellectual Property</h2>
            <p>
              All content on this website — including text, graphics, logos, and code — is owned by
              TechNest or its content suppliers. You may not reproduce, distribute, or create derivative
              works without our written permission. For client projects, intellectual property is
              transferred to the client in full upon project completion, as agreed in the project contract.
            </p>

            <h2>5. Disclaimers</h2>
            <p>
              The Services are provided &quot;as is&quot; without warranties of any kind, express or implied.
              TechNest does not warrant that the Services will be uninterrupted, error-free, or free
              of harmful components. Automation tools depend on third-party APIs (including Twitter/X)
              which may change or become unavailable at any time.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, TechNest shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages arising from your use of the
              Services, including but not limited to loss of data, revenue, or business opportunities.
              Our total liability shall not exceed the amount paid by you for the Services in the
              three months preceding the claim.
            </p>

            <h2>7. Third-Party Services</h2>
            <p>
              Our Services may link to or integrate with third-party platforms. TechNest is not
              responsible for the content, privacy practices, or terms of any third-party service.
              Your use of third-party platforms is governed by their respective terms.
            </p>

            <h2>8. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. We will notify you of material changes by
              updating the &quot;Last updated&quot; date at the top of this page. Continued use of the
              Services after any change constitutes your acceptance of the new Terms.
            </p>

            <h2>9. Governing Law</h2>
            <p>
              These Terms are governed by the laws of India. Any disputes arising under these Terms
              shall be subject to the exclusive jurisdiction of the courts located in Bengaluru, Karnataka, India.
            </p>

            <h2>10. Contact</h2>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
