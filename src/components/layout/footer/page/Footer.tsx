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
    <footer className="font-sans text-sm text-gray-600 border-t-2 border-black md:text-[16px] dark:border-white body-font bg-color dark:bg-gray-800 border-top">
      <div className="container flex flex-col flex-wrap px-10 py-8 mx-auto md:items-center lg:items-start md:flex-row md:flex-nowrap">
        <div className="flex-shrink-0 w-64 text-center ml-14 md:ml-0 md:mx-0 md:text-left">
          <a className="flex items-center justify-center text-gray-900 title-font font-lg md:justify-start">
            <img src={logoFooter} alt="" className="w-32 h-24 text-white md:w-44 md:h-28"/>
          </a>
        </div>
        <div className="flex flex-grow mt-10 -mb-10 text-center border-l-4 border-white md:pl-0 md:mt-0 md:text-center">
          <div className="w-full px-2 pb-10 md:w-1/7">
            <h2 className="mb-3 text-base font-semibold tracking-widest text-gray-100 underline uppercase underline-offset-4 pr-36">
              contáctenos:
            </h2>
            <nav className="mb-0 list-none">
              <li className="flex items-center max-w-md pl-2 mb-2 group">
                <img
                  src={mail}
                  alt=""
                  className="mr-3 w-7 h-7 group-hover:invert"
                />
                <a
                  className="text-gray-900 cursor-pointer dark:text-gray-100 hover:text-white hover:underline hover:underline-offset-8"
                  href="mailto:contacto@nordvitalips.com"
                >
                  contacto@nordvitalips.com
                </a>
              </li>
              <li className="flex items-center pl-2 mb-2 group">
                <img
                  src={phone}
                  alt=""
                  className="mr-3 w-7 h-7 group-hover:invert"
                />
                <a className="flex text-gray-900 cursor-pointer dark:text-gray-100 hover:text-white hover:underline hover:underline-offset-8">
                  Telefono: 5892750
                </a>
              </li>
              <li className="flex items-center pl-2 mb-3 group">
                <img
                  src={flask}
                  alt=""
                  className="mr-3 w-7 h-7 group-hover:invert"
                />
                <a
                  className="text-gray-900 cursor-pointer dark:text-gray-100 hover:text-white hover:underline hover:underline-offset-8"
                  href="https://api.whatsapp.com/send?phone=573174309873&text=Hola%20sean%20bienvenidos%20a%20Nordvital%20ips,%20una%20ips%20comprometida%20con%20sus%20usuarios."
                  target="_blank"
                >
                  Resultados Laboratorio
                </a>
              </li>
            </nav>
          </div>
        </div>
        <div className="w-full px-2 md:w-1/3">
          <h2 className="mb-3 text-base font-semibold tracking-widest text-gray-100 underline uppercase underline-offset-4">
            Misión:
          </h2>
          <nav className="mb-10 list-none">
            <li className="max-w-md mx-full">
              {" "}
              {/* max-w-md limita el ancho máximo */}
              <p className="text-justify text-gray-900 dark:text-gray-100">
                En NORDVITAL IPS S.A.S,. somos una institución prestadora de
                servicios de salud ambulatorios de baja y mediana complejidad
                con presencia a nivel nacional, con capital humano integral y
                comprometido, espacios confortables y tecnología de punta que
                ofrece atención con altos estándares de calidad y el propósito
                de garantizar la satisfacción a nuestros usuarios y sus
                familias.
              </p>
            </li>
          </nav>
        </div>
        <div className="w-96">
          <h2 className="mb-3 text-sm font-semibold tracking-widest text-gray-100 underline uppercase underline-offset-4">
            Visión:
          </h2>
          <nav className="mb-2 list-none">
            <li className="max-w-md mx-full">
              {" "}
              {/* max-w-md limita el ancho máximo */}
              <p className="text-justify text-gray-900 dark:text-gray-100">
                Posicionar NORDVITAL IPS en el 2029 como una organización líder
                en innovación, servicios de alta calidad y excelencia en la
                atención, fortaleciendo nuestra capacidad operativa a nivel
                nacional, siendo reconocidos por nuestros usuarios, clientes,
                profesionales y entorno social.
              </p>
            </li>
          </nav>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container flex flex-col flex-wrap px-5 py-4 mx-auto text-lg md:text-xl sm:flex-row">
          <p className="flex items-center text-gray-500">
            <a
              href="https://nordvitalips.com/Pagina-nordvitalips/index.php"
              rel="noopener noreferrer"
              className="ml-1 text-gray-600"
              target="_blank"
            >
              Nordvital IPS © 2025
            </a>
          </p>
          <span className="inline-flex justify-end mt-2 sm:ml-auto sm:mt-0 sm:justify-start ">
            <div className="flex items-center cursor-pointer">
              <p className="px-2 py-1 mr-4 text-white duration-300 border border-black rounded-full dark:border-color bg-gradient-to-r from-color to-color2">
                <a href="/politicas-cookies.html" target="_blank">
                  Politicas de Cookies
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
