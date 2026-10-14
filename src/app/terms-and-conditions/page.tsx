import { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Home/Footer/Footer';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Hala Technology',
  description: 'Terms and Conditions for Hala Technology',
  alternates: {
    canonical: 'https://halatechnology.ae/terms-and-conditions',
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div className="font-jakarta bg-[#111111] text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#007FFF]">Terms &amp; Conditions</h1>
        <div className="space-y-6 text-[#cccccc] leading-relaxed">
          <p className="font-semibold text-white">Last updated: 14 October 2026</p>
          
          <h2 className="text-2xl font-bold text-white mt-10">1. Agreement to Terms</h2>
          <p>
            By accessing or using our website and services, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please do not use our services.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">2. Intellectual Property Rights</h2>
          <p>
            Other than the content you own, under these Terms, Hala Technology and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">3. Restrictions</h2>
          <p>You are specifically restricted from all of the following:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Publishing any Website material in any other media.</li>
            <li>Selling, sublicensing, and/or otherwise commercializing any Website material.</li>
            <li>Using this Website in any way that is or may be damaging to this Website.</li>
            <li>Using this Website contrary to applicable laws and regulations.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10">4. Limitation of Liability</h2>
          <p>
            In no event shall Hala Technology, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">5. Governing Law &amp; Jurisdiction</h2>
          <p>
            These Terms will be governed by and interpreted in accordance with the laws of the United Arab Emirates, and you submit to the non-exclusive jurisdiction of the state and federal courts located in UAE for the resolution of any disputes.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">6. Contact Us</h2>
          <p>
            If you have any questions or concerns regarding these Terms, please contact us at Contact@halatechnology.ae.
          </p>
        </div>
      </main>
      <div className="bg-[#111111] w-full relative z-20">
        <Footer />
      </div>
    </div>
  );
}
