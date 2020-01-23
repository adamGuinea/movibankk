import React, { useState, useContext, lazy, Suspense, Fragment } from "react";

import { LoadingAnimation } from "../../components/LoadingAnimation";
import MovieApi, { Movies } from "../../api/MovieApi";
import logo from "../../assets/img/the-movie-db-logo.png";
import lines from "../../assets/img/line-group.png";
import { PageContext } from "../../components/context/PageContext";

const FoundMovie = lazy(() => import("../foundMovie"));
const PopularMovie = lazy(() => import("../popularMovie"));

enum Tabs {
  popularMovies,
  foundMovies
}

export const HomePage = () => {
  const [tab, setTab] = useState<Tabs>(Tabs.popularMovies);
  const [foundMovies, setFoundMovies] = useState<Movies | null>();
  const [title, setTitle] = useState("");
  const { popularMovies } = useContext(PageContext);

  async function searchMovies() {
    const foundMovies = await MovieApi.searchMovie({
      query: title
    });
    setFoundMovies(foundMovies);
    setTab(Tabs.foundMovies);
  }

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
          <FoundMovie foundMovies={foundMovies} title={title} />
        )}
      </Suspense>
    </Fragment>
  );
}
