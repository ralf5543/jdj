import React from 'react';
import './AppFooter.scss';

const AppFooter = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="main-footer">
      <div className="main-footer_inner">
        <span className="author">@Ralf</span>
        <span className="date">{year}</span>
      </div>
    </footer>
  );
};

export default AppFooter;
