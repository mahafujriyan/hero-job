export default function ContactInfo() {
  return (
    <div className="w-full sm:w-1/2 p-6 text-black rounded-2xl bg-sky-50 min-h-[400px]">
      <h2 className="text-3xl font-bold mb-6">Let's Plan for the next Tour </h2>
      <ul className="space-y-6">
        <li className="flex items-start gap-3">
          <span className="text-orange-500 text-xl">📍</span>
          <p>Mirpur 10 , Mirpur ,Dhaka</p>
        </li>
        <li className="flex items-center gap-3">
          <span className="text-orange-500 text-xl">📞</span>
          <p>+880 1889359904</p>
        </li>
        <li className="flex items-center gap-3">
          <span className="text-orange-500 text-xl">☎️</span>
          <p>0141 4055839</p>
        </li>
      
        <li className="flex gap-3">
          <span className="text-orange-500 text-xl">📧</span>
          <p>hossainmdmahafuj17@gmail.com</p>
        </li>
       
      </ul>
    </div>
  );
}