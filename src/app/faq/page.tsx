import { FAQSection } from "@/components/home/faq-section";

export default function FAQPage() {
  return (
    <div className="py-8">
      <div className="text-center mb-4 px-4">
        <h1 className="text-3xl font-bold">Help Center</h1>
        <p className="text-zinc-400 mt-2">Find answers to common questions</p>
      </div>
      <FAQSection />
    </div>
  );
}
