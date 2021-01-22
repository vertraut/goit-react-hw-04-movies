import React from 'react';
import { Link } from 'react-router-dom';

export default function List({ title, array, baseUrl = '/movies' }) {
  //
  //
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {array.map(item => {
          return (
            <li key={item.id}>
              <Link to={`${baseUrl}/${item.id}`}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
