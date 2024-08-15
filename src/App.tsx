import "./App.css";

import Layout from "./components/layout";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import SideBar from "./components/pages/sidebar";
import Perfil from "./components/pages/perfil";

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
