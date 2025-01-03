//*Icons
import mail from "/assets/mail.svg";
import phone from "/assets/phone.svg";
import flask from "/assets/flask.svg";
import youtube from "/assets/youtube.svg";
import facebook from "/assets/facebook.svg";
import instagram from "/assets/instagram.svg";
import logoFooter from "@/imgs/logo-footer.png";

const Footer = () => {
  return (
    <footer className="font-sans text-gray-600 border-t-2 border-black dark:border-white body-font bg-color dark:bg-gray-800 border-top">
      <div className="container flex flex-col flex-wrap px-10 py-20 mx-auto md:items-center lg:items-start md:flex-row md:flex-nowrap">
        <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
          <a className="flex items-center justify-center text-gray-900 title-font font-lg md:justify-start">
            <img src={logoFooter} alt="" className="text-white w-30 h-28" />
          </a>
        </div>
        <div className="flex flex-grow mt-10 -mb-10 text-center border-l-4 border-white md:pl-0 md:mt-0 md:text-center">
          <div className="w-full px-2 md:w-1/7">
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
                Nordvital IPS SAS proporciona atención integral de salud con un
                enfoque social, humano y de seguridad a sus usuarios. Estamos
                dedicados a la actualización constante de nuestro personal, la
                renovación tecnológica y la innovación en la atención médica.
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
                En 2024, buscamos ser líderes regionales y reconocidos
                nacionalmente como una IPS que cumple con altos estándares de
                calidad. Nos comprometemos a proporcionar atención amable,
                segura y confiable, con el objetivo de alcanzar la plena
                satisfacción de nuestros usuarios.
              </p>
            </li>
          </nav>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container flex flex-col flex-wrap px-5 py-4 mx-auto sm:flex-row">
          <p className="flex items-center text-xl text-gray-500">
            <a
              href="https://nordvitalips.com/Pagina-nordvitalips/index.php"
              rel="noopener noreferrer"
              className="ml-1 text-gray-600"
              target="_blank"
            >
              Nordvital IPS © 2024
            </a>
          </p>
          <span className="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start ">
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
