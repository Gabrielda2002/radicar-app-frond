const Layout = (props: any) => {
  return (
    <>
      <section className="px-12 pt-10 mx-auto max-w-screen">
        {props.children}
      </section>
    </>
  );
};

export default Layout;
