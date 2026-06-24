import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <section className="min-h-full w-full px-4 pt-4 md:px-12 md:pt-10">
        {children}
      </section>
    </>
  );
};

export default Layout;
