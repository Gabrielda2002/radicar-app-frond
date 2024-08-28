import { useState } from "react";

interface ModalReport {
    Numcups: string;
    reportOptions: []
}

export const useModalReport = () => {
    //Estado para manejar el formulario
    const [formValues, setFormValues] = useState<ModalReport>({
        Numcups: "",
        reportOptions: []
    });

    //Array de opciones modal
    const opcionesReportes = [
        "Autorizacion",
        "Radicacion"
    ]

    //Funcion para manejar los cambios en los Inputs y Selects
    const handleChange = (
        e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    //Funcion para manejar el envio del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Usuario registrado:", formValues)
        //Aqui se puede agregar logica para los datos al backend
    };

    return {
        formValues,
        opcionesReportes,
        handleChange,
        handleSubmit,
    };
}