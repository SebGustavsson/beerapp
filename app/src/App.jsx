import "./App.css";
import axios from "axios";
import Item from "./components/Item";
import { useState } from "react";
import SearchForm from "./components/SearchForm";

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
    <div className="bodywrapper">
      <SearchForm
        onSubmitSearchValue={saveSearchValueHandler}
        onSearch={fetchData}
        url={url}
      />
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
    </div>
  );
}
