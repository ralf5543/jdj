import './Loader.scss';
import svg from '../../../assets/ball-triangle.svg';

const Loader = () => {
  return (
    <div className="loader">
      <img className="spinner" src={svg} alt="loader" />
    </div>
  );
};

export default Loader;
