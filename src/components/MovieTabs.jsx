import React from "react";

const MovieTabs = (props) => {
  const { sort_by, updateSortBy } = props;
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
};

export default MovieTabs;
