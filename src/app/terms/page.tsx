"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function TermsPage() {
  const router = useRouter();
  return (
    <main className="relative flex min-h-screen w-full flex-col bg-bg text-fg" data-navbar-theme="light">
      <Navbar />

      <section className="mx-auto flex w-full max-w-4xl flex-col px-6 py-32 sm:px-10 lg:py-48">
        <button
          onClick={() => router.back()}
          className="group mb-12 flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-fg/50 transition-colors hover:text-fg"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:-translate-x-1">
            <path d="M6 13L1 7l5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Terms and Conditions
        </h1>
        <p className="mb-12 text-sm text-fg/60">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="prose prose-neutral max-w-none text-fg prose-headings:font-bold prose-headings:text-fg prose-a:text-fg prose-a:underline prose-a:underline-offset-2">
          <p>
            Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the Xircons website (the "Service") operated by Xircons ("us", "we", or "our").
          </p>
          <p>
            Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
          </p>
          <p>
            By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
          </p>

          <h2 className="mt-12 text-2xl font-bold">1. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of Xircons and its licensors. The Service is protected by copyright, trademark, and other applicable laws. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Xircons.
          </p>

          <h2 className="mt-12 text-2xl font-bold">2. Service Usage and Informational Purposes</h2>
          <p>
            This website serves as an informational platform to showcase our software development services and receive inquiries. We do not process payments, sell physical goods, or offer subscription services directly through this website. Any project agreements, contracts, or payments will be handled separately and will be governed by their own specific terms and conditions negotiated with the client.
          </p>

          <h2 className="mt-12 text-2xl font-bold">3. Links To Other Web Sites</h2>
          <p>
            Our Service may contain links to third-party web sites or services that are not owned or controlled by Xircons.
          </p>
          <p>
            Xircons has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that Xircons shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods, or services available on or through any such web sites or services.
          </p>

          <h2 className="mt-12 text-2xl font-bold">4. Limitation Of Liability</h2>
          <p>
            In no event shall Xircons, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.
          </p>

          <h2 className="mt-12 text-2xl font-bold">5. Disclaimer</h2>
          <p>
            Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
          </p>

          <h2 className="mt-12 text-2xl font-bold">6. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of Thailand, without regard to its conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.
          </p>

          <h2 className="mt-12 text-2xl font-bold">7. Changes</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
          <p>
            By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
          </p>

          <h2 className="mt-12 text-2xl font-bold">8. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at: <a href="mailto:xirconsss@gmail.com">xirconsss@gmail.com</a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
