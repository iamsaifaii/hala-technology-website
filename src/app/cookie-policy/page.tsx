import { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Home/Footer/Footer';

export const metadata: Metadata = {
  title: 'Cookie Policy | Hala Technology',
  description: 'Cookie Policy for Hala Technology',
  alternates: {
    canonical: 'https://halatechnology.ae/cookie-policy',
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="font-jakarta bg-[#111111] text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#007FFF]">Cookie Policy</h1>
        <div className="space-y-6 text-[#cccccc] leading-relaxed">
          <p className="font-semibold text-white">Last updated: 14 October 2026</p>
          
          <h2 className="text-2xl font-bold text-white mt-10">1. What are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you browse websites. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">2. How We Use Cookies</h2>
          <p>
            We use cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our site.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">3. Types of Cookies We Use</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Essential Cookies:</strong> Necessary for the website to function properly. They cannot be disabled.</li>
            <li><strong>Performance and Analytics Cookies:</strong> Help us understand how visitors interact with the website by collecting and reporting information anonymously.</li>
            <li><strong>Functionality Cookies:</strong> Allow the website to remember choices you make and provide enhanced, more personal features.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10">4. Managing Cookies</h2>
          <p>
            You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">5. Contact Us</h2>
          <p>
            If you have any questions about our use of cookies or other technologies, please email us at Contact@halatechnology.ae.
          </p>
        </div>
      </main>
      <div className="bg-[#111111] w-full relative z-20">
        <Footer />
      </div>
    </div>
  );
}
