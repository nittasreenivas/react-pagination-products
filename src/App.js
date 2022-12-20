import "./styles.css";
import { useEffect, useState } from "react";
export default function App() {
  const [products, setProducts] = useState([]);
  const [todosPerPage, setTodoPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const url = "https://dummyjson.com/products?limit=100";
  console.log("url", url);
  const fetchProducts = async (api) => {
    const response = await fetch(api);
    const { products } = await response.json();
    console.log(products);
    setProducts(products);
  };
  useEffect(() => {
    fetchProducts(url);
  }, []);
  const numOfTotalPages = Math.ceil(products.length / todosPerPage);
  console.log("numOfTotalPages", numOfTotalPages);
  const pages = [...Array(numOfTotalPages + 1).keys()].slice(1);
  console.log("pages", pages);
  const lastIndex = todosPerPage * currentPage;
  const firstIndex = lastIndex - todosPerPage;
  const visibleTodos = products.slice(firstIndex, lastIndex);
  const PrevPageHandle = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  const NextPageHandle = () => {
    if (currentPage !== numOfTotalPages) setCurrentPage(currentPage + 1);
  };
  return (
    <div className="App">
      <div>
        <select
          onChange={(e) => setTodoPerPage(e.target.value)}
          className="select"
        >
          <option value="10">10 </option>
          <option value="20">20 </option>
          <option value="30">30 </option>
          <option value="40">40</option>
          <option value="50">50 </option>
        </select>
      </div>
      <div className="phone-container">
        {visibleTodos.map((item) => {
          const { id, title, description, thumbnail, price } = item;
          return (
            <div key={id} className="phones">
              <h3> {title} </h3>
              <img alt={title} src={thumbnail} width={200} />
              <p> {description} </p>
              <button> ${price} </button>
            </div>
          );
        })}
        <div className="page">
          <span onClick={PrevPageHandle}> Prev </span>
          {pages.map((page) => {
            return (
              <span
                key={page}
                className={`${currentPage === page ? "active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {" "}
                {page}{" "}
              </span>
            );
          })}
          <span onClick={NextPageHandle}> Next </span>
        </div>
      </div>
    </div>
  );
}
