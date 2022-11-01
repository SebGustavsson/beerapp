import "./App.css";
import axios from "axios";
import { useState } from "react";
import SearchForm from "./components/SearchForm";
import ReactPaginate from "react-paginate";
import Item from "./components/Item";
import "./components/UI/Pagination.css";

export default function App() {
  const [searchValue, setSearchValue] = useState();
  const [page, setPage] = useState();
  const [error, setError] = useState();
  const saveSearchValueHandler = (enteredSearchValue) => {
    setSearchValue(enteredSearchValue);
  };
  //seems like query is ignoring dashes
  const pageLimit = 10;
  const url = `https://api.punkapi.com/v2/beers?beer_name=${searchValue}&per_page=${pageLimit}`;
  const [data, setData] = useState([]);
  const fetchData = async (url) => {
    return await axios.get(url).then((res) => {
      if (res.data.length == 0) {
        setError("Can't find any beers. Please enter a valid beer");
        return error;
      } else {
        setError();
        console.log(error);
      }
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
        pageCount={3}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={pageClickHandler}
        containerClassName={
          data.length == 0 || data.length < 10
            ? "pagination hidden"
            : "pagination justify-content-center"
        }
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item"}
        breakLinkClassName={"page-link"}
        breakClassName={"page-item"}
        activeClassName={"active"}
        renderOnZeroPageCount={null}
      />
      {typeof error === "string" && (
        <div className="card">
          <h3>{error}</h3>
        </div>
      )}
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
