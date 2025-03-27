"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function Admin() {
    return (
        <main className="min-h-screen bg-[#1A1A1A] text-white flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-6">Sign in to Admin</h1>
            <button 
                onClick={() => signIn("google")} 
                className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition"
            >
                <FcGoogle size={24} />
                Sign in with Google
            </button>
        </main>
    );
}
