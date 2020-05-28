import React from "react";

class MovieItem extends React.Component {
  constructor() {
    super();
    this.state = {
      willWatch: false,
    };
  }

  render() {
    const { movie, removeMovie, addMovieToWillWatch, removeMovieToWillWatch } = this.props;
    return (
      <div className="card">
        <img className="card-img-top" src={`https:image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`} alt="" />
        <div className="card-body">
          <h6 className="card-title">{movie.title}</h6>
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">Rating: {movie.vote_average}</p>
            <button
              onClick={() => {
                if (this.state.willWatch) {
                  this.setState({
                    willWatch: false,
                  });
                  removeMovieToWillWatch(movie);
                } else {
                  this.setState({
                    willWatch: true,
                  });
                  addMovieToWillWatch(movie);
                }
              }}
              type="button"
              className={this.state.willWatch ? "btn btn-success" : "btn btn-secondary"}
            >
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
