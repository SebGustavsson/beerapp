import { useState } from "react";
import "./SearchForm.css";
const _ = require("lodash");

const SearchForm = (props) => {
  // submitHandler
  const [searchTerm, setSearchTerm] = useState();
  const submitHandler = (event) => {
    props.onSearch(props.url);
    event.preventDefault();
  };

  const valueChangeHandler = (event) => {
    const targetValue = _.snakeCase(event.target.value);
    setSearchTerm(targetValue);
    props.onSubmitSearchValue(searchTerm);
  };

  const handleClick = () => {
    props.onSearch(props.url);
  };

  //Only update state on submit

  return (
    <div className="card" style={{ marginBottom: 15 }}>
      <div className="row">
        <div className="col">
          <form className="searchform" onSubmit={submitHandler}>
            <input
              className="form-control"
              placeholder="Search for beer"
              type="text"
              onChange={valueChangeHandler}
              aria-label="Search for beer"
            />
            <button
              className="btn btn-primary"
              type="submit"
              onClick={handleClick}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
