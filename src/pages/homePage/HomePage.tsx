import React, { useState, useEffect, Fragment } from "react";

import { LoadingAnimation } from "../../components/LoadingAnimation";
import PopularMovie from "../popularMovie";
import FoundMovie from "../foundMovie";
import MovieApi, { Movies } from "../../api/MovieApi";
import logo from "../../assets/img/the-movie-db-logo.png";
import lines from "../../assets/img/line-group.png";

enum Tabs {
  popularMovies = 0,
  foundMovies
}

export const HomePage = () => {
  const [tab, setTab] = useState<Tabs>(Tabs.popularMovies);
  const [popularMovies, setPopularMovies] = useState<Movies | null>();
  const [foundMovies, setFoundMovies] = useState<Movies | null>();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  async function searchMovies() {
    setLoading(true);
    const foundMovies = await MovieApi.searchMovie({
      query: title
    });

    setFoundMovies(foundMovies);
    setLoading(false);
    setTab(Tabs.foundMovies);
  }

  async function fetchPopularMovies() {
    setLoading(true);
    const popularMovies = await MovieApi.getMovies({
      sort_by: "popularity.desc"
    });
    setPopularMovies(popularMovies);
    setLoading(false);
  }

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  function keyPressed(e: any) {

    if (e.key === "Enter" && title) {
      searchMovies();
    }
  }

  function handleClick() {
    setTab(Tabs.popularMovies);
  }

  if (loading) {
    return <LoadingAnimation />;
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
        <img className="lines" src={lines} alt="" />
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
      {tab === Tabs.popularMovies && popularMovies && (
        <PopularMovie popularMovies={popularMovies} />
      )}
      {tab === Tabs.foundMovies && foundMovies && (
        <FoundMovie foundMovies={foundMovies} />
      )}
    </Fragment>
  );
};
