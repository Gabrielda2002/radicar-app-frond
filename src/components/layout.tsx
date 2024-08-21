const Layout = (props: any) => {
  return (
    <>
      <section className=" max-w-screen-tabletMx px-12 pt-10">{props.children}</section>
    </>
  );
};

export default Layout;
