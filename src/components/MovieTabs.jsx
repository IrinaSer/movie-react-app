import React from "react";
const classNames = require("classnames");

class MovieTabs extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.sort_by !== this.props.sort_by) {
      return true;
    }
    return false;
  }
  getClass = (value) => {
    return classNames({
      "nav-link": true,
      active: this.props.sort_by === value,
    });
  };

  handleClick = (value) => () => {
    this.props.updateSortBy(value);
  };
  render() {
    return (
      <ul className="tabs nav nav-pills">
        <li className={this.getClass("popularity.desc")} onClick={this.handleClick("popularity.desc")}>
          <div className="nav-link">Popularity desc</div>
        </li>
        <li className={this.getClass("revenue.desc")} onClick={this.handleClick("revenue.desc")}>
          <div className="nav-link">Revenue desc</div>
        </li>
        <li className={this.getClass("vote_average.desc")} onClick={this.handleClick("vote_average.desc")}>
          <div className="nav-link">Vote average desc</div>
        </li>
      </ul>
    );
  }
}

export default MovieTabs;
