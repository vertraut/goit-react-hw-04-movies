import React from 'react';
import s from './BackBtn.module.css';

export default function BackBtn({ title = 'Go back' }) {
  return (
    <div className={s.wrapper}>
      <button type="button">◀️ {title}</button>
    </div>
  );
}
