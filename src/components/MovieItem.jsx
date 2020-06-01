import React from "react";
const classNames = require("classnames");

class MovieItem extends React.Component {
  constructor() {
    super();
    this.state = {
      willWatch: false,
    };
  }

  render() {
    const { movie, removeMovie, addMovieToWillWatch, removeMovieToWillWatch } = this.props;
    const toggleWillWatch = () => {
      this.setState({
        willWatch: !this.state.willWatch,
      });
      if (this.state.willWatch) {
        removeMovieToWillWatch(movie);
      } else {
        addMovieToWillWatch(movie);
      }
    };
    const btnClass = classNames({
      "btn btn-success": this.state.willWatch,
      "btn btn-secondary": !this.state.willWatch,
    });
    return (
      <div className="card">
        <img className="card-img-top" src={`http:image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`} alt={movie.title} />
        <div className="card-body">
          <h6 className="card-title">{movie.title}</h6>
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">Rating: {movie.vote_average}</p>
            <button onClick={toggleWillWatch} type="button" className={btnClass}>
              {this.state.willWatch ? "Remove Will Watch" : "Add Will Watch"}
            </button>
          </div>
        </div>
        <button onClick={removeMovie.bind(this, movie)}>Delete movie</button>
      </div>
    );
  }
}

export default MovieItem;
