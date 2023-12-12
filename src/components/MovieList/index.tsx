import Image from 'next/image'
import { MovieData } from '@/types'
import Link from 'next/link'
import { shimmer, toBase64 } from '@/util'

export const MovieList = async ({ movies }: { movies: MovieData[] }) => {
  return (
    <div className="grid grid-cols-2 gap-y-8 py-8 md:grid-cols-3 md:gap-y-12 lg:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie) => (
        <div className="" key={movie.id}>
          <div className="h-56 w-36 2xl:h-80 2xl:w-60">
            <Link
              href={`/filme/${movie.id}`}
              className="h-56 w-36 2xl:h-80 2xl:w-60"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                width={500}
                height={750}
                style={{ height: '100%', width: 'auto', borderRadius: '4px' }}
                alt={movie.title}
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475),
                )}`}
              />
            </Link>
          </div>
          <p className="w-36 pt-2.5 text-sm font-bold md:text-base 2xl:w-60">
            {movie.title}
          </p>
          <p className="text-gray text-xs font-bold md:text-sm">
            {movie.release_date}
          </p>
        </div>
      ))}
    </div>
  )
}
