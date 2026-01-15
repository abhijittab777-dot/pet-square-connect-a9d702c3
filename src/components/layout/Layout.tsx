import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SOSButton from './SOSButton';

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

const Layout = ({ children, showFooter = true }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      {showFooter && <Footer />}
      <SOSButton />
    </div>
  );
};

export default Layout;
