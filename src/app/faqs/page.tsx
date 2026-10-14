import { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Home/Footer/Footer';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Hala Technology',
  description: 'Frequently Asked Questions about Hala Technology services',
  alternates: {
    canonical: 'https://halatechnology.ae/faqs',
  },
};

export default function FAQPage() {
  const faqs = [
    {
      question: 'What services does Hala Technology provide?',
      answer: 'We provide comprehensive digital solutions including SEO, Web Development, Branding, Digital Marketing, and custom AI Agent development to help businesses grow and scale.',
    },
    {
      question: 'Where are you located?',
      answer: 'Our headquarters is located at 1803, Latifa Tower, Sheikh Zayed Road, Dubai, UAE. We serve clients both locally in the GCC and globally.',
    },
    {
      question: 'How long does a typical web development project take?',
      answer: 'The timeline varies depending on the complexity and scope of the project. A standard corporate website might take 4-6 weeks, while complex web applications or e-commerce platforms can take several months. We provide a detailed timeline during the proposal phase.',
    },
    {
      question: 'Do you offer ongoing support after a project is completed?',
      answer: 'Yes, we offer ongoing maintenance, support, and marketing retainers to ensure your digital assets continue to perform optimally and grow alongside your business.',
    },
    {
      question: 'How do I get a quote for my project?',
      answer: 'You can get a free quote by visiting our Contact Us page and filling out the inquiry form, or by emailing us directly at Contact@halatechnology.ae with your project requirements.',
    },
  ];

  return (
    <div className="font-jakarta bg-[#111111] text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#007FFF] text-center">Frequently Asked Questions</h1>
        <p className="text-[#cccccc] text-center mb-12 max-w-2xl mx-auto">
          Find answers to common questions about our services, processes, and how we can help your business thrive in the digital world.
        </p>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[#1a1a1a] border border-[#333333] rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-3 flex items-start gap-3">
                <span className="text-[#007FFF]">Q.</span>
                {faq.question}
              </h3>
              <p className="text-[#cccccc] leading-relaxed ml-7">
                <span className="font-bold text-white mr-2">A.</span>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[#cccccc] mb-6">Still have questions? We're here to help.</p>
          <a href="/contact" className="inline-block bg-[#007FFF] text-white font-bold px-8 py-3 rounded-full hover:bg-blue-600 transition-colors">
            Contact Us
          </a>
        </div>
      </main>
      <div className="bg-[#111111] w-full relative z-20">
        <Footer />
      </div>
    </div>
  );
}
