import { Title } from "@/components/ui/branding";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <Title />

      {/* Thank you message */}
      <div className="text-center mb-12">
        <h2 className="texttype-header-1 text-white mb-4">404 - Not Found</h2>
        <br />
        <Link
          href="/"
          target="_blank"
          className="texttype-header-2 text-blue-600 opacity-70 hover:opacity-50 underline transition-opacity"
        >
          Go back home.
        </Link>
      </div>

      {/* Contact info */}
      <div className="text-center text-sm text-gray-400">
        Questions or concerns? Call us at:
        <br />
        <span className="font-medium text-white">09270251730</span>
      </div>
    </main>
  );
}
