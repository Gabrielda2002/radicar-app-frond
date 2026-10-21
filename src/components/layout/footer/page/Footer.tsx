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
    <footer className="relative shrink-0 font-sans text-sm text-gray-600 md:text-base body-font bg-gradient-to-r from-teal-900 via-teal-800 to-teal-950">
      {/* Formas decorativas difuminadas, igual al header de bienvenida */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-16 -right-12 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute -top-20 right-1/4 h-60 w-60 rounded-full bg-teal-400/10 blur-2xl" />
      </div>

      {/* Container principal con mejor manejo responsive */}
      <div className="relative z-10 container flex flex-col items-center px-4 py-4 mx-auto space-y-6 sm:px-2 md:space-y-0 md:flex-row md:py-5 lg:px-8">
        <div className="flex justify-center w-full md:w-auto md:justify-start">
          <a className="flex items-center justify-center">
            <img
              src={logoFooter}
              alt="Nordvital IPS Logo"
              className="w-32 h-20 object-contain md:w-40 md:h-24 lg:w-52 lg:h-24"
            />
          </a>
        </div>

        <div className="grid min-w-0 w-full grid-cols-1 gap-4 text-sm md:grid-cols-[minmax(0,1fr)_auto] md:gap-6 md:ml-8 lg:ml-12">

          <div className="min-w-0">
            <div className="pl-2 ml-2 border-l-2 border-white">
              <h2 className="ml-2 text-base font-semibold tracking-widest text-gray-100 underline uppercase underline-offset-4">
                Contáctenos:
              </h2>
              <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 py-3 pl-2">
                <div className="flex shrink-0 items-center whitespace-nowrap group">
                  <img
                    src={mail}
                    alt="Email"
                    className="w-6 h-6 mr-3 group-hover:invert"
                  />
                  <a
                    className="text-gray-100 break-all hover:text-white hover:underline hover:underline-offset-8"
                    href="mailto:contacto@nordvitalips.com"
                  >
                    contacto@nordvitalips.com
                  </a>
                </div>
                <div className="flex shrink-0 items-center whitespace-nowrap group">
                  <img
                    src={phone}
                    alt="Teléfono"
                    className="w-6 h-6 mr-3 group-hover:invert"
                  />
                  <a className="text-gray-100 hover:text-white hover:underline hover:underline-offset-8">
                    Teléfono: 5892750
                  </a>
                </div>
                <div className="flex shrink-0 items-center whitespace-nowrap group">
                  <img
                    src={flask}
                    alt="Laboratorio"
                    className="w-6 h-6 mr-3 group-hover:invert"
                  />
                  <a
                    className="text-gray-100 hover:text-white hover:underline hover:underline-offset-8"
                    href="https://api.whatsapp.com/send?phone=573174309873&text=Hola%20sean%20bienvenidos%20a%20Nordvital%20ips,%20una%20ips%20comprometida%20con%20sus%20usuarios."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resultados Laboratorio
                  </a>
                </div>
              </nav>
            </div>
          </div>

          <div className="flex flex-row flex-wrap items-start gap-2 md:mr-20">
            <div className="group relative w-fit">
              <div className="w-fit rounded-md border border-white/20 bg-white/5 px-3 py-1.5 font-semibold tracking-wide text-gray-100 transition-colors group-hover:bg-white/10 group-focus-within:bg-white/10">
                Misión
              </div>
              <p className="invisible absolute bottom-full right-0 z-20 w-72 rounded-md border border-white/20 bg-teal-950 p-3 text-sm leading-relaxed text-gray-100/90 opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              En NORDVITAL IPS S.A.S,. somos una institución prestadora de
              servicios de salud ambulatorios de baja y mediana complejidad con
              presencia a nivel nacional, con capital humano integral y
              comprometido, espacios confortables y tecnología de punta que
              ofrece atención con altos estándares de calidad y el propósito de
              garantizar la satisfacción a nuestros usuarios y sus familias.
              </p>
            </div>

            <div className="group relative w-fit">
              <div className="w-fit rounded-md border border-white/20 bg-white/5 px-3 py-1.5 font-semibold tracking-wide text-gray-100 transition-colors group-hover:bg-white/10 group-focus-within:bg-white/10">
                Visión
              </div>
              <p className="invisible absolute bottom-full right-0 z-20 w-72 rounded-md border border-white/20 bg-teal-950 p-3 text-sm leading-relaxed text-gray-100/90 opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                Posicionar NORDVITAL IPS en el 2029 como una organización líder en
              innovación, servicios de alta calidad y excelencia en la atención,
              fortaleciendo nuestra capacidad operativa a nivel nacional, siendo
              reconocidos por nuestros usuarios, clientes, profesionales y
              entorno social.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 bg-gray-100">
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
              <p className="px-2 py-1 mr-4 text-white duration-300 rounded-full bg-linear-to-r from-color to-color2">
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