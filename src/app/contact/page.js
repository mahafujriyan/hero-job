import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";



export default function ContactPage() {
  return (
      <div
      className="min-h-screen flex items-center justify-center px-6 py-16"
     
    >
      <div className="absolute inset-0 bg-black/50 z-0"></div>

  <div className="relative z-10 rounded-2xl shadow-xl flex flex-col sm:flex-row items-start justify-center gap-10 p-8 sm:p-12 max-w-6xl w-full min-h-[70vh]">
    
    <div className="w-full sm:w-1/3">
      <ContactInfo />
    </div>

    <div className="w-full sm:w-2/3">
      <ContactForm />
    </div>
  </div>
      
    </div>
  );
}