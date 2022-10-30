import "./App.css";
import axios from "axios";
import { useState, useRef } from "react";
import SearchForm from "./components/UI/SearchForm";

export default function App() {
  const [searchValue, setSearchValue] = useState();
  const saveSearchValueHandler = (enteredSearchValue) => {
    setSearchValue(enteredSearchValue);
  };
  //seems like query is ignoring dashes
  const url = `https://api.punkapi.com/v2/beers?beer_name=${searchValue}`;
  const [data, setData] = useState([]);
  const fetchData = async (u) => {
    return await axios.get(u).then((res) => {
      setData(res.data);
    });
  };

  //Varje gång submit noll
  return (
    <div className="App">
      <SearchForm
        onSubmitSearchValue={saveSearchValueHandler}
        onSearch={fetchData}
        url={url}
      />

      <ul>
        {data?.map((beer, index) => {
          return (
            <Item
              key={index}
              name={beer.name}
              abv={beer.abv}
              description={beer.description}
              foodpairing={beer.food_pairing}
            />
          );
        })}
      </ul>
    </div>
  );
}

const Item = (props) => {
  return (
    <>
      <li>Name: {props.name}</li>
      <li>Alcohol content: {props.abv}%</li>
      <details>
        <summary>Description</summary>
        {props.description}
      </details>
      <details>
        <summary>Food pairing</summary>
        {props.foodpairing.map((pairing) => {
          return pairing;
        })}
      </details>
    </>
  );
};
