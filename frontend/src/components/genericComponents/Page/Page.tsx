import './Page.scss';
import { ReactNode } from 'react';

const Page = ({ children }: Props) => (
  <section className="page">{children}</section>
);

export default Page;

type Props = {
  children: ReactNode;
};
