import Loader from 'react-loader-spinner';
import s from './Spinner.module.css';

export default function Spinner() {
  return (
    <div className={s.wrapper}>
      <Loader type="Circles" color="#ce2a2a" height={80} width={80} />
    </div>
  );
}
