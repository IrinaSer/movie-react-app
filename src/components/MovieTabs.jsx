import React from "react";

class MovieTabs extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.sort_by !== this.sort_by) {
      return true;
    }
    return false;
  }
  render() {
    const { sort_by, updateSortBy } = this.props;
    const handleClick = (value) => () => {
      updateSortBy(value);
    };
    const getClass = (value) => {
      return `nav-link ${sort_by === value ? "active" : ""}`;
    };
    return (
      <ul className="tabs nav nav-pills">
        <li className={getClass("popularity.desc")} onClick={handleClick("popularity.desc")}>
          <div className="nav-link">Popularity desc</div>
        </li>
        <li className={getClass("revenue.desc")} onClick={handleClick("revenue.desc")}>
          <div className="nav-link">Revenue desc</div>
        </li>
        <li className={getClass("vote_average.desc")} onClick={handleClick("vote_average.desc")}>
          <div className="nav-link">Vote average desc</div>
        </li>
      </ul>
    );
  }
}

export default MovieTabs;
