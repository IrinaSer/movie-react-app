import React from "react";
import MovieItem from "./MovieItem";
import MovieTabs from "./MovieTabs";
import ReactPaginate from "react-paginate";
import { API_URL, API_KEY_3 } from "../utils/api";
import "../App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: "popularity.desc",
      offset: 0,
      perPage: 20,
      currentPage: 1,
      pageCount: 0,
      isLoading: false,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage + 1,
        offset: offset,
      },
      () => {
        this.getMovies();
      }
    );
  };

  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort_by !== this.state.sort_by) {
      this.getMovies();
    }
  }

  getMovies = () => {
    this.setState({
      isLoading: true,
    });
    fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.currentPage}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          movies: data.results,
          currentPage: data.page,
          pageCount: data.total_pages,
          isLoading: false,
        });
      });
  };

  removeMovie = (movie) => {
    const updateMovies = this.state.movies.filter(function (item) {
      return item.id !== movie.id;
    });
    this.setState({
      movies: updateMovies,
    });
  };

  addMovieToWillWatch = (movie) => {
    const updateMoviesWillWatch = [...this.state.moviesWillWatch, movie];

    this.setState({
      moviesWillWatch: updateMoviesWillWatch,
    });
  };

  removeMovieToWillWatch = (movie) => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(function (
      item
    ) {
      return item.id !== movie.id;
    });
    this.setState({
      moviesWillWatch: updateMoviesWillWatch,
    });
  };

  updateSortBy = (value) => {
    this.setState({
      sort_by: value,
    });
  };

  render() {
    let pageContent;
    if (this.state.isLoading) {
      pageContent = (
        <div className="d-flex justify-content-center mt-4 mb-4">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else {
      pageContent = (
        <div>
          <div className="row mt-4">
            <div className="col-lg-9">
              <div className="row mb-4">
                <div className="col-12">
                  <MovieTabs
                    sort_by={this.state.sort_by}
                    updateSortBy={this.updateSortBy}
                  />
                </div>
              </div>
              <div className="row">
                {this.state.movies.map((movie) => {
                  return (
                    <div className="col-lg-6 col-md-12 mb-4" key={movie.id}>
                      <MovieItem
                        movie={movie}
                        removeMovie={this.removeMovie}
                        addMovieToWillWatch={this.addMovieToWillWatch}
                        removeMovieToWillWatch={this.removeMovieToWillWatch}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-lg-3">
              <p>Will watch: {this.state.moviesWillWatch.length}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
        </div>
      );
    }
    return <div className="container">{pageContent}</div>;
  }
}

export default App;
