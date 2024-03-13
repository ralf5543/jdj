/* eslint-disable react/no-unescaped-entities */
import { useContext } from 'react';
import { ThemeContext } from '../../utils/context';
import './AppHeader.scss';
import logo from '../../assets/logo-jdj.svg';

import Navigation from './Navigation/Navigation';

const AppHeader = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <header className={`main-header ${theme}-theme`}>
      <div className="main-header_content">
        <Navigation />
        <div className="main-header_inner">
          <img className="main-header_logo" src={logo} alt="JdJ logo" />
          <div className="main-header_titles">
            <h1 className="main-header_title">
              Jeux <span className="main-header_title_highlight">du</span> Jeudi
            </h1>
            <p className="main-header_subtitle">
              ...m'enfin surtout du week-end, en fait.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
