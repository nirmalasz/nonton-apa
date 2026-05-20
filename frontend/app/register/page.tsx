"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from '@/services/api';

export default function Register() {
  console.log("My Backend URL is:", process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await api.register(username, password);
            router.push('/login?registered=true');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div className="flex flex-col min-h-screen bg-[#D9D9D9]">
      <Header /*rightAction="login"*/ />

      <main className="flex flex-1 items-center justify-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-4xl flex flex-col md:flex-row p-6 gap-4 shadow-sm items-stretch">
          <div className="relative w-full md:w-1/2 min-h-[320px] md:min-h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="https://i.pinimg.com/736x/ad/48/4d/ad484d8319f03ea50f5a62ed37bbc7d1.jpg"
              alt="Register Illustration"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-8">
            <h2 className="text-black font-bold text-2xl mb-6 text-center">
              Register
            </h2>

            <form
              onSubmit={handleRegister}
              className="flex flex-col gap-4"
              suppressHydrationWarning
            >
              <div className="flex flex-col gap-1">
                <label className="text-black text-sm font-bold">
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border border-[#6BAFD6] rounded-lg px-3 py-2 outline-none  text-black"
                  suppressHydrationWarning
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-black text-sm font-bold">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-[#6BAFD6] rounded-lg px-3 py-2 outline-none  text-black"
                  suppressHydrationWarning
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#6BAFD6] text-black font-bold py-3 rounded-2xl mt-4 hover:bg-[#8FBFDC] transition-all disabled:opacity-50"
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
