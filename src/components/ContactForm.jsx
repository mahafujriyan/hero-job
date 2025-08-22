"use client";

export default function ContactForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <div className="w-full sm:w-1/2 p-6 text-black bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Send a message</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your name*"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="text"
            placeholder="Phone number"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <input
          type="email"
          placeholder="Your email*"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />

        <textarea
          placeholder="Message"
          rows="4"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        ></textarea>

        <button
          type="submit"
          className="bg-orange-500 text-white px-6 py-2 rounded-lg shadow hover:bg-orange-600 transition"
        >
          Submit →
        </button>
      </form>
    </div>
  );
}