import React, { useContext, Fragment } from "react";
import { format } from "date-fns";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { Movies } from "../../api/MovieApi";
import { PageContext } from "../../components/context/PageContext";

interface Props {
  popularMovies: Movies | null;
}

export const PopularMovie = ({ popularMovies }: Props) => {
  const { minusCurrentPage, addCurrentPage, currentPage } = useContext(
    PageContext
  );

  return (
    <Fragment>
      <div className="homepage">
        <h1 className="homepage__title">Popular Movies</h1>
        <ul className="pagination">
          {currentPage > 1 && (
            <button className="pagination__button" onClick={minusCurrentPage}>
              {" "}
              previous
            </button>
          )}
          <button className="pagination__button" onClick={addCurrentPage}>
            {" "}
            next
          </button>
        </ul>
      </div>
      <div className="movie-list">
        {popularMovies &&
          popularMovies.results.map(
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
                      srcSet={`https://image.tmdb.org/t/p/w300${poster_path}`}
                      media="(max-width: 37.5em)"
                    />
                    <img
                      srcSet={`https://image.tmdb.org/t/p/w500${poster_path}`}
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
