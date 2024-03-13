import { useContext } from 'react';
import { ThemeContext } from '../../utils/context';
import './AppFooter.scss';

const AppFooter = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="main-footer">
      <div className="main-footer_inner">
        <span className="author">@Ralf</span>
        <span className="date">{year}</span>
        <button type="button" className="main-footer_cta" onClick={toggleTheme}>
          Changer de mode : {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </footer>
  );
};

export default AppFooter;
