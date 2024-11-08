  //*Funciones y Hooks
  import React, { useState } from "react";
  import useAnimation from "../../../hooks/useAnimations";
  import * as Yup from "yup";
  //*Icons
  import onOff from "/assets/on-off.svg";
  import { useFormik } from "formik";
import { IItems } from "../../../models/IItems";
import { IItemsNetworking } from "../../../models/IItemsNetworking";
  
  interface ModalItemsFormProps {
    idSede: number | null;
    tipoItem: "equipos" | "dispositivos-red" | null;
    items: IItems | IItemsNetworking | null;
  }
  
  const ModalItemsForm: React.FC<ModalItemsFormProps> = ({ idSede, tipoItem, items }) => {
    const [stadopen, setStadopen] = useState(false);
    const { showAnimation, closing } = useAnimation(
      stadopen,
      () => setStadopen(false),
      300
    );

    console.log(idSede, tipoItem, items);

    const validationSchema = Yup.object({
      name: Yup.string()
        .required("El nombre es requerido")
        .min(2, "El nombre debe tener al menos 3 caracteres")
        .max(200, "El nombre debe tener como máximo 200 caracteres"),
      
      area: Yup.string().when('tipoItem', {
        is: (val: string) => val === 'equipos',
        then: (schema) => schema.required("El area es requerida"),
        otherwise: (schema) => schema.notRequired()
      }),
    
      typeEquipment: Yup.string().when('tipoItem', {
        is: (val: string) => val === 'equipos',
        then: (schema) => schema.required("El tipo de equipo es requerido"),
        otherwise: (schema) => schema.notRequired()
      }),
    
      brand: Yup.string()
        .required("La marca es requerida"),
      
      model: Yup.string()
        .required("El modelo es requerido"),
      
      serial: Yup.string()
        .required("El serial es requerido"),
    
      operationalSystem: Yup.string().when('tipoItem', {
        is: (val: string) => val === 'equipos',
        then: (schema) => schema.required("El sistema operativo es requerido"),
        otherwise: (schema) => schema.notRequired()
      }),
    
      mac: Yup.string()
        .required("La mac es requerida"),
    
      purchaseDate: Yup.date().when('tipoItem', {
        is: (val: string) => val === 'equipos',
        then: (schema) => schema.required("La fecha de compra es requerida"),
        otherwise: (schema) => schema.notRequired()
      }),
    
      warrantyTime: Yup.string().when('tipoItem', {
        is: (val: string) => val === 'equipos',
        then: (schema) => schema.required("El tiempo de garantia es requerido"),
        otherwise: (schema) => schema.notRequired()
      }),
    
      warranty: Yup.string().when('tipoItem', {
        is: (val: string) => val === 'equipos',
        then: (schema) => schema.required("La garantia es requerida"),
        otherwise: (schema) => schema.notRequired()
      }),
    
      deliveryDate: Yup.date().when('tipoItem', {
        is: (val: string) => val === 'equipos',
        then: (schema) => schema.required("La fecha de entrega es requerida"),
        otherwise: (schema) => schema.notRequired()
      }),
    
      inventoryNumber: Yup.string()
        .required("El inventario es requerido"),
    
      addressIp: Yup.string()
        .required("La direccion ip es requerida"),
    
      otherData: Yup.string().when('tipoItem', {
        is: (val: string) => val === 'dispositivos-red',
        then: (schema) => schema.required("Otros datos son requeridos"),
        otherwise: (schema) => schema.notRequired()
      }),
    
      status: Yup.string().when('tipoItem', {
        is: (val: string) => val === 'dispositivos-red',
        then: (schema) => schema.required("El estado es requerido"),
        otherwise: (schema) => schema.notRequired()
      })
    });
    
  
    const formik = useFormik({
      initialValues: {
        name: "",
        area:  "",
        typeEquipment:  "",
        brand:  "",
        model:  "",
        serial:  "",
        operationalSystem:  "",
        mac:  "",
        purchaseDate:  "",
        warrantyTime:  "",
        warranty:  "",
        deliveryDate:  "",
        inventoryNumber:  "",
        addressIp:  "",
        otherData:  "",
        status:  "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        console.log(values);
      },
    });
  
    return (
      <>
        <button className="focus:outline-none" onClick={() => setStadopen(true)}>
          <img className="dark:invert " src={onOff} alt="Configuraciones" />
        </button>
  
        {/* init event modal */}
        {stadopen && (
          <section
            className={`fixed inset-0 z-50 flex justify-center pt-16 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm ${
              showAnimation && !closing ? "opacity-100" : "opacity-0"
            }`}
          >
            <section className="">
              <div
                className={`w-full overflow-hidden transition-transform duration-300 transform bg-white rounded shadow-lg dark:bg-gray-600 ${
                  showAnimation && !closing ? "translate-y-0" : "translate-y-10"
                }`}
              >
                {/* container-header */}
                <div className="flex items-center justify-between p-3 bg-gray-200 border-b-2 dark:bg-gray-600 border-b-gray-900 dark:border-b-white">
                  <h1 className="text-2xl font-semibold text-color dark:text-gray-200">
                    Módulos
                  </h1>
                  <button
                    onClick={() => setStadopen(false)}
                    className="text-xl text-gray-400 duration-200 rounded-md dark:text-gray-100 w-7 h-7 hover:bg-gray-400 dark:hover:text-gray-900 hover:text-gray-900"
                  >
                    &times;
                  </button>
                </div>
  
                {/* init form */}
                <form
                  onSubmit={formik.handleSubmit}
                  className="max-h-[70Vh] overflow-y-auto dark:bg-gray-800 dark:text-gray-200"
                >

                    {/* formularios */}

                    <div>
                        <label htmlFor="name" className="block mt-2 text-sm font-semibold">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200"
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="text-red-500">{formik.errors.name}</div>
                        ) : null}
                    </div>

                    {tipoItem === 'equipos' && (
                        <div>
                            <label htmlFor="area" className="block mt-2 text-sm font-semibold">
                                Area
                            </label>
                            <input
                                type="text"
                                id="area"
                                name="area"
                                value={formik.values.area}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200"
                            />
                            {formik.touched.area && formik.errors.area ? (
                                <div className="text-red-500">{formik.errors.area}</div>
                            ) : null}
                        </div>
                    )}

                    {tipoItem === 'equipos' && (
                        <div>
                            <label htmlFor="typeEquipment" className="block mt-2 text-sm font-semibold">
                                Tipo de Equipo
                            </label>
                            <select
                                name="typeEquipment"
                                value={formik.values.typeEquipment}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200"
                            >
                                <option value="">Selecciona</option>
                                <option value="TODO EN 1">Todo en 1</option>
                                <option value="PORTATIL">Portatil</option>
                                <option value="ESCRITORIO">Escritorio</option>
                            </select>
                            {formik.touched.typeEquipment && formik.errors.typeEquipment ? (
                                <div className="text-red-500">{formik.errors.typeEquipment}</div>
                            ) : null}
                        </div>
                    )};

                    <div>
                        <label htmlFor="brand" className="block mt-2 text-sm font-semibold">
                            Marca
                        </label>
                        <select
                            name="brand"
                            value={formik.values.brand}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200"
                         >
                            <option value="">Seleccione</option>
                            <option value="LENOVO">Lenovo</option>
                            <option value="COMPUMAX">Compumax</option>
                            <option value="ASUS">Asus</option>
                            <option value="ACER">Acer</option>
                            <option value="HP">HP</option>
                            <option value="DELL">Dell</option>
                        </select>
                        {formik.touched.brand && formik.errors.brand ? (
                            <div className="text-red-500">{formik.errors.brand}</div>
                        ) : null}
                    </div>
                    
                    <div>
                        <label htmlFor="model" className="block mt-2 text-sm font-semibold">
                            Modelo
                        </label>
                        <input
                            type="text"
                            id="model"
                            name="model"
                            value={formik.values.model}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200"
                        />
                        {formik.touched.model && formik.errors.model ? (
                            <div className="text-red-500">{formik.errors.model}</div>
                        ) : null}
                    </div>

                    <div>
                        <label htmlFor="serial" className="block mt-2 text-sm font-semibold">
                            Serial
                        </label>
                        <input
                            type="text"
                            id="serial"
                            name="serial"
                            value={formik.values.serial}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200"
                        />
                        {formik.touched.serial && formik.errors.serial ? (
                            <div className="text-red-500">{formik.errors.serial}</div>
                        ) : null}
                    </div>

                    {tipoItem === 'equipos' && (
                        <div>
                            <label htmlFor="operationalSystem" className="block mt-2 text-sm font-semibold">
                                Sistema Operativo
                            </label>
                            <select 
                            name="" 
                            id=""
                            >
                                <option value="">Select</option>
                                <option value="WINDOWS 10">Windows 10</option>
                                <option value="WINDOWS 11">Windows 11</option>
                                <option value="WINDOWS 7">Windows 7</option>
                            </select>
                            {formik.touched.operationalSystem && formik.errors.operationalSystem ? (
                                <div className="text-red-500">{formik.errors.operationalSystem}</div>
                            ) : null}
                        </div>
                    )}

                    <div>
                        <label htmlFor="mac" className="block mt-2 text-sm font-semibold">
                            Mac
                        </label>
                        <input
                            type="text"
                            id="mac"
                            name="mac"
                            value={formik.values.mac}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200"
                        />
                        {formik.touched.mac && formik.errors.mac ? (
                            <div className="text-red-500">{formik.errors.mac}</div>
                        ) : null}
                    </div>

                    {tipoItem === 'equipos' && (
                        <div>
                            <label htmlFor="purchaseDate" className="block mt-2 text-sm font-semibold">
                                Fecha de Compra
                            </label>
                            <input
                                type="date"
                                id="purchaseDate"
                                name="purchaseDate"
                                value={formik.values.purchaseDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200"
                            />
                            {formik.touched.purchaseDate && formik.errors.purchaseDate ? (
                                <div className="text-red-500">{formik.errors.purchaseDate}</div>
                            ) : null}
                        </div>
                    )}

                    {tipoItem === 'equipos' && (
                        <div>
                            <label htmlFor="warrantyTime" className="block mt-2 text-sm font-semibold">
                                Tiempo de Garantia
                            </label>
                            <input
                                type="text"
                                id="warrantyTime"
                                name="warrantyTime"
                                value={formik.values.warrantyTime}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200"
                            />
                            {formik.touched.warrantyTime && formik.errors.warrantyTime ? (
                                <div className="text-red-500">{formik.errors.warrantyTime}</div>
                            ) : null}
                        </div>
                    )}

                    {tipoItem === 'equipos' && (
                        <div>
                            <label htmlFor="warranty" className="block mt-2 text-sm font-semibold">
                                Garantia
                            </label>
                            <input
                                type="text"
                                id="warranty"
                                name="warranty"
                                value={formik.values.warranty}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200"
                            />
                            {formik.touched.warranty && formik.errors.warranty ? (
                                <div className="text-red-500">{formik.errors.warranty}</div>
                            ) : null}
                        </div>
                    )}

                    {tipoItem === 'equipos' && (
                        <div>
                            <label htmlFor="deliveryDate" className="block mt-2 text-sm font-semibold">
                                Fecha Entrega
                            </label>
                            <input
                                type="date"
                                id="deliveryDate"
                                name="deliveryDate"
                                value={formik.values.deliveryDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200"
                            />
                            {formik.touched.deliveryDate && formik.errors.deliveryDate ? (
                                <div className="text-red-500">{formik.errors.deliveryDate}</div>
                            ) : null}
                        </div>
                    )}

                    <div>
                        <label htmlFor="inventoryNumber" className="block mt-2 text-sm font-semibold">
                            Numero de Inventario
                        </label>
                        <input
                            type="text"
                            id="inventoryNumber"
                            name="inventoryNumber"
                            value={formik.values.inventoryNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200"
                        />
                        {formik.touched.inventoryNumber && formik.errors.inventoryNumber ? (
                            <div className="text-red-500">{formik.errors.inventoryNumber}</div>
                        ) : null}
                    </div>

                    <div>
                        <label htmlFor="addressIp" className="block mt-2 text-sm font-semibold">
                            Direccion Ip
                        </label>
                        <input
                            type="text"
                            id="addressIp"
                            name="addressIp"
                            value={formik.values.addressIp}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200"
                        />
                        {formik.touched.addressIp && formik.errors.addressIp ? (
                            <div className="text-red-500">{formik.errors.addressIp}</div>
                        ) : null}
                    </div>

                    {tipoItem === 'dispositivos-red' && (
                        <div>
                            <label htmlFor="otherData" className="block mt-2 text-sm font-semibold">
                                Otros Datos
                            </label>
                            <input
                                type="text"
                                id="otherData"
                                name="otherData"
                                value={formik.values.otherData}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200"
                            />
                            {formik.touched.otherData && formik.errors.otherData ? (
                                <div className="text-red-500">{formik.errors.otherData}</div>
                            ) : null}
                        </div>
                    )}

                    {tipoItem === 'dispositivos-red' && (
                        <div>
                            <label htmlFor="status" className="block mt-2 text-sm font-semibold">
                                Estado
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200"
                            >
                                <option value="">- SELECT -</option>
                                <option value={1}>Activo</option>
                                <option value={0}>Inactivo</option>
                            </select>
                            {formik.touched.status && formik.errors.status ? (
                                <div className="text-red-500">{formik.errors.status}</div>
                            ) : null}
                        </div>
                    )}
                    
                  {/* container-footer */}
                  <div className="flex items-center justify-end w-full gap-2 p-2 text-sm font-semibold bg-gray-200 border-t-2 h-14 dark:bg-gray-600 border-t-gray-900 dark:border-t-white">
                    <button
                      className="w-20 h-10 text-blue-400 duration-200 border-2 border-gray-400 rounded-md hover:border-red-500 hover:text-red-600 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                      onClick={() => setStadopen(false)}
                    >
                      Cerrar
                    </button>
                    <button
                      className="w-24 h-10 text-white duration-200 border-2 rounded-md dark:hover:border-gray-900 bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600"
                      type="submit"
                    >
                      Actualizando
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </section>
        )}
      </>
    );
  };
  
  export default ModalItemsForm;
  