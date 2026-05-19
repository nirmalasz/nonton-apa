"use client";

import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

// MOCK DATA: Simulating the JOIN between Cassandra user_activity_log and TMDB
const MOCK_DIARY_ENTRIES = [
  {
    id: "uuid-1",
    tmdbId: 687163,
    title: "Project Hail Mary",
    year: "2026",
    posterUrl: "https://www.themoviedb.org/t/p/w1280/yihdXomYb5kTeSivtFndMy5iDmf.jpg",
    watchedAt: "2024-05-18T14:00:00Z",
    rating: 5,
    isLiked: true,
    isRewatch: false,
    hasReview: true,
  },
  {
    id: "uuid-2",
    tmdbId: 157336,
    title: "Interstellar",
    year: "2014",
    posterUrl:
      "https://www.themoviedb.org/t/p/w1280/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg",
    watchedAt: "2024-05-12T20:30:00Z",
    rating: 4,
    isLiked: false,
    isRewatch: true,
    hasReview: true,
  },
  {
    id: "uuid-3",
    tmdbId: 372058,
    title: "Your Name.",
    year: "2016",
    posterUrl:
      "https://image.tmdb.org/t/p/w200/q719jXXEzOoYaps6babgKnONONX.jpg",
    watchedAt: "2024-04-28T09:15:00Z",
    rating: 5,
    isLiked: true,
    isRewatch: true,
    hasReview: false,
  },
  {
    id: "uuid-4",
    tmdbId: 546554,
    title: "Knives Out",
    year: "2019",
    posterUrl:
      "https://image.tmdb.org/t/p/w200/pThyQovXQrw2m0s9x82twj48Jq4.jpg",
    watchedAt: "2024-04-03T18:45:00Z",
    rating: 4,
    isLiked: true,
    isRewatch: false,
    hasReview: true,
  },
];

// HELPER: Group entries by "Month Year"
const groupEntriesByMonth = (entries: typeof MOCK_DIARY_ENTRIES) => {
  return entries.reduce(
    (groups, entry) => {
      const date = new Date(entry.watchedAt);
      const monthYear = date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(entry);
      return groups;
    },
    {} as Record<string, typeof MOCK_DIARY_ENTRIES>,
  );
};

export default function DiaryPage() {
  const groupedDiary = groupEntriesByMonth(MOCK_DIARY_ENTRIES);

  return (
    <div className="min-h-screen bg-[#F9FBFD] flex flex-col flex-grow">
      <Header isLoggedIn />
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-10 flex items-baseline gap-3 pt-10 pb-1">
          <h1 className="text-3xl font-extrabold text-[#0A1116] tracking-tight">
            nirmala's diary
          </h1>
          <span className="text-[#6BAFD6]/80 font-semibold">
            {MOCK_DIARY_ENTRIES.length} films
          </span>
        </div>

        {/* Diary List Grouped by Month */}
        {Object.entries(groupedDiary).map(([monthYear, entries]) => (
          <div key={monthYear} className="mb-12">
            {/* Month Header */}
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-lg font-bold text-[#0A1116] whitespace-nowrap uppercase tracking-wider">
                {monthYear}
              </h2>
              <div className="h-[2px] w-full bg-[#6BAFD6]/40"></div>
            </div>

            {/* Table Header (will be Hidden on Mobile) */}
            <div className="hidden md:grid grid-cols-[50px_1fr_120px_100px] gap-4 px-2 pb-2 text-xs font-bold text-[#6BAFD6] uppercase tracking-wider border-b-[1.5px] border-[#6BAFD6]/40">
              <div className="text-center">Day</div>
              <div>Film</div>
              <div className="text-center">Rating</div>
              <div className="text-right pr-4">Like / Review</div>
            </div>

            {/* Table Rows */}
            <div className="flex flex-col">
              {entries.map((entry) => {
                const date = new Date(entry.watchedAt);
                const day = date.getDate().toString().padStart(2, "0");

                return (
                  <div
                    key={entry.id}
                    className="grid grid-cols-[40px_1fr] md:grid-cols-[50px_1fr_120px_100px] gap-4 items-center px-2 py-3 border-b border-[#8FBFDC]/10 hover:bg-white hover:shadow-sm transition-all group"
                  >
                    {/* Day Column */}
                    <div className="text-center text-sm font-semibold text-gray-400 group-hover:text-[#4590BC] transition-colors">
                      {day}
                    </div>

                    {/* Film Column (Poster + Title + Year) */}
                    <div className="flex items-center gap-4">
                      {/* Mini Poster */}
                      <Link
                        href={`/movie/${entry.tmdbId}`}
                        className="shrink-0 relative w-10 aspect-[2/3] rounded overflow-hidden border border-[#8FBFDC]/30 shadow-sm group-hover:border-[#4590BC]/50 transition-colors"
                      >
                        <img
                          src={entry.posterUrl}
                          alt={entry.title}
                          className="object-cover w-full h-full"
                          loading="lazy"
                        />
                      </Link>

                      {/* Title & Year */}
                      <div className="flex flex-wrap items-baseline gap-x-2">
                        <Link href={`/movie/${entry.tmdbId}`}>
                          <h3 className="font-bold text-[#0A1116] group-hover:text-[#4590BC] transition-colors text-lg leading-tight">
                            {entry.title}
                          </h3>
                        </Link>
                        <span className="text-sm font-medium text-gray-400">
                          {entry.year}
                        </span>
                      </div>
                    </div>

                    {/* Rating Column */}
                    <div className="hidden md:flex justify-center text-[#4590BC] text-sm tracking-widest">
                      {/* Array to render exact number of stars */}
                      {"★".repeat(entry.rating)}
                      {"☆".repeat(5 - entry.rating)}
                    </div>

                    {/* Icons Column (Like / Rewatch / Review) */}
                    <div className="hidden md:flex items-center justify-end gap-3 pr-2">
                      {/* Rewatch Icon */}
                      {entry.isRewatch && (
                        <svg
                          className="w-4 h-4 text-[#6BAFD6]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      )}

                      {/* Review Icon */}
                      {entry.hasReview && (
                        <svg
                          className="w-4 h-4 text-[#6BAFD6]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h7"
                          />
                        </svg>
                      )}

                      {/* Liked Heart Icon */}
                      {entry.isLiked ? (
                        <svg
                          className="w-4 h-4 text-orange-500 fill-orange-500"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      ) : (
                        <span className="w-4"></span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
