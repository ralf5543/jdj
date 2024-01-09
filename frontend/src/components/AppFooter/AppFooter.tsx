import './AppFooter.scss';

const AppFooter = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="main-footer">
      <span className="author">@Ralf</span>
      <span className="date">{year}</span>
    </footer>
  );
};

export default AppFooter;
