import { Fragment } from 'react';
import Navigation from './Navigation';

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <Fragment>
      <Navigation />
      <main>{children}</main>
    </Fragment>
  );
};
export default Layout;
