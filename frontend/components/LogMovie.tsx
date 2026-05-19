"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface LogMovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  tmdbId: number;
  movieTitle: string;
  posterUrl: string;
  primaryGenre: string;
}

export default function LogMovieModal({
  isOpen,
  onClose,
  tmdbId,
  movieTitle,
  posterUrl,
  primaryGenre,
}: LogMovieModalProps) {
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isRewatch, setIsRewatch] = useState(false);
  const [review, setReview] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in to log a film.");
        setIsSubmitting(false);
        return;
      }

      const res = await fetch("http://localhost:4000/api/activity/watch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tmdbId,
          genre: primaryGenre,
          rating,
          review: review.trim() === "" ? null : review,
          isLiked,
          isRewatch
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to log movie");
      }
      onClose();
      alert("Movie logged successfully!");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0A1116]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-[#8FBFDC]/30 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#F9FBFD] border-b border-[#6BAFD6]/40 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#0A1116] tracking-tight">
            Dear Diary, I watched ...
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-[#6BAFD6] transition-colors"
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
                strokeWidth="3"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex gap-4 mb-6">
            {/* Poster Thumbnail */}
            <div className="w-20 shrink-0">
              <div className="w-full aspect-[2/3] rounded-md overflow-hidden border border-[#8FBFDC]/30 shadow-sm">
                <img
                  src={posterUrl}
                  alt={movieTitle}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Title & Interactive Inputs */}
            <div className="flex flex-col justify-center flex-grow">
              <h3 className="text-2xl font-bold text-[#0A1116] leading-tight mb-3 title-font">
                {movieTitle}
              </h3>

              <div className="flex items-center gap-6">
                {/* 5-Star Rating System */}
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Rating
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="focus:outline-none transition-transform hover:scale-110"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                      >
                        <span
                          className={`text-3xl ${
                            (hoverRating || rating) >= star
                              ? "text-[#6BAFD6]"
                              : "text-gray-200"
                          }`}
                        >
                          ★
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Like / Heart Toggle */}
                <div className="flex flex-col items-center">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Like
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsLiked(!isLiked)}
                    className="mt-1 focus:outline-none transition-transform hover:scale-110"
                  >
                    <svg
                      className={`w-7 h-7 transition-colors ${isLiked ? "text-orange-500 fill-orange-500" : "fill-gray-300"}`}
                      viewBox="0 0 24 24"
                      stroke=""
                      strokeWidth={isLiked ? "0" : "2"}
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>
                {/* Rewatch Toggle */}
                <div className="flex flex-col items-center">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Rewatch</span>
                  <button
                    type="button"
                    onClick={() => setIsRewatch(!isRewatch)}
                    className="mt-1 focus:outline-none transition-transform hover:scale-110"
                  >
                    <svg 
                      className={`w-7 h-7 transition-colors ${isRewatch ? 'text-[#4590BC]' : 'text-gray-300'}`} 
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Review Textarea */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Review{" "}
              <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Add your thoughts..."
              rows={4}
              className="w-full rounded-md border border-[#8FBFDC]/50 p-3 text-sm text-[#0A1116] focus:outline-none focus:border-[#6BAFD6] focus:ring-[0.5px] focus:ring-[#6BAFD6] resize-none"
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-100">
              {error}
            </div>
          )}

          {/* Footer / Submit */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[#8FBFDC]/20">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-[#0A1116] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || rating === 0}
              className={`px-6 py-2 text-sm font-medium text-white rounded-xl transition-colors shadow-sm ${
                isSubmitting || rating === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#4590BC] hover:bg-[#6BAFD6]"
              }`}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
