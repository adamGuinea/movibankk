import React, { useState, useEffect, Fragment } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { format } from "date-fns";

import { LoadingAnimation } from '../../components/LoadingAnimation';
import MovieApi, { Movie } from "../../api/MovieApi";

interface RouteInfo {
  id: string;
}

interface ComponentProps extends RouteComponentProps<RouteInfo> {}

export const SingleMovie = ({ match }: ComponentProps) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  async function fetchMovie(id: string) {
    setLoading(true);

    const movie = await MovieApi.getMovie(id);
    setLoading(false);
    setMovie(movie);
  }

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  function handleClick() {
    history.goBack();
  }

  function convertTime(num: number) {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours}hrs ${minutes}mins`;
  }

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <Fragment>
      {movie && (
        <div className="detail">
          <div className="detail__backdrop">
            <i className="material-icons arrow-back" onClick={handleClick}>
              {" "}
              arrow_back
            </i>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt="movie backdrop"
            />
          </div>
          <div className="detail__poster">
            <div className="flex">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt="movie backdrop"
              />
              <div className="container" style={{ paddingTop: "10rem" }}>
                <div
                  className="title"
                  dangerouslySetInnerHTML={{
                    __html: movie.title
                  }}
                />
                <div className="flex">
                  <div
                    className="date"
                    dangerouslySetInnerHTML={{
                      __html: format(new Date(movie.release_date), "yyyy")
                    }}
                  />
                  &middot;
                  <div className="score">
                    {movie.vote_average * 10}% user score
                  </div>
                </div>
                <div className="duration">{convertTime(movie.runtime)}</div>
              </div>
            </div>
            <hr />
            <h1>Overview</h1>
            <div
              className="overview"
              dangerouslySetInnerHTML={{
                __html: movie.overview
              }}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};
