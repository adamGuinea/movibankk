import BaseApi from "./BaseApi";

export type GetMoviesParam = {
  sort_by?: string
  query?: string
};

export type Movies = {
  page: number,
  total_results: number,
  total_pages: number,
  results: Movie[]
}

export type Movie = {
  popularity: number,
  vote_count: number,
  video: boolean,
  poster_path: string,
  id: number,
  adult: boolean,
  backdrop_path: string,
  original_language: string,
  original_title: string,
  genre_ids: [number],
  title: string,
  vote_average: number,
  runtime: number,
  overview: string,
  release_date: string
};

class MovieApi extends BaseApi {

  getHeaders = () => {
    const accessToken = localStorage.setItem('accessToken', process.env.REACT_APP_ACCESS_TOKEN || '');
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
    };
    return super.getHeaders(headers);
  }

  getMovies = (params: GetMoviesParam): Promise<Movies> => (
    this.get('/discover/movie', params)
  )

  getMovie = (movieId: string): Promise<Movie> => (
    this.get(`/movie/${movieId}`)
  )

  searchMovie = (params: GetMoviesParam): Promise<Movies> => (
    this.get('/search/movie', params)
  )
}

export default new MovieApi();