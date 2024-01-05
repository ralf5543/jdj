/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import './Page.scss';
import { ReactNode } from 'react';

const Page = ({ children }: Props) => (
  <main className="page">
    {children}
  </main>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;

type Props = {
  children: ReactNode;
}