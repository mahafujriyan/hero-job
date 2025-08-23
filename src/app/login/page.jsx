import SocialLogin from "@/components/SocialLogin";

export default function LoginPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96 text-center">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        {/* Social logins */}
        <SocialLogin />

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        {/* Credentials login */}
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
          >
            Login 
          </button>
        </form>
      </div>
    </div>
  );
}
