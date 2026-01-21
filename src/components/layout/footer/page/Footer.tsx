//*Icons
import mail from "/assets/mail.svg";
import phone from "/assets/phone.svg";
import flask from "/assets/flask.svg";
import youtube from "/assets/youtube.svg";
import facebook from "/assets/facebook.svg";
import instagram from "/assets/instagram.svg";
import logoFooter from "@/assets/Layout/logo-footer.png";

const Footer = () => {
  return (
    <footer className="font-sans text-sm text-gray-600 border-t-2 border-black md:text-base dark:border-white body-font bg-color dark:bg-gray-800">
      {/* Container principal con mejor manejo responsive */}
      <div className="container flex flex-col px-4 py-6 mx-auto space-y-8 sm:px-2 md:space-y-0 md:flex-row md:py-8 lg:px-8">
        <div className="flex justify-center w-full md:w-auto md:justify-start">
          <a className="flex items-center justify-center">
            <img
              src={logoFooter}
              alt="Nordvital IPS Logo"
              className="w-32 h-24 md:w-40 md:h-32 lg:w-56 lg:h-32"
            />
          </a>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 text-sm md:text-[15px] md:grid-cols-3 md:gap-4 lg:gap-8 md:ml-8 lg:ml-12">

          <div className="space-y-4">
            <div className="inline-block pl-2 ml-2 border-b-0 border-l-2 border-white">
              <h2 className="ml-2 text-base font-semibold tracking-widest text-gray-100 underline uppercase underline-offset-4">
                Contáctenos:
              </h2>
              <nav className="pl-2 space-y-4">
                <li className="flex items-center mt-2 group">
                  <img
                    src={mail}
                    alt="Email"
                    className="w-6 h-6 mr-3 group-hover:invert"
                  />
                  <a
                    className="text-gray-900 break-all dark:text-gray-100 hover:text-white hover:underline hover:underline-offset-8"
                    href="mailto:contacto@nordvitalips.com"
                  >
                    contacto@nordvitalips.com
                  </a>
                </li>
                <li className="flex items-center group">
                  <img
                    src={phone}
                    alt="Teléfono"
                    className="w-6 h-6 mr-3 group-hover:invert"
                  />
                  <a className="text-gray-900 dark:text-gray-100 hover:text-white hover:underline hover:underline-offset-8">
                    Teléfono: 5892750
                  </a>
                </li>
                <li className="flex items-center group">
                  <img
                    src={flask}
                    alt="Laboratorio"
                    className="w-6 h-6 mr-3 group-hover:invert"
                  />
                  <a
                    className="text-gray-900 dark:text-gray-100 hover:text-white hover:underline hover:underline-offset-8"
                    href="https://api.whatsapp.com/send?phone=573174309873&text=Hola%20sean%20bienvenidos%20a%20Nordvital%20ips,%20una%20ips%20comprometida%20con%20sus%20usuarios."
                    target="_blank"
                  >
                    Resultados Laboratorio
                  </a>
                </li>
              </nav>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-base font-semibold tracking-widest text-gray-100 underline uppercase underline-offset-4">
              Misión:
            </h2>
            <p className="text-justify text-gray-900 dark:text-gray-100">
              En NORDVITAL IPS S.A.S,. somos una institución prestadora de
              servicios de salud ambulatorios de baja y mediana complejidad con
              presencia a nivel nacional, con capital humano integral y
              comprometido, espacios confortables y tecnología de punta que
              ofrece atención con altos estándares de calidad y el propósito de
              garantizar la satisfacción a nuestros usuarios y sus familias.
            </p>
          </div>

          {/* Visión */}
          <div className="space-y-4">
            <h2 className="text-base font-semibold tracking-widest text-gray-100 underline uppercase underline-offset-4">
              Visión:
            </h2>
            <p className="text-justify text-gray-900 dark:text-gray-100">
              Posicionar NORDVITAL IPS en el 2029 como una organización líder en
              innovación, servicios de alta calidad y excelencia en la atención,
              fortaleciendo nuestra capacidad operativa a nivel nacional, siendo
              reconocidos por nuestros usuarios, clientes, profesionales y
              entorno social.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container flex flex-col flex-wrap px-5 py-4 mx-auto text-lg md:text-xl sm:flex-row">
          <p className="flex items-center text-gray-500">
            <a
              href="https://nordvitalips.com/"
              rel="noopener noreferrer"
              className="text-gray-600"
              target="_blank"
            >
              Nordvital IPS © {new Date().getFullYear()}
            </a>
          </p>
          <span className="inline-flex justify-end mt-2 sm:ml-auto sm:mt-0 sm:justify-start ">
            <div className="flex items-center cursor-pointer">
              <p className="px-2 py-1 mr-4 text-white duration-300 border border-black rounded-full dark:border-color bg-linear-to-r from-color to-color2">
                <a href="/politicas-cookies.html" target="_blank">
                  Políticas de Cookies
                </a>
              </p>
            </div>
            <a
              className="text-gray-500 duration-300 ease-in-out hover:text-white hover:-translate-y-2"
              href="https://www.facebook.com/Nordvitaloficial/?locale=es_LA"
              target="_blank"
            >
              <img src={facebook} alt="" className="w-8 h-8" />
            </a>
            <a
              className="ml-3 text-gray-500 duration-300 ease-in-out hover:text-white hover:-translate-y-2"
              href="https://www.youtube.com/@ipsnordvital7237"
              target="_blank"
            >
              <img src={youtube} alt="" className="w-8 h-8" />
            </a>
            <a
              className="ml-3 text-gray-500 duration-300 ease-in-out hover:text-white hover:-translate-y-2"
              href="https://www.instagram.com/nordvital_ips/"
              target="_blank"
            >
              <img src={instagram} alt="" className="w-8 h-8" />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
