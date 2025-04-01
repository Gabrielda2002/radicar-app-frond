const Layout = (props: any) => {
  return (
    <>
      <section className="w-full px-4 pt-4 md:pt-10 md:px-12">
        {props.children}
      </section>
    </>
  );
};

export default Layout;
