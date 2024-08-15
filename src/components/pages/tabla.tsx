import NavTabla from "../nav-tabla";
import HeaderTabla from "../header-tabla";
import ThTable from "../th-tabla";

const Tabla = () => {
  return (
    <>
      {/*elementos h1, li, icon (componentes juntos)*/}

      <NavTabla></NavTabla>

      <div className="container-table bg-white p-5 mb-11 shadow-lg shadow-indigo-500/40  rounded-md">
        {/* elementos search, options y registrar (componentes seperados)*/}

        <HeaderTabla></HeaderTabla>

        <table className="text-sm ">
          <thead>
            <tr className="">
              <ThTable>Fecha - Hora del Radicado</ThTable>
              <ThTable>N.º Radicado</ThTable>
              <ThTable>Convenio</ThTable>
              <ThTable>N.º Documento</ThTable>
              <ThTable>Nombre Paciente</ThTable>
              <ThTable>Fecha Auditoria</ThTable>
              {/* <ThTable>    </ThTable> */}
              <ThTable>Nombre Auditora</ThTable>
              <ThTable>Soporte</ThTable>
              <ThTable>Gestión Auxiliar</ThTable>
              <ThTable>Mostrar</ThTable>
              <ThTable>Servicio Solicitado</ThTable>
            </tr>
          </thead>
          <tbody>
            <tr className="border-solid border-y-2">
              <td className="p-2">....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-checkup-list"
                    width="30"
                    height="50"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="#597e8d"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                    <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                    <path d="M9 14h.01" />
                    <path d="M9 17h.01" />
                    <path d="M12 16l1 1l3 -3" />
                  </svg>
                </button>
              </td>
              <td>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-device-ipad-horizontal-search"
                    width="30"
                    height="50"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="#597e8d"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M11.5 20h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v5.5" />
                    <path d="M9 17h2" />
                    <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                    <path d="M20.2 20.2l1.8 1.8" />
                  </svg>
                </button>
              </td>
              <td>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-eye-plus"
                    width="30"
                    height="50"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="#597e8d"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                    <path d="M12 18c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                    <path d="M16 19h6" />
                    <path d="M19 16v6" />
                  </svg>
                </button>
              </td>
              <td>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-building-hospital"
                    width="30"
                    height="50"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="#597e8d"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 21l18 0" />
                    <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16" />
                    <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
                    <path d="M10 9l4 0" />
                    <path d="M12 7l0 4" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        {/*posible footer*/}
      </div>
    </>
  );
};
export default Tabla;
