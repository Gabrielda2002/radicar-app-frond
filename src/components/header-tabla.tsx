const HeaderTabla = () =>{
    return(
        <section className="header-tabla pb-6 flex justify-between items-center">
          <div className="container-filter">
            <label className="font-bold text-lg text-stone-600">Buscar registro Radicacion :</label>
            <input placeholder=" Consultar registro..." className="block  w-[280px] h-10  border-2 rounded-md focus:outline-none focus:ring" ></input>  
          </div>
          <div className="flex items-center space-x-2 pt-1-">
            <select name="" id="" className="border-2 h-[40px] w-[90px] rounded-md">
                <option value="">PAGES</option>
                <option value="1">10 PAGES</option>
                <option value="2">20 PAGES</option>
                <option value="3">30 PAGES</option>
            </select>
            <button className="border-2  w-[90px] h-11 rounded-md bg-color text-white active:bg-emerald-900 ">Radicar</button>
          </div>
        </section>
    );  
}

export default HeaderTabla