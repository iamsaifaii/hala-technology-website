import { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Home/Footer/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | Hala Technology',
  description: 'Privacy Policy for Hala Technology',
  alternates: {
    canonical: 'https://halatechnology.ae/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="font-jakarta bg-[#111111] text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#007FFF]">Privacy Policy</h1>
        <div className="space-y-6 text-[#cccccc] leading-relaxed">
          <p className="font-semibold text-white">Last updated: 14 October 2026</p>
          
          <h2 className="text-2xl font-bold text-white mt-10">1. Introduction</h2>
          <p>
            Welcome to Hala Technology. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">2. The Data We Collect</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you, including Identity Data, Contact Data, Technical Data, Usage Data, and Marketing and Communications Data. We use different methods to collect data from and about you, including direct interactions and automated technologies.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">3. How We Use Your Personal Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to perform the contract we are about to enter into or have entered into with you, where it is necessary for our legitimate interests, or where we need to comply with a legal or regulatory obligation.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered, or disclosed.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">5. Your Legal Rights</h2>
          <p>
            Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">6. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at Contact@halatechnology.ae.
          </p>
        </div>
      </main>
      <div className="bg-[#111111] w-full relative z-20">
        <Footer />
      </div>
    </div>
  );
}
