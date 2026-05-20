"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { api } from "@/services/api";

interface SearchResultMovie {
  tmdb_id: number;
  title: string;
  release_year: string;
  poster_path: string | null;
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResultMovie[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(api.isAuthenticated());
  }, [pathname]);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    api.logout(); // Removes token
    setIsLoggedIn(false);
    router.push("/login"); // Boot them to the login page
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  const isLoginRoute = pathname === "/login";
  const isRegisterRoute = pathname === "/register";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);

    const delayDebounce = setTimeout(async () => {
      try {
        const data = await api.searchMovies(searchQuery);
        setResults(data);
        setIsOpen(data.length > 0);
      } catch (error) {
        console.error("Header search error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      router.push(`/movie/${results[0].tmdb_id}`);
      setIsOpen(false);
      setSearchQuery("");
    }
  };

  const Logo = () => (
    <Link
      href="/"
      className="text-2xl font-bold tracking-tight text-[#0A1116] hover:text-[#4590BC] transition-colors"
    >
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
            <div ref={dropdownRef} className="hidden md:block relative">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center relative"
              >
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim() && setIsOpen(true)}
                  className="w-80 h-10 pl-10 pr-10 rounded-full bg-white border border-[#6BAFD6] text-[#0A1116] placeholder-[#8FBFDC] focus:outline-none focus:border-[#4590BC] focus:ring-1 focus:ring-[#4590BC] transition-all"
                />
                <svg
                  className="absolute left-3.5 text-[#8FBFDC] w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>

                {isLoading && (
                  <div className="absolute right-3.5 animate-spin rounded-full h-4 w-4 border-2 border-[#4590BC] border-t-transparent" />
                )}
              </form>

              {/* DROPDOWN BOX RESULTS */}
              {isOpen && (
                <div className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#8FBFDC]/30 max-h-96 overflow-y-auto z-50 py-2 divide-y divide-gray-100 animate-in fade-in slide-in-from-top-2 duration-150">
                  {results.map((movie) => (
                    <Link
                      key={movie.tmdb_id}
                      href={`/movie/${movie.tmdb_id}`}
                      onClick={() => {
                        setIsOpen(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#F9FBFD] transition-colors group"
                    >
                      {/* Mini Thumbnail */}
                      <div className="w-12 aspect-[2/3] rounded bg-gray-100 overflow-hidden border border-gray-200 shrink-0">
                        {movie.poster_path ? (
                          <img
                            src={movie.poster_path}
                            alt={movie.title}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                            ?
                          </div>
                        )}
                      </div>

                      {/* Title and Release Year */}
                      <div className="flex flex-col overflow-hidden">
                        <span className="font-bold text-sm text-[#0A1116] truncate group-hover:text-[#4590BC] transition-colors">
                          {movie.title}
                        </span>
                        <span className="text-xs text-gray-400 font-medium mt-0.5">
                          {movie.release_year}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* On Login Page */}
          {isLoginRoute && (
            <p className="text-sm text-[#0A1116]">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-[#4590BC] hover:text-[#6BAFD6] transition-colors rounded-full"
              >
                Register
              </Link>
            </p>
          )}

          {/* On Register Page */}
          {isRegisterRoute && (
            <p className="text-sm text-[#0A1116]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#4590BC] hover:text-[#6BAFD6] transition-colors"
              >
                Log In
              </Link>
            </p>
          )}

          {/* On Landing Page */}
          {!isLoggedIn && !isLoginRoute && !isRegisterRoute && (
            <>
              <Link
                href="/login"
                className="text-[#0A1116] font-medium hover:text-[#4590BC] px-4 py-2 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="bg-[#4590BC] hover:bg-[#6BAFD6] text-white font-medium px-6 py-2 rounded-full shadow-sm transition-colors"
              >
                Register
              </Link>
            </>
          )}

          {/* When Logged In */}
          {isLoggedIn && !isLoginRoute && !isRegisterRoute && (
            <>
              <button 
                onClick={handleLogout} 
                className="text-[#0A1116] font-medium hover:text-[#4590BC] py-2 transition-colors cursor-pointer"
            >
                Log Out
            </button>
              <Link
                href="/diary"
                className="text-[#0A1116] font-medium hover:text-[#4590BC] py-2 transition-colors"
              >
                Diary
              </Link>
              <Link
                href="/recommendations"
                className="text-[#0A1116] font-medium hover:text-[#4590BC] pr-3 py-2 transition-colors"
              >
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
