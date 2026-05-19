import Link from 'next/link';

interface DetailedCardProps {
  id: number;
  title: string;
  year: string;
  posterUrl: string;
  genres: string[];
  rating: number;
  overview: string;
}

export default function DetailedMovieCard({ 
  id, title, year, posterUrl, genres, rating, overview 
}: DetailedCardProps) {
  return (
    <div className="flex flex-col bg-white rounded-xl overflow-hidden border border-[#8FBFDC]/20 shadow-sm hover:shadow-lg transition-all duration-300 h-full group">
      
      {/* Poster Image */}
      <Link href={`/movie/${id}`} className="relative w-full aspect-[2/3] bg-gray-100 overflow-hidden block">
        <img
          src={posterUrl}
          alt={`${title} poster`}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#0A1116]/0 group-hover:bg-[#0A1116]/10 transition-colors duration-300" />
      </Link>

      {/* Content Section */}
      <div className="flex flex-col p-4 flex-grow">
        
        {/* Title & Year */}
        <div className="mb-2">
          <Link href={`/movie/${id}`}>
            <h3 className="font-bold text-[#0A1116] leading-tight line-clamp-1 group-hover:text-[#4590BC] transition-colors title-font">
              {title}
            </h3>
          </Link>
          <div className="flex justify-between items-center mt-1">
            <span className="text-sm text-gray-500 font-medium">{year}</span>
            <div className="flex items-center gap-1 bg-[#F9FBFD] px-2 py-0.5 rounded-md border border-[#8FBFDC]/30">
              <span className="text-[#4590BC] text-xs">⭐</span>
              <span className="font-semibold text-[#0A1116] text-xs">{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mb-3">
          {genres.slice(0, 2).map((genre) => (
            <span 
              key={genre} 
              className=" px-1 py-0.5 bg-gray-200/80 text-gray-600 border border-gray-100 text-[10px] uppercase font-bold tracking-wider rounded-md"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Overview  */}
        <div className="flex-grow mb-4">
          <p className="text-sm text-gray-600 line-clamp-4">
            {overview}
          </p>
        </div>

        {/* See More Link*/}
        <Link 
          href={`/movie/${id}`} 
          className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[#4590BC] hover:text-[#0A1116] transition-colors"
        >
          See more 
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}