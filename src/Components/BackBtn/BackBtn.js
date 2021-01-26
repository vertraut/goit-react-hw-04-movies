import React from 'react';
import s from './BackBtn.module.css';

export default function BackBtn({ title = 'Go back', onClick }) {
  return (
    <div className={s.wrapper}>
      <button type="button" onClick={onClick} className={s.btn}>
        &#8656; {title}
      </button>
    </div>
  );
}
