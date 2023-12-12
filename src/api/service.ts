import {
  GenresData,
  MovieCredits,
  MovieDetail,
  MovieListData,
  MovieVideos,
} from '@/types'

require('@next/env').loadEnvConfig('./')

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
}
const baseUrl = 'https://api.themoviedb.org/3'

export const getMovieList = async (
  page = 1,
  genres: number[] = [],
): Promise<MovieListData> => {
  const url = `${baseUrl}/discover/movie?page=${page}&language=pt-BR&with_genres=${genres.join(
    ',',
  )}`

  console.log(url)

  const res = await fetch(url, options)
  return await res.json()
}

export const getGenreList = async (): Promise<GenresData> => {
  const url = `${baseUrl}/genre/movie/list?language=pt-BR`

  const res = await fetch(url, options)
  return await res.json()
}

export const getMovieInfo = async (movieId: number | string) => {
  const movieDetailUrl = `${baseUrl}/movie/${movieId}?language=pt-BR`
  const movieRecommendationsUrl = `${baseUrl}/movie/${movieId}/recommendations?language=pt-BR`
  const movieCreditsUrl = `${baseUrl}/movie/${movieId}/credits?language=pt-BR`
  const movieVideosUrl = `${baseUrl}/movie/${movieId}/videos?language=pt-BR`

  const urls = [
    movieDetailUrl,
    movieRecommendationsUrl,
    movieCreditsUrl,
    movieVideosUrl,
  ]
  const promises = urls.map((url) => fetch(url, options))
  const responses = await Promise.all(promises)
  const resPromises = responses.map((res) => res.json())

  const [movieDetail, movieRecommendations, movieCredits, movieVideos] =
    (await Promise.all(resPromises)) as [
      MovieDetail,
      MovieListData,
      MovieCredits,
      MovieVideos,
    ]

  return { movieDetail, movieRecommendations, movieCredits, movieVideos }
}
