import { Container } from '@/components/Container'
import { getGenreList } from '@/api/service'
import Link from 'next/link'
import Image from 'next/image'
import closeCircle from '@/../public/close-circle.svg'

export const Header = async ({
  initialGenres,
}: {
  initialGenres: number[]
}) => {
  const genresData = await getGenreList()

  return (
    <div className="bg-secondary py-10 md:py-20">
      <Container>
        <div className="items-left flex flex-col text-white md:items-center">
          <h1 className="max-w-screen-md text-left text-2xl font-bold  md:text-center md:text-5xl">
            Milhões de filmes, séries e pessoas para descobrir. Explore já.
          </h1>
          <p className="mt-10 text-left text-sm font-bold  md:text-center">
            FILTRE POR:
          </p>
          <div className="mt-4 flex max-w-screen-xl flex-wrap gap-3 md:justify-center">
            {genresData.genres.map((genre) => {
              const genreInList = initialGenres.includes(genre.id)
              const finalGenreList: number[] = genreInList
                ? initialGenres.filter((g) => g !== genre.id)
                : [...initialGenres, genre.id]
              return (
                <Link
                  href={{
                    pathname: '/',
                    query: { genre: finalGenreList },
                  }}
                  className={`flex cursor-pointer gap-2 rounded bg-white px-4 py-2 text-base text-gray-700 ${
                    genreInList ? 'bg-[#D18000] text-white' : ''
                  }`}
                  key={genre.id}
                >
                  {genre.name}
                  {genreInList && <Image alt="close" src={closeCircle} />}
                </Link>
              )
            })}
          </div>
        </div>
      </Container>
    </div>
  )
}
