import { getMovieList } from '@/api/service'

export default async function sitemap() {
  const data = await getMovieList()
  const movies = data.results
  console.log(movies)
  return movies.map((movie) => ({
    url: 'http://localhost:3000/filme/' + movie.id,
  }))
}
