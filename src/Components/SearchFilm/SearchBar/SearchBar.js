import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import s from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const history = useHistory();
  const location = useLocation();

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const trimQuery = query.trim();
    if (trimQuery === '') return;
    history.push({ ...location, search: `query=${query}` });
    onSubmit(trimQuery);
  };

  return (
    <div>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie..."
          value={query}
          onChange={handleChange}
        />
        <button type="submit" className={s.button}>
          Search
        </button>
      </form>
    </div>
  );
}
