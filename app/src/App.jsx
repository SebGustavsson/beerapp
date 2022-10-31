import "./App.css";
import axios from "axios";
import { useState } from "react";
import SearchForm from "./components/SearchForm";
import ReactPaginate from "react-paginate";
import Card from "./components/UI/Card";

export default function App() {
  const [searchValue, setSearchValue] = useState();
  const [page, setPage] = useState();
  const saveSearchValueHandler = (enteredSearchValue) => {
    setSearchValue(enteredSearchValue);
  };
  //seems like query is ignoring dashes
  const pageLimit = 10;
  const url = `https://api.punkapi.com/v2/beers?beer_name=${searchValue}&per_page=${pageLimit}`;
  const [data, setData] = useState([]);
  const fetchData = async (url) => {
    return await axios.get(url).then((res) => {
      setData(res.data);
    });
  };
  const fetchNextPage = async (currentPage) => {
    await axios
      .get(
        `https://api.punkapi.com/v2/beers?beer_name=${searchValue}&per_page=${pageLimit}&page=${currentPage}`
      )
      .then((res) => {
        setData(res.data);
      });
  };

  const pageClickHandler = async (data) => {
    let currentPage = data.selected + 1;
    const pageServer = await fetchNextPage(currentPage);
    setPage(pageServer);
  };

  //Varje gång submit noll
  return (
    <div className="bodywrapper">
      <SearchForm
        onSubmitSearchValue={saveSearchValueHandler}
        onSearch={fetchData}
        url={url}
      />
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={6}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={pageClickHandler}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item"}
        breakLinkClassName={"page-link"}
        breakClassName={"page-item"}
        activeClassName={"active"}
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
const Item = (props) => {
  return (
    <Card>
      <ul>
        <li>Name: {props.name}</li>
        <li>Alcohol content: {props.abv}%</li>
        <details>
          <summary>Description</summary>
          {props.description}
        </details>
        <details>
          <summary>Food pairing</summary>
          {props.foodpairing.map((pairing) => {
            return `${pairing}, `;
          })}
        </details>
      </ul>
    </Card>
  );
};
