import React,{useState} from "react";

function Selector_output(){

    const [select, setSelect] = useState("")


    return(
        <>
        <select value={select} onChange={(e)=> setSelect(e.target.value)}>

            <option value="{Apple}">Apple</option>
            <option value="{seleBANANANct}">Bananan</option>
            <option value="{CHARRY}">Cherry</option>

        </select>

        <h1>Your faibrait frute is {select}</h1>

        </>
    )
}

export default Selector_output