import { Container } from '@/components/Container'
import Image from 'next/image'
import { getMovieInfo } from '@/api/service'
import { Crew, Cast } from '@/types'
import { MovieList } from '@/components/MovieList'
import { CircularProgress } from './CircularProgress'
import { shimmer, toBase64 } from '@/util'

const Cast = ({ cast }: { cast: Cast[] }) => {
  return (
    <ol className="flex w-full flex-nowrap items-center gap-4 overflow-y-scroll pb-4">
      {cast.map((cast) => (
        <li key={cast.id} className="min-w-[190px] p-1 md:min-w-[320px]">
          <div className="rounded p-2 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
            <Image
              className="min-h-[250px] md:min-h-[444px]"
              src={
                cast.profile_path !== null
                  ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                  : '/user-grey.svg'
              }
              width={500}
              height={750}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '4px',
              }}
              alt={cast.name}
              priority
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475),
              )}`}
            />
            <p className="pt-4 text-lg font-bold">{cast.name}</p>
            <p className="pt-4 text-base">{cast.character}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

const Crew = ({ crew }: { crew: Crew[] }) => (
  <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-3 md:gap-x-12">
    {crew.map((person) => {
      if (
        !(
          person.job === 'Director' ||
          person.job === 'Producer' ||
          person.job === 'Screenplay' ||
          person.job === 'Writer'
        )
      )
        return

      return (
        <div key={person.id}>
          <p className="bold text-base">{person.name}</p>
          <p className="text-sm">{person.job}</p>
        </div>
      )
    })}
  </div>
)

export default async function Filme({ params }: { params: { id: string } }) {
  const { movieDetail, movieRecommendations, movieCredits, movieVideos } =
    await getMovieInfo(params.id)
  return (
    <>
      <div className="bg-secondary pb-16 pt-8 text-white">
        <Container>
          <div className="gap-8 lg:flex">
            <div className="flex min-w-[30%] items-center justify-center lg:block">
              <Image
                className="lg:hidden"
                src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
                width={500}
                height={750}
                style={{
                  height: '100%',
                  width: 'auto',
                  borderRadius: '8px',
                }}
                alt={movieDetail.title}
                priority
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475),
                )}`}
              />
              <Image
                className="absolute hidden lg:block"
                src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
                width={500}
                height={750}
                style={{
                  width: '25%',
                  borderRadius: '8px',
                }}
                alt={movieDetail.title}
                priority
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475),
                )}`}
              />
            </div>
            <div className="xl:max-w-[60%]">
              <p className="pt-8 text-[32px] font-bold lg:pt-0">
                {movieDetail.title}
              </p>
              <ul className="relative text-lg">
                <li className="lg:inline lg:pr-2">16 anos</li>
                <span className="absolute bottom-1 hidden lg:inline">.</span>
                <li className="lg:inline lg:pl-3 lg:pr-2">
                  {
                    new Date(movieDetail.release_date)
                      .toLocaleString('pt-BR')
                      .split(',')[0]
                  }
                </li>
                <span className="absolute bottom-1 hidden lg:inline">.</span>
                <li className="lg:inline lg:pl-3 lg:pr-2">
                  {movieDetail.genres.map((genre) => genre.name).join(', ')}
                </li>
                <span className="absolute bottom-1 hidden lg:inline">.</span>
                <li className="lg:inline lg:pl-3">
                  {movieDetail.runtime + 'm'}
                </li>
              </ul>
              <div className="inline-flex items-center justify-center gap-4 pt-4">
                <CircularProgress percentage={movieDetail.vote_average * 10} />
                <p className="w-24 text-base">Avaliação dos usuários</p>
              </div>
              <p className="pt-4 text-xl font-bold">Sinopse</p>
              <p className="pt-4 text-base">{movieDetail.overview}</p>
              <Crew crew={movieCredits.crew} />
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className="mt-12 lg:mt-80">
          <h2 className="bold text-[28px]">Elenco Original</h2>
          <Cast cast={movieCredits.cast} />
          {movieVideos.results.length > 0 && (
            <>
              <h2 className="bold mb-6 mt-10 text-[28px]">Trailer</h2>
              <iframe
                  title={movieVideos.results[0].name}
                className="h-60 w-full	md:h-[720px] md:w-[1280px]"
                src={`https://www.youtube.com/embed/${movieVideos.results[0].key}`}
              />
            </>
          )}
          <h2 className="bold mt-10 text-[28px]">Recomendações</h2>
          <MovieList movies={movieRecommendations.results.slice(0, 5)} />
        </div>
      </Container>
    </>
  )
}
