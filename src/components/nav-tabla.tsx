const NavTabla = () => {
  return (
    <div className="">
      <h1 className="text-color text-4xl mb-4">Módulo Radicación</h1>
      <nav className="">
        <ol className="mb-2 flex">
          <li className="text-slate-400 after:mr-2 ">Inicio</li>
          <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">Servicio Radicación</li>
        </ol>
        <div className="pb-2">
          <a href="/inicio" >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-arrow-back-up"
              width="40"
              height="30"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="#597e8d"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 14l-4 -4l4 -4" />
              <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
            </svg>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default NavTabla;
