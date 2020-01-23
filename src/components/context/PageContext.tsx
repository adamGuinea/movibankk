import React, { useState, useEffect, ReactNode } from "react";
import MovieApi from "../../api/MovieApi";

interface ChildProps {
  children: ReactNode;
}

const pageState = {
  addCurrentPage: () => {},
  minusCurrentPage: () => {},
  setLoading: (loading: boolean) => {},
  currentPage: 1,
  popularMovies: null,
  loading: false,
};

export const PageContext = React.createContext(pageState);

export default function PageProvider({ children }: ChildProps) {
  const [popularMovies, setPopularMovies] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function fetchPopularMovies(currentPage: number) {
    setLoading(true);
    const popularMovies = await MovieApi.getMovies({
      sort_by: "popularity.desc",
      page: currentPage
    });
    setPopularMovies(popularMovies);
    setLoading(false);
  }

  useEffect(() => {
    fetchPopularMovies(currentPage);
  }, [currentPage]);

  const addCurrentPage = () => {
    currentPage < popularMovies.total_pages && setCurrentPage(currentPage + 1);
    fetchPopularMovies(currentPage);
  };

  const minusCurrentPage = () => {
    currentPage > 1 && setCurrentPage(currentPage - 1);
    fetchPopularMovies(currentPage);
  };

  return (
    <PageContext.Provider
      value={{
        currentPage,
        addCurrentPage,
        minusCurrentPage,
        popularMovies,
        loading,
        setLoading,
      }}
    >
      {children}
    </PageContext.Provider>
  );
}
