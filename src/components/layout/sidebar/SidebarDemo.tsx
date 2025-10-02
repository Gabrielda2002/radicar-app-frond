import React from 'react';
import { SidebarImproved } from './index';

/**
 * Ejemplo de integración del Sidebar Mejorado
 * 
 * Este componente demuestra cómo usar el nuevo sidebar
 * y puede servir como referencia para la migración
 */
const SidebarDemo: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar Mejorado */}
      <SidebarImproved className="custom-sidebar-class" />
      
      {/* Contenido principal */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Sidebar Mejorado - Demo
          </h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Características Principales
            </h2>
            
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Configuración basada en datos para fácil mantenimiento
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Sistema de permisos por roles automático
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Soporte completo para modo oscuro/claro
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Animaciones suaves y mejoras de UX
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Tipado completo con TypeScript
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Hooks personalizados para lógica reutilizable
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Componentes modulares y extensibles
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
              💡 Para desarrolladores
            </h3>
            <p className="text-blue-700 dark:text-blue-300">
              El nuevo sidebar está completamente configurado desde 
              <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-sm mx-1">
                config/sidebarConfig.ts
              </code>
              lo que hace que agregar nuevas categorías y subcategorías sea muy sencillo.
              Solo necesitas actualizar la configuración sin tocar el código de los componentes.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
              🚀 Migración
            </h3>
            <p className="text-green-700 dark:text-green-300">
              Para migrar del sidebar anterior, simplemente cambia el import:
            </p>
            <pre className="bg-green-100 dark:bg-green-800 p-3 rounded mt-2 text-sm overflow-x-auto">
              <code>{`// Antes
import SideBar from './sidebar/page/SideBar';

// Después  
import { SidebarImproved } from './sidebar';`}</code>
            </pre>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
              ⚠️ Importante
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              El sidebar se filtra automáticamente según el rol del usuario. Asegúrate de que 
              los permisos estén correctamente configurados en 
              <code className="bg-yellow-100 dark:bg-yellow-800 px-2 py-1 rounded text-sm mx-1">
                sidebarConfig.ts
              </code>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SidebarDemo;