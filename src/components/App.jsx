import React from "react";
import moviesData from "../moviesData";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: moviesData,
    };
  }
  removeMovie(movie) {
    const updateMovies = this.state.movies.filter(function (item) {
      return item.id !== movie.id;
    });
    this.setState({
      movies: updateMovies,
    });
  }

  render() {
    return (
      <div>
        {this.state.movies.map((movie) => {
          return (
            <div key={movie.id}>
              <p>{movie.title}</p>
              <button onClick={this.removeMovie.bind(this, movie)}>
                Delete movie
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
