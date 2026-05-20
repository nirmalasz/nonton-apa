'use client';
import Link from 'next/link';
import MovieCard from '@/components/MovieCard';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { mapGenreIdsToNames } from '@/utills/genreMap';

export default function LandingPage() {
  const [trendingMovies, setTrendingMovies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    setIsLoggedIn(api.isAuthenticated());
    setIsLoading(false);
    const fetchTrending = async () => {
      try {
        const movies = await api.getPopularMovies();
        setTrendingMovies(movies);
      } catch (error) {
        console.error("Failed to load trending movies", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      {/* HERO SECTION */}

      {!isLoggedIn && (
      <section className="relative w-full bg-[#F9FBFD] border-b border-[#8FBFDC]/20 pt-20 pb-24 overflow-hidden">
        {/* Subtle Background Decoration */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[600px] h-[600px] bg-[#8FBFDC]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[400px] h-[400px] bg-[#6BAFD6]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#0A1116] tracking-tight mb-6 max-w-4xl leading-tight">
            Mau<span className="text-[#4590BC]"> Nonton Apa Ya?</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
            Catat film yang telah kamu tonton dan temukan rekomendasi film yang harus kamu tonton selanjutnya. Semua rekomendasi dibuat berdasarkan kesukaanmu dan diupdate setiap kamu catat film baru.
            
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link 
              href="/register" 
              className="bg-[#4590BC] hover:bg-[#6BAFD6] text-white px-8 py-3.5 rounded-full font-semibold text-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Mulai Catat
            </Link>
            <Link 
              href="/login" 
              className="bg-white hover:bg-gray-50 text-[#0A1116] border border-[#8FBFDC] px-8 py-3.5 rounded-full font-semibold text-lg transition-all shadow-sm"
            >
              Log In
            </Link>
          </div>
        </div>
      </section>
      )}

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-[#0A1116] tracking-tight">
            Trending Now
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
          {trendingMovies.map((movie) => (
            <MovieCard 
              key={movie.tmdb_id}
              id={movie.tmdb_id}
              title={movie.title}
              year={movie.release_year}
              posterUrl={movie.poster_path}
              genres={mapGenreIdsToNames(movie.genre_ids)}
              rating={movie.rating}
            />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}