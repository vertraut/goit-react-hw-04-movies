import { useState, useEffect } from 'react';

import Spinner from '../Spinner';
import status from '../../status';
import * as moviesAPI from '../../ApiServises/themoviedb';

export default function Reviews({ movieID, title }) {
  const [reviews, setReviews] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(status.PENDING);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCurrentStatus(status.PENDING);
    moviesAPI
      .fetchMovieReviews(movieID)
      .then(res => {
        if (res.total_results === 0) {
          setCurrentStatus(status.RESOLVED);
          return;
        }
        setReviews(res.results);
        setCurrentStatus(status.RESOLVED);
      })
      .catch(error => {
        setError({ error });
        setCurrentStatus(status.REJECTED);
      });
  }, [movieID]);

  const reviewsRender = () => {
    if (!reviews) {
      return `We don't have any reviews for ${title}.`;
    }
    const reviewsList = reviews.map(item => (
      <li key={item.id}>
        {item.author}
        <p>{item.content}</p>
      </li>
    ));
    return reviewsList;
  };

  if (currentStatus === status.PENDING) {
    return <Spinner />;
  }

  if (currentStatus === status.REJECTED) {
    return <div>{`Возникла ошибка ${error}`}</div>;
  }

  if (currentStatus === status.RESOLVED) {
    return <ul>{reviewsRender()}</ul>;
  }
}
