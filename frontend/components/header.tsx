'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface HeaderProps {
    isLoggedIn?: boolean;
}

export default function Header({ isLoggedIn = false }: HeaderProps) {
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState('');

    const isLoginRoute = pathname === '/login';
    const isRegisterRoute = pathname === '/register';

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        // later when implemented with backend will need to router push search
        console.log('Searching for:', searchQuery);
    };

    const Logo = () => (
        <Link href="/" className="text-2xl font-bold tracking-tight text-[#0A1116] hover:text-[#4590BC] transition-colors">
            NontonApa<span className="text-[#4590BC]">.</span>
        </Link>
    );

    return (
        <header className="w-full bg-[#F9FBFD] border-b-2 border-[#8FBFDC] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                <div className="flex items-center gap-8">
                    <Logo />
                    {/* Search Bar (only when Logged In) */}
                    {isLoggedIn && !isLoginRoute && !isRegisterRoute && (
                        <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
                            <input
                                type="text"
                                placeholder="Search movies..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-80 h-10 pl-10 pr-4 rounded-full bg-white border border-[#8FBFDC] text-[#0A1116] placeholder-[#8FBFDC] focus:outline-none focus:border-[#4590BC] focus:ring-1 focus:ring-[#4590BC] transition-all"
                            />
                            <svg
                                className="absolute left-3.5 text-[#8FBFDC] w-5 h-5"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </form>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    {/* On Login Page */}
                    {isLoginRoute && (
                        <p className="text-sm text-[#0A1116]">
                            Don't have an account?{' '}
                            <Link href="/register" className="font-semibold text-[#4590BC] hover:text-[#6BAFD6] transition-colors rounded-full">
                                Register
                            </Link>
                        </p>
                    )}

                    {/* On Register Page */}
                    {isRegisterRoute && (
                        <p className="text-sm text-[#0A1116]">
                            Already have an account?{' '}
                            <Link href="/login" className="font-semibold text-[#4590BC] hover:text-[#6BAFD6] transition-colors">
                                Log In
                            </Link>
                        </p>
                    )}

                    {/* On Landing Page */}
                    {!isLoggedIn && !isLoginRoute && !isRegisterRoute && (
                        <>
                            <Link href="/login" className="text-[#0A1116] font-medium hover:text-[#4590BC] px-4 py-2 transition-colors">
                                Log In
                            </Link>
                            <Link href="/register" className="bg-[#4590BC] hover:bg-[#6BAFD6] text-white font-medium px-6 py-2 rounded-full shadow-sm transition-colors">
                                Register
                            </Link>
                        </>
                    )}

                    {/* When Logged In */}
                    {isLoggedIn && !isLoginRoute && !isRegisterRoute && (
                        <>
                            <Link href="/logout" className="text-[#0A1116] font-medium hover:text-[#4590BC] py-2 transition-colors">
                                Log Out
                            </Link>
                            <Link href="/diary" className="text-[#0A1116] font-medium hover:text-[#4590BC] py-2 transition-colors">
                                Diary
                            </Link>
                            <Link href="/recommendations" className="text-[#0A1116] font-medium hover:text-[#4590BC] pr-3 py-2 transition-colors">
                                Recommendations
                            </Link>
                            <div className="w-10 h-10 rounded-full bg-[#8FBFDC] flex items-center justify-center text-white font-bold cursor-pointer transition-colors">
                                U
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}