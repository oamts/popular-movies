import { Header } from '@/components/Header'
import { MovieList } from '@/components/MovieList'
import { getMovieList } from '@/api/service'
import { Container } from '@/components/Container'
import { Pagination } from '@/components/MovieList/pagination'

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { page, genre } = searchParams

  let pageNumber = 1
  let initialGenres: number[] = []

  if (typeof page === 'string') {
    pageNumber = parseInt(page)
  }

  if (typeof genre === 'string') initialGenres = [Number(genre)]
  if (Array.isArray(genre)) initialGenres = genre.map(Number)

  console.log(initialGenres)
  const data = await getMovieList(pageNumber, initialGenres)
  const movies = data.results

  return (
    <>
      <Header initialGenres={initialGenres} />
      <Container>
        <MovieList movies={movies} />
        <Pagination
          pageNumber={pageNumber}
          totalPages={data.total_pages}
          initialGenres={initialGenres}
        />
        <div className="mt-20"></div>
      </Container>
    </>
  )
}
