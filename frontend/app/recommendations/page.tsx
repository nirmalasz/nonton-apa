'use client';

import DetailedMovieCard from "@/components/DetailedMovieCard";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FBFD]">
        <Header isLoggedIn />
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0A1116] tracking-tight mb-2">
            Recommended for You
          </h1>
          <p className="text-gray-600 text-lg">
            Based on your recent watch history and favorite genres.
          </p>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {MOCK_RECOMMENDATIONS.map((movie) => (
            <DetailedMovieCard 
              key={movie.id}
              id={movie.id}
              title={movie.title}
              year={movie.year}
              posterUrl={movie.posterUrl}
              genres={movie.genres}
              rating={movie.rating}
              overview={movie.overview}
            />
          ))}
        </div>

      </div>
      <Footer />
    </div>
  );
}