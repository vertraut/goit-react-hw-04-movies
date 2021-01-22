import { useState } from 'react';
import s from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const trimQuery = query.trim();
    if (trimQuery === '') return;
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
          placeholder="Search movie"
          value={query}
          onChange={handleChange}
        />
        <button type="submit" className={s.button}>
          <span className="SearchForm-button-label">Search</span>
        </button>
      </form>
    </div>
  );
}
