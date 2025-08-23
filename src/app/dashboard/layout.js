// app/dashboard/layout.js
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin"); 
  }

  return (
    <div className="flex min-h-screen">
   
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/dashboard" className="hover:bg-gray-700 p-2 rounded">
            Home
          </Link>
          <Link href="/dashboard/add-products" className="hover:bg-gray-700 p-2 rounded">
            Add Product
          </Link>
        </nav>
      </aside>

    
      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  );
}
