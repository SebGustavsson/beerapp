import { useState } from "react";
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
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="Search">Search</label>
        <input type="text" onChange={valueChangeHandler} />
        <button type="submit" onClick={handleClick}>
          click me
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
