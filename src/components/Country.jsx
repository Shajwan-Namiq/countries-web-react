import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const baseURL =
  "https://raw.githubusercontent.com/iamspruce/search-filter-painate-reactjs/main/data/countries.json";

export default function Country() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["name", "capital", "numericCode"]);

  const [filterParam, setFilterParam] = useState(["All"]);

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setIsLoaded(true);
        setItems(response.data);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, []);

  const data = Object.values(items);

  function search(items) {
    return items.filter((item) => {
      if (item.region == filterParam) {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      } else if (filterParam == "All") {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      }
    });
  }

  if (error) {
    return <p>{error.message}</p>;
  } else if (!isLoaded) {
    return <>loading...</>;
  } else {
    return (
      <>
        <div className="wrapper">
          <div className="mt-14 flex items-center py-4">
            <div className="flex-grow h-px bg-gray-400"></div>
            <span className="flex-shrink px-4 italic   text-white  flex justify-center items-center font-extrabold text-xl">
              Find Your Country
            </span>
            <div className="flex-grow h-px bg-gray-400"></div>
          </div>

          {/*** search for items  ***/}

          <div className="mt-5 mb-10 flex flex-wrap  justify-between gap-2">
            <div className="w-full mb-3 lg:mb-0 lg:w-3/6 ">
              <form>
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="search"
                    name="search-form"
                    id="search-form"
                    className="search block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for..."
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                  />
                </div>
              </form>
            </div>

            <div className="w-full lg:w-2/6  ">
              <select
                onChange={(e) => {
                  setFilterParam(e.target.value);
                }}
                className="block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                aria-label="Filter Countries By Region"
              >
                <option value="All">Filter By Region</option>
                <option value="Africa">Africa</option>
                <option value="Americas">America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
              </select>
            </div>
          </div>

          <ul className="card-grid">
            {search(data)
              .slice(0, 8)
              .map((item) => (
                <li key={item.alpha3Code}>
                  <article className="card transform transition duration-500 hover:scale-90">
                    <div className="card-image">
                      <img src={item.flag.large} alt={item.name} />
                    </div>
                    <div className="card-content">
                      <h2 className="card-name text-xl font-bold text-[#0f175c] flex justify-center">{item.name}</h2>
                      <ol className="card-list">
                        <li>
                          <span className="text-gray-500">population:</span>{" "}
                          <span>{item.population}</span>
                        </li>
                        <li>
                          <span className="text-gray-500">Region:</span> <span>{item.region}</span>
                        </li>
                        <li>
                          <span className="text-gray-500">Capital:</span> <span>{item.capital}</span>
                        </li>
                      </ol>
                    </div>
                  </article>
                </li>
              ))}
          </ul>
        </div>
      </>
    );
  }
}
 
