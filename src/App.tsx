import "./App.css";

import Layout from "./components/layout";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import SideBar from "./components/pages/sidebar";
import Perfil from "./components/pages/perfil";

{/* <-- tables servicios --> */}
import Tabla from "./components/pages/tabla";
import TablaAuditoria from "./components/pages/tabla-auditoria";
import TablaCirugias from "./components/pages/tabla-cirugias";

{/* <-- tablas radicacion --> */}
import TablaCups from "./components/pages/tablas-radicacion/tabla-cups";
import TablaPacientes from "./components/pages/tablas-radicacion/tabla-pacientes";
import TablaRadicadores from "./components/pages/tablas-radicacion/tabla-radicadores";
import TablaMunicipios from "./components/pages/tablas-radicacion/tabla-municipios";
import TablaConvenios from "./components/pages/tablas-radicacion/tabla-convenios";
import TablaTipoDocumento from "./components/pages/tablas-radicacion/tabla-tipo-documento";
import TablaIpsPrimaria from "./components/pages/tablas-radicacion/tabla-ips-primaria";
import TablaLugarRadicacion from "./components/pages/tablas-radicacion/tabla-lugar-radicacion";
import TablaIpsRemite from "./components/pages/tablas-radicacion/tabla-ips-remite";
import TablaEspecialidad from "./components/pages/tablas-radicacion/tabla-especialidad";
import TablaTipoServicio from "./components/pages/tablas-radicacion/tabla-tipo-servicio";



import { Navigate, Route, Routes } from "react-router-dom";

import Inicio from "./components/pages/inicio";
import Modulos from "./components/pages/modulos";
import Login from "./components/pages/login";
import Registro from "./components/pages/registro";




export function App() {
  return (
    <>
      <div className="flex h-screen font-semibold">
        <SideBar />
        <div className="flex flex-col flex-grow bg-slate-200">
          <Navbar />
          <div className="flex-grow overflow-auto">
            <Layout>
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/modulos" element={<Modulos />} />

                <Route path="/tabla" element={<Tabla />} />
                <Route path="/tabla-auditoria" element={<TablaAuditoria />} />
                <Route path="/tabla-cirugias" element={<TablaCirugias />} />
                <Route path="/tabla-cups" element={<TablaCups />} />
                <Route path="/tabla-pacientes" element={<TablaPacientes />} />
                <Route path="/tabla-radicadores" element={<TablaRadicadores />} />
                <Route path="/tabla-municipios" element={<TablaMunicipios />} />
                <Route path="/tabla-convenios" element={<TablaConvenios />} />
                <Route path="/tabla-tipo-documento" element={<TablaTipoDocumento />} />
                <Route path="/tabla-ips-primaria" element={<TablaIpsPrimaria />} />
                <Route path="/tabla-lugar-radicacion" element={<TablaLugarRadicacion />} />
                <Route path="/tabla-ips-remite" element={<TablaIpsRemite />} />
                <Route path="/tabla-especialidad" element={<TablaEspecialidad />} />
                <Route path="/tabla-tipo-servicio" element={<TablaTipoServicio />} />
                
                
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Layout>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
