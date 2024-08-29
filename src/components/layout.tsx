const Layout = (props: any) => {
  return (
    <>
      <section className="w-full px-12 pt-10 mx-auto">
        {props.children}
      </section>
    </>
  );
};

export default Layout;
