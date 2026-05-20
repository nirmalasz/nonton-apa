'use client';

import DetailedMovieCard from "@/components/DetailedMovieCard";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { api } from '@/services/api';
import Link from 'next/link';
import { useEffect, useState } from "react";

// MOCK DATA: Updated to include 'overview' matching the TMDB API
const MOCK_RECOMMENDATIONS = [
  {
    id: 157336,
    title: 'Interstellar',
    year: '2014',
    posterUrl: 'https://www.themoviedb.org/t/p/w1280/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg',
    genres: ['Adventure', 'Sci-Fi'],
    rating: 8.6,
    overview: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.'
  },
  {
    id: 315162,
    title: 'Puss in Boots: The Last Wish',
    year: '2022',
    posterUrl: 'https://image.tmdb.org/t/p/w500/kuf6dutpsT0vSVehic3EZIqkOBt.jpg',
    genres: ['Animation', 'Adventure'],
    rating: 8.3,
    overview: 'Puss in Boots discovers that his passion for adventure has taken its toll: he has burned through eight of his nine lives. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives.'
  },
  {
    id: 687163,
    title: 'Project Hail Mary',
    year: '2026',
    posterUrl: 'https://www.themoviedb.org/t/p/w1280/yihdXomYb5kTeSivtFndMy5iDmf.jpg', 
    genres: ['Sci-Fi', 'Drama'],
    rating: 9.0,
    overview: 'Sole survivor on a desperate, last-chance mission to save both humanity and the earth, Ryland Grace is hurtled into the depths of space when he must conquer an extinction-level threat to our species.'
  },
  {
    id: 546554,
    title: 'Knives Out',
    year: '2019',
    posterUrl: 'https://image.tmdb.org/t/p/w500/pThyQovXQrw2m0s9x82twj48Jq4.jpg',
    genres: ['Comedy', 'Mystery'],
    rating: 7.9,
    overview: 'When renowned crime novelist Harlan Thrombey is found dead at his estate just after his 85th birthday, the inquisitive and debonair Detective Benoit Blanc is mysteriously enlisted to investigate.'
  },
  {
    id: 372058,
    title: 'Your Name.',
    year: '2016',
    posterUrl: 'https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg',
    genres: ['Romance', 'Animation'],
    rating: 8.5,
    overview: 'High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places. Mitsuha wakes up in Taki’s body, and he in hers. This bizarre occurrence continues to happen randomly.'
  }
];

export default function RecommendationsPage() {
  const [movie, setMovies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecs = async () => {
            try {
                const data = await api.getRecommendations();

                console.log("REACT RECEIVED THIS DATA:", data);

                setMovies(data);
            } catch (err: any) {
                setError("Please log in to see your personalized recommendations.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecs();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FBFD]">
        <Header />
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0A1116] tracking-tight mb-2">
            Recommended for You
          </h1>
          <p className="text-gray-600 text-lg">
            Based on your activity log by our recommendation engine.
          </p>
        </div>
       {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#4590BC] border-t-transparent"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-red-500 font-semibold mb-4">{error}</p>
                        <Link href="/login" className="text-[#4590BC] hover:underline font-medium">Go to Login</Link>
                    </div>
                ) : (!movie || movie.length === 0)? (
                    <div className="text-center py-20 bg-white rounded-xl border border-[#8FBFDC]/30 shadow-sm">
                        <h2 className="text-xl font-bold text-[#0A1116] mb-2">No recommendations yet!</h2>
                        <p className="text-gray-500">Go log your first movie so we can learn your taste.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
                        {movie.map((movie) => (
                            <div key={movie.tmdb_id} className="relative group">
                                <div className="absolute top-2 left-2 z-10 bg-[#55a5d3cb] text-white text-xs font-extrabold px-2 py-1 rounded shadow-md">
                                    {movie.match_score}% Match
                                </div>
                                
                                <DetailedMovieCard
                                    id={movie.tmdb_id}
                                    title={movie.title}
                                    year={movie.release_date}
                                    posterUrl={movie.poster_path}
                                    genres={movie.genres || []}
                                    rating={movie.rating}
                                    overview={movie.overview}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </main>
      <Footer />
    </div>
  );
}