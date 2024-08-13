import "./App.css";

import Layout from "./components/layout";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import SideBar from "./components/pages/sidebar";

import { Navigate, Route, Routes } from "react-router-dom";

import Inicio from "./components/pages/inicio";
import Modulos from "./components/pages/modulos";
import Login from "./components/pages/login";
import Registro from "./components/pages/registro";

export function App() {
  return (
    <>
      <div>
        <div className="bg-slate-400">
          <SideBar />
          <Navbar />
          <Layout>
            <Routes>
              <Route path="/" element={<Inicio></Inicio>}></Route>
              <Route path="/modulos" element={<Modulos></Modulos>}></Route>
              <Route path="/login" element={<Login></Login>}></Route>
              <Route path="/registro" element={<Registro></Registro>}></Route>
              <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
            </Routes>
          </Layout>
          <Footer />
        </div>
      </div>
    </>
  );
}
