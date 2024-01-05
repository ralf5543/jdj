import './Loader.scss';

const Loader = () => {
  return (
    <div className="loader">
      <img
        className="spinner"
        src="../../../src/assets/ball-triangle.svg"
        alt="loader"
      />
    </div>
  );
};

export default Loader;
