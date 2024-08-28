import { useState } from "react";

const ModalCups = () => {
  const [stadopen, setStadopen] = useState(false);
    return( 
        <>
        <button
          className="borde-2 w-[90px] h-12 rounded-md focus:outline-none bg-color text-white hover:bg-emerald-900  active:bg-emerald-800 "
          onClick={() => setStadopen(true)}
        >
          buton prueba
        </button>
    
        {stadopen && (
          <section className="fixed -inset-2  bg-black bg-opacity-30 backdrop-blur-sm flex justify-center pt-16 ">
            <div className="bg-slate-50 w-[600px] h-[200px] rounded-lg">
                <form action="" className="p-5 font-mono">
                <label htmlFor="">
                    Nombre :
                    <input type="text" name="" id="" placeholder="Nombre.." />
                </label>
        
                <label htmlFor="">
                    Tipo :
                    <input type="text" placeholder="tipo..." />
                </label>
        
                <button className="" onClick={() => setStadopen(false)}>
                    cancelar
                </button>
                </form>
                </div>
          </section>
        )}
      </>

    );
 
};

export default ModalCups;
