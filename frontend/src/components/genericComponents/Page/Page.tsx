import './Page.scss';
import { ReactNode } from 'react';

const Page = ({ children }: Props) => <main className="page">{children}</main>;

export default Page;

type Props = {
  children: ReactNode;
};
