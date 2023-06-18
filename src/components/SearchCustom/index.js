import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SearchActions } from '../../actions';

const SearchBookingCare = () => {
  const [query, setQuery] = useState('');
  const {listData} = useSelector((state) => (state.search));
  const [results, setResults] = useState([]);
  const dispatch = useDispatch();

  const search = async () => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const cxId = process.env.REACT_APP_CX_ID;
    const newQuery ={
      key:apiKey,
      cx:cxId,
      q:query,
      num_results:20
    }
    dispatch(SearchActions.GetList(newQuery))
    };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    search();
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter your search query"
        />
        <button type="submit">Search</button>
      </form>

      <ul>
        {listData.map((item) => (
          <li key={item.link}>
            <a href={item.link}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBookingCare;
