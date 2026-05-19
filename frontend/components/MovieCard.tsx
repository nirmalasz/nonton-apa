import Image from 'next/image';
import Link from 'next/link';

interface MovieCardProps {
    id: number;
    title: string;
    year: string;
    posterUrl: string;
    genres: string[];
    rating: number;
}

export default function MovieCard({ id, title, year, posterUrl, genres, rating }: MovieCardProps) {
    return (
        <Link href={`/movie/${id}`} className="group flex flex-col gap-3 cursor-pointer">
            {/* Poster Image Container */}
            <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-gray-100 shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg border border-[#8FBFDC]/20">
                <img
                    src={posterUrl}
                    alt={`${title} poster`}
                    className="object-cover w-full h-full"
                    loading="lazy"
                />

                <div className="absolute inset-0 bg-[#0A1116]/0 group-hover:bg-[#0A1116]/10 transition-colors duration-300" />
            </div>

            {/* Details Section */}
            <div className="flex flex-col px-1">
                <h3 className="font-bold text-[#0A1116] py-1 leading-tight line-clamp-1 group-hover:text-[#4590BC] text-lg transition-colors">
                    {title}
                </h3>

                <div className="flex items-center justify-between mt-1 text-base">
                    <span className="text-gray-600 font-semibold">{year}</span>
                    <div className="flex items-center gap-1 bg-[#F9FBFD] px-2 py-0.5 rounded-md border border-[#8FBFDC]/30">
                        <span className="text-[#4590BC] text-sm">⭐</span>
                        <span className="font-semibold text-[#0A1116] text-[10px]">{rating.toFixed(1)}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-2">
                    {genres.slice(0, 2).map((genre) => (
                        <span
                            key={genre}
                            className="px-2 py-0.5 bg-gray-200 text-gray-500 text-[10px] uppercase font-bold tracking-wider rounded-sm"
                        >
                            {genre}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}