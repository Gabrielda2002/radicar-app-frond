const Button = (props: any) => {
  const { name } = props;
  return (
    <>
      <button className="bg-slate-500 px-5 py-2 text-white">{name}</button>
    </>
  );
};

export default Button;
