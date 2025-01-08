const Layout = (props: any) => {
  return (
    <>
      <section className="w-full px-12 pt-10">
        {props.children}
      </section>
    </>
  );
};

export default Layout;
