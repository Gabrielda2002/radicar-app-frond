const TrTdTabla = (props: any) =>{
    return(
        <tr className="border-solid border-y-2 border-y-slate-950 ">
            <td className="p-2">
                {props.children}
            </td>
        </tr>     
    );
}

export default TrTdTabla;