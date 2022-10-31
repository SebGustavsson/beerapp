import { useState } from "react";
import Card from "./UI/Card";
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
    <Card>
      <form className="searchform" onSubmit={submitHandler}>
        <input placeholder="Search" type="text" onChange={valueChangeHandler} />
        <button type="submit" onClick={handleClick}>
          Search
        </button>
      </form>
    </Card>
  );
};

export default SearchForm;
