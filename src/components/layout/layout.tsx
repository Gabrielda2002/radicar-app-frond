import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <section className="min-h-full w-full md:px-4 md:pt-4">
        {children}
      </section>
    </>
  );
};

export default Layout;
