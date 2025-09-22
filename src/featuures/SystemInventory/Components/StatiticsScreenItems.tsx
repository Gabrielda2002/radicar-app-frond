import React, { useState } from "react";
import AgeStatics from "./AgeStatics";
import ExpiringSoonStatics from "./ExpiringSoonStatics";
import QuantityItemsStatics from "./QuantityItemsStatics";
import ItemsWithLockStatics from "./ItemsWithLockStatics";
import QuantityTypeItens from "./QuantityTypeItems";
import { useAuth } from "@/context/authContext";

interface StatiticsScreemItemsProps {
  idHeadquartersSelected?: number;
}

const StatiticsScreemItems: React.FC<StatiticsScreemItemsProps> = ({
  idHeadquartersSelected 
}) => {

  const { rol } = useAuth();

  const SECTIONS = [
    { id: 1, name: "Computadoras" },
    { id: 2, name: "Dispositivos Red" },
    { id: 3, name: "Inventario General" },
    { id: 4, name: "Televisores"},
    { id: 5, name: "Celulares"}
  ];

  const [activeSection, setActiveSection] = useState(1);

  return (
    <div className="flex flex-col w-full overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-900">
      {/* Tabs Header */}
      <div className="sticky top-0 flex w-full overflow-x-auto bg-white rounded-t-lg shadow-md z-100 dark:bg-gray-800"> 
        <div className="grid w-full grid-cols-1 md:flex place-self-center">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              className={`px-6 py-4 font-medium transition-all duration-200 whitespace-nowrap flex-1 text-center ${
                activeSection === s.id
                  ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-400"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
              }`}
              onClick={() => setActiveSection(s.id)}
              role="tab"
              aria-selected={activeSection === s.id}
              aria-controls={`panel-${s.id}`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs Content */}
      <div className="p-1 bg-white rounded-b-lg shadow-md md:p-4 dark:bg-gray-800">
        <div
          role="tabpanel"
          id={`panel-${activeSection}`}
          className="transition-opacity duration-300"
        >
          {activeSection === 1 && [1].includes(Number(rol)) ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <QuantityTypeItens typeItem="equipos" idHeadquartersSelected={idHeadquartersSelected} />
              <ExpiringSoonStatics typeItem="equipos" idHeadquartersSelected={idHeadquartersSelected} />
              <AgeStatics typeItem="equipos" />
              <ItemsWithLockStatics typeItem="equipos" />
              <QuantityItemsStatics typeItem="equipos" />
            </div>
          ) : activeSection === 3 && [1,6].includes(Number(rol)) ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <ExpiringSoonStatics typeItem="inventario/general" idHeadquartersSelected={idHeadquartersSelected} />
              <AgeStatics typeItem="inventario/general" />
              <QuantityItemsStatics typeItem="inventario/general" />
            </div>
          ) : activeSection === 2 && [1].includes(Number(rol)) ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <QuantityItemsStatics typeItem="dispositivos-red" />
            </div>
          ) :  activeSection === 4 && [1].includes(Number(rol)) ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <QuantityItemsStatics typeItem="inventario/televisores" />
              <AgeStatics typeItem="inventario/televisores" />
              <ExpiringSoonStatics typeItem="inventario/televisores" idHeadquartersSelected={idHeadquartersSelected} />
            </div>
          ): activeSection === 5 && [1].includes(Number(rol)) ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <QuantityItemsStatics typeItem="inventario/celulares"/>
              <AgeStatics typeItem="inventario/celulares" />
              <ExpiringSoonStatics typeItem="inventario/celulares" idHeadquartersSelected={idHeadquartersSelected} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default StatiticsScreemItems;
