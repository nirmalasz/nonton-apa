"use client";

import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LogMovieModal from "@/components/LogMovie";
import { useState } from "react";

// MOCK DATA
const MOCK_MOVIE = {
  id: 155,
  title: "The Dark Knight",
  year: "2008",
  director: "Christopher Nolan",
  posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  backdropUrl:
    "https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
  genres: ["Action", "Crime", "Drama", "Thriller"],
  rating: 8.5,
  overview:
    "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  cast: [
    {
      id: 3894,
      name: "Christian Bale",
      role: "Bruce Wayne / Batman",
      profileUrl:
        "https://media.themoviedb.org/t/p/w600_and_h900_face/7Pxez9J8fuPd2Mn9kex13YALrCQ.jpg",
    },
    {
      id: 1810,
      name: "Heath Ledger",
      role: "Joker",
      profileUrl:
        "https://media.themoviedb.org/t/p/w600_and_h900_face/p2z2bURSg7nuMsN9P2s61e2RvNz.jpg",
    },
    {
      id: 3895,
      name: "Michael Caine",
      role: "Alfred Pennyworth",
      profileUrl:
        "https://media.themoviedb.org/t/p/w600_and_h900_face/bVZRMlpjTAO2pJK6v90buFgVbSW.jpg",
    },
    {
      id: 64,
      name: "Gary Oldman",
      role: "James Gordon",
      profileUrl:
        "https://image.tmdb.org/t/p/w200/2v9FVVBUrrkW2m3QOcYkuhq9A6o.jpg",
    },
    {
      id: 3904,
      name: "Aaron Eckhart",
      role: "Harvey Dent / Two-Face",
      profileUrl:
        "https://media.themoviedb.org/t/p/w600_and_h900_face/u5JjnRMr9zKEVvOP7k3F6gdcwT6.jpg",
    },
    {
      id: 1811,
      name: "Maggie Gyllenhaal",
      role: "Rachel Dawes",
      profileUrl:
        "https://media.themoviedb.org/t/p/w600_and_h900_face/vsfkWdYWmA9CpzMHTJzrFxlDnEZ.jpg",
    },
  ],
};

export default function MovieDetailPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#F9FBFD] flex flex-col">
      <Header isLoggedIn />
      {/* Dark Overlay for Backdrop*/}
      <section className="relative w-full pt-12 pb-20 overflow-hidden bg-[#0A1116]">
        {/* Blurred Backdrop Image */}
        <div
          className="absolute inset-0 opacity-30 bg-cover bg-center blur-xl scale-110"
          style={{ backgroundImage: `url(${MOCK_MOVIE.backdropUrl})` }}
        />
        {/* Gradient Fade to connect with the content below */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1116] via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-[#F9FBFD]" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 mt-8">
          {/* Left Column: Poster */}
          <div className="w-48 md:w-72 shrink-0 mx-auto md:mx-0">
            <div className="w-full aspect-[2/3] rounded-xl overflow-hidden border border-white/20 shadow-2xl shadow-black/50">
              <img
                src={MOCK_MOVIE.posterUrl}
                alt={`${MOCK_MOVIE.title} poster`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Movie Info */}
          <div className="flex flex-col text-white justify-center">
            {/* Title & Director */}
            <div className="mb-6 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-1 title-font">
                {MOCK_MOVIE.title}{" "}
                <span className="text-gray-400 font-medium text-3xl">
                  ({MOCK_MOVIE.year})
                </span>
              </h1>
              <p className="text-lg text-gray-300">
                Directed by{" "}
                <span className="font-semibold text-white border-b border-[#4590BC] pb-0.5">
                  {MOCK_MOVIE.director}
                </span>
              </p>
            </div>

            {/* Action Bar (Log, Like, Watchlist) */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
              {/* Log Button */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-[#4590BC] hover:bg-[#6BAFD6] text-white px-5 py-2 rounded-md font-semibold transition-colors shadow-sm">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Log Film
              </button>

              {/* Action Icons */}
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-md border border-white/10">
                {/* Watchlist Icon */}
                <button
                  className="text-gray-300 hover:text-white transition-colors"
                  title="Add to Watchlist"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>

                <div className="w-px h-5 bg-white/20 mx-1"></div>

                {/* Heart Icon */}
                <button
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                  title="Like"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* Rating Display */}
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-4 py-[4.5px] rounded-md border border-white/10">
                <span className="text-[#6BAFD6] text-xl">★</span>
                <span className="font-bold text-white">
                  {MOCK_MOVIE.rating.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Overview */}
            <div className="mb-6">
              <p className="text-gray-200 leading-relaxed text-sm md:text-base">
                {MOCK_MOVIE.overview}
              </p>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {MOCK_MOVIE.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-[#8FBFDC]/20 text-[#8FBFDC] text-xs uppercase font-bold tracking-wider rounded-lg"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CAST SECTION */}
      <section className="flex-grow max-w-5xl mx-auto w-full px-6 py-12">
        <div className="mb-6 flex items-center gap-4 border-[#6BAFD6]/40 border-b-[2px] pb-2">
          <h2 className="text-lg font-bold text-[#0A1116] uppercase tracking-wider">
            Cast
          </h2>
        </div>

        {/* Horizontal Scrolling Grid for Cast */}
        <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
          {MOCK_MOVIE.cast.map((actor) => (
            <div
              key={actor.id}
              className="flex flex-col w-32 shrink-0 snap-start group"
            >
              <div className="w-full aspect-[2/3] bg-gray-200 rounded-md overflow-hidden border border-[#8FBFDC]/20 mb-2">
                {actor.profileUrl ? (
                  <img
                    src={actor.profileUrl}
                    alt={actor.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                )}
              </div>
              <h4 className="font-bold text-sm text-[#0A1116] leading-tight group-hover:text-[#4590BC] transition-colors">
                {actor.name}
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">{actor.role}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />

      <LogMovieModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tmdbId={MOCK_MOVIE.id}
        movieTitle={MOCK_MOVIE.title}
        posterUrl={MOCK_MOVIE.posterUrl}
        primaryGenre={MOCK_MOVIE.genres[0]} // First genre will be prioritezd
      />
    </div>
  );
}
