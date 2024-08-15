import logoFooter from "../imgs/logo-footer.png";
import mail from "/assets/mail.svg";
import phone from "/assets/phone.svg";
import flask from "/assets/flask.svg";
import facebook from "/assets/facebook.svg";
import instagram from "/assets/instagram.svg";
import youtube from "/assets/youtube.svg";

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font bg-color font-sans">
      <div className="container px-10 py-20 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a className="flex title-font font-lg items-center md:justify-start justify-center text-gray-900">
            <img src={logoFooter} alt="" className="w-30 h-28 text-white" />
          </a>
        </div>
        <div className="flex-grow flex md:pl-0 -mb-10 md:mt-0 mt-10 md:text-center text-center border-l-4 border-white">
          <div className="md:w-1/7 w-full px-2">
            <h2 className="font-semibold uppercase text-gray-100 tracking-widest underline underline-offset-4 text-base mb-3 pr-36">
              contáctenos:
            </h2>
            <nav className="list-none mb-0">
              <li className="flex items-center mb-2 group pl-2 max-w-md">
                <img
                  src={mail}
                  alt=""
                  className="w-7 h-7 mr-3 group-hover:invert"
                />
                <a
                  className="text-gray-800 hover:text-white cursor-pointer hover:underline hover:underline-offset-8"
                  href="mailto:contacto@nordvitalips.com"
                >
                  contacto@nordvitalips.com
                </a>
              </li>
              <li className="flex items-center mb-2 group pl-2">
                <img
                  src={phone}
                  alt=""
                  className="w-7 h-7 mr-3 group-hover:invert"
                />
                <a className="flex text-gray-900 hover:text-white cursor-pointer hover:underline hover:underline-offset-8">
                  Telefono: 5892750
                </a>
              </li>
              <li className="flex items-center mb-3 group pl-2">
                <img
                  src={flask}
                  alt=""
                  className="w-7 h-7 mr-3 group-hover:invert"
                />
                <a
                  className="text-gray-800 hover:text-white cursor-pointer hover:underline hover:underline-offset-8"
                  href="https://api.whatsapp.com/send?phone=573174309873&text=Hola%20sean%20bienvenidos%20a%20Nordvital%20ips,%20una%20ips%20comprometida%20con%20sus%20usuarios."
                  target="_blank"
                >
                  Resultados Laboratorio
                </a>
              </li>
            </nav>
          </div>
        </div>
        <div className="md:w-1/3 w-full px-2">
          <h2 className="font-semibold uppercase text-gray-100 tracking-widest underline underline-offset-4 text-base mb-3">
            Misión:
          </h2>
          <nav className="list-none mb-10">
            <li className="max-w-md mx-full">
              {" "}
              {/* max-w-md limita el ancho máximo */}
              <p className="text-justify text-gray-900">
                Nordvital IPS SAS proporciona atención integral de salud con un
                enfoque social, humano y de seguridad a sus usuarios. Estamos
                dedicados a la actualización constante de nuestro personal, la
                renovación tecnológica y la innovación en la atención médica.
              </p>
            </li>
          </nav>
        </div>
        <div className="w-96">
          <h2 className="font-semibold uppercase text-gray-100 tracking-widest underline underline-offset-4 text-sm mb-3">
            Visión:
          </h2>
          <nav className="list-none mb-2">
            <li className="max-w-md mx-full">
              {" "}
              {/* max-w-md limita el ancho máximo */}
              <p className="text-justify text-gray-800">
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
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2024
            <a
              href="https://nordvitalips.com/Pagina-nordvitalips/index.php"
              rel="noopener noreferrer"
              className="text-gray-600 ml-1"
              target="_blank"
            >
              Nordvital IPS
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a
              className="text-gray-500"
              href="https://www.facebook.com/Nordvitaloficial/?locale=es_LA"
            >
              <img src={facebook} alt="" className="w-5 h-5" />
            </a>
            <a
              className="ml-3 text-gray-500"
              href="https://www.youtube.com/@ipsnordvital7237"
            >
              <img src={youtube} alt="" className="w-5 h-5" />
            </a>

            <a
              className="ml-3 text-gray-500"
              href="https://www.instagram.com/nordvital_ips/"
            >
              <img src={instagram} alt="" className="w-5 h-5" />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
