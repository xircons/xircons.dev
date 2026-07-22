/* eslint-disable react/no-unescaped-entities */

"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function PrivacyPage() {
  const router = useRouter();
  return (
    <main className="relative flex min-h-screen w-full flex-col bg-bg text-fg" data-navbar-theme="light">
      <Navbar />

      <section className="mx-auto flex w-full max-w-4xl flex-col px-6 py-32 sm:px-10 lg:py-48">
        <button
          onClick={() => router.back()}
          className="group mb-12 flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-fg/50 transition-colors hover:text-fg cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:-translate-x-1">
            <path d="M6 13L1 7l5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Privacy Policy
        </h1>
        <p className="mb-12 text-sm text-fg/60">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="prose prose-neutral max-w-none text-fg prose-headings:font-bold prose-headings:text-fg prose-a:text-fg prose-a:underline prose-a:underline-offset-2">
          <p>
            Xircons ("us", "we", or "our") operates the website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
          </p>
          <p>
            We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.
          </p>

          <h2 className="mt-12 text-2xl font-bold">1. Information Collection and Use</h2>
          <p>
            We collect several different types of information for various purposes to provide and improve our Service to you.
          </p>

          <h3 className="mt-8 text-xl font-bold">Types of Data Collected</h3>
          <h4 className="mt-4 text-lg font-bold">Personal Data</h4>
          <p>
            While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
          </p>
          <ul className="list-disc pl-6 marker:text-fg/40">
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Phone number</li>
            <li>Company or Organization name</li>
            <li>Cookies and Usage Data</li>
          </ul>

          <h4 className="mt-8 text-lg font-bold">Usage Data</h4>
          <p>
            We may also collect information how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
          </p>

          <h4 className="mt-8 text-lg font-bold">Tracking & Cookies Data</h4>
          <p>
            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. We exclusively use Google Analytics to monitor and analyze the use of our Service. We do not use cookies or tracking technologies for targeted advertising purposes.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
          </p>

          <h2 className="mt-12 text-2xl font-bold">2. Use of Data</h2>
          <p>
            Xircons uses the collected data for various purposes:
          </p>
          <ul className="list-disc pl-6 marker:text-fg/40">
            <li>To provide and maintain the Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
            <li>To provide customer care and support (e.g., responding to your project inquiries)</li>
            <li>To provide analysis or valuable information so that we can improve the Service (via Google Analytics)</li>
            <li>To monitor the usage of the Service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold">3. Transfer of Data</h2>
          <p>
            Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.
          </p>
          <p>
            If you are located outside Thailand and choose to provide information to us, please note that we transfer the data, including Personal Data, to Thailand and process it there.
          </p>
          <p>
            Xircons will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.
          </p>

          <h2 className="mt-12 text-2xl font-bold">4. Disclosure of Data</h2>
          <p>
            Xircons may disclose your Personal Data in the good faith belief that such action is necessary to:
          </p>
          <ul className="list-disc pl-6 marker:text-fg/40">
            <li>To comply with a legal obligation</li>
            <li>To protect and defend the rights or property of Xircons</li>
            <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
            <li>To protect the personal safety of users of the Service or the public</li>
            <li>To protect against legal liability</li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold">5. Security of Data</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>

          <h2 className="mt-12 text-2xl font-bold">6. Analytics</h2>
          <p>
            We may use third-party Service Providers to monitor and analyze the use of our Service.
          </p>
          <ul className="list-disc pl-6 marker:text-fg/40">
            <li>
              <strong>Google Analytics:</strong> Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network. You can opt-out of having made your activity on the Service available to Google Analytics by installing the Google Analytics opt-out browser add-on. For more information on the privacy practices of Google, please visit the Google Privacy & Terms web page.
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold">7. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>
          <p>
            We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.
          </p>

          <h2 className="mt-12 text-2xl font-bold">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="list-disc pl-6 marker:text-fg/40">
            <li>By email: <a href="mailto:xirconsss@gmail.com">xirconsss@gmail.com</a></li>
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}
