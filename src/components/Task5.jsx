import React, { useState, useEffect } from 'react';


const Task5 = () => {
  const [data, setData] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [page, setPage] = useState(0);
  const [cache, setCache] = useState({});

  const ITEMS_PER_PAGE = 10;
  const API_URL = 'https://jsonplaceholder.typicode.com/todos';

  useEffect(() => {
    const fetchData = async (start) => {
      const url = `${API_URL}?_start=${start}&_limit=${ITEMS_PER_PAGE}`;
      if (cache[url]) {
        setData(cache[url]);
      } else {
        const response = await fetch(url);
        const res = await response.json();
        console.log(res);
        const uniqueData = filterUniqueByTitle(res);
        setCache((prevCache) => ({ ...prevCache, [url]: uniqueData }));
        setData(uniqueData);
      }
    };

    fetchData(page * ITEMS_PER_PAGE);
  }, [page]);

  const filterUniqueByTitle = (array) => {
    const titles = new Set();
    return array.filter((item) => {
      if (titles.has(item.title)) {
        return false;
      }
      titles.add(item.title);
      return true;
    });
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }));
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      {data.map((item) => (
        <div key={item.id}>
          <input
            type="checkbox"
            checked={!!checkedItems[item.id]}
            onChange={() => handleCheckboxChange(item.id)}
          />
          <label>{item.title}</label>
        </div>
      ))}
      <div>
        <button onClick={handlePrev} disabled={page === 0}>
          Prev
        </button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Task5;
