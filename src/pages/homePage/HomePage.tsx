import React, { useState, lazy, Suspense, useEffect, Fragment } from "react";

import { LoadingAnimation } from "../../components/LoadingAnimation";
import MovieApi, { Movies } from "../../api/MovieApi";
import logo from "../../assets/img/the-movie-db-logo.png";
import lines from "../../assets/img/line-group.png";

const FoundMovie = lazy(() => import("../foundMovie"));
const PopularMovie = lazy(() => import("../popularMovie"));

enum Tabs {
  popularMovies = 0,
  foundMovies
}

export const HomePage = () => {
  const [tab, setTab] = useState<Tabs>(Tabs.popularMovies);
  const [popularMovies, setPopularMovies] = useState<Movies | null>();
  const [foundMovies, setFoundMovies] = useState<Movies | null>();
  const [title, setTitle] = useState("");

  async function searchMovies() {
    const foundMovies = await MovieApi.searchMovie({
      query: title
    });
    setFoundMovies(foundMovies);
    setTab(Tabs.foundMovies);
  }

  async function fetchPopularMovies() {
    const popularMovies = await MovieApi.getMovies({
      sort_by: "popularity.desc"
    });
    setPopularMovies(popularMovies);
  }

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  function keyPressed(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && title) {
      searchMovies();
    }
  }

  function handleClick() {
    setTab(Tabs.popularMovies);
  }

  return (
    <Fragment>
      <div className="hero">
        {tab === Tabs.foundMovies && (
          <i className="material-icons arrow-back" onClick={handleClick}>
            {" "}
            arrow_back
          </i>
        )}
        <img className="lines" src={lines} alt="background effect" />
        <img className="hero__logo" src={logo} alt="movie database logo" />
        <div className="wrapper">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyPress={e => keyPressed(e)}
            className="pl1"
            placeholder="Search"
            type="text"
          />
          <i className="material-icons search">search</i>
        </div>
      </div>
      <Suspense fallback={<LoadingAnimation />}>
        {tab === Tabs.popularMovies && popularMovies && (
          <PopularMovie popularMovies={popularMovies} />
        )}
        {tab === Tabs.foundMovies && foundMovies && (
          <FoundMovie foundMovies={foundMovies} />
        )}
      </Suspense>
    </Fragment>
  );
};
