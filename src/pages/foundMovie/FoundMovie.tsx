import React, { Fragment, SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import classNames from "classnames";

import logo from '../../assets/img/broken-link-chain.svg';

import { Movies } from "../../api/MovieApi";

interface Props {
  foundMovies: Movies;
}

const handleSrcError = (e: SyntheticEvent<HTMLSourceElement>) => {
  e.currentTarget.src = logo
}

const handleImgError = (e: SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = logo
}

export const FoundMovie = ({ foundMovies }: Props) => {
  return (
    <Fragment>
      <h1 className="homepage-title">
        {foundMovies.results.length > 1
          ? "Found Movies"
          : "Oops, we couldn't find that title"}
      </h1>
      <div className="movie-list">
        {foundMovies &&
          foundMovies.results.map(
            ({ poster_path, vote_average, title, release_date, id }, index) => (
              <div className="movie" key={index}>
                <div className="movie__poster" key={index}>
                  <span
                    className={classNames("average", {
                      low: vote_average < 5,
                      medium: vote_average <= 8.5 && vote_average >= 5,
                      high: vote_average > 8.5
                    })}
                  >
                    {vote_average * 10}%
                  </span>
                  <picture>
                    <source
                      onError={(e) => handleSrcError(e)}
                      srcSet={`https://image.tmdb.org/t/p/w300${poster_path}`}
                      media="(max-width: 37.5em)"
                    />
                    <img
                      onError={(e) => handleImgError(e)}
                      src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                      alt="movie poster"
                    />
                  </picture>
                  <Link to={`/${id}`}>
                    <div className="title">{title}</div>
                  </Link>
                  <div className="release-date">
                    {format(new Date(release_date), "MMMM yyyy")}
                  </div>
                </div>
              </div>
            )
          )}
      </div>
    </Fragment>
  );
};
