import React,{useState} from "react";

function TexVisible(){

    const [ textVisible, settextVisible] =    useState(false)

    function handleToggle(){
        settextVisible(!textVisible)

        
    }

    return(
        <>
        <button onClick={handleToggle}>
            handleToggle
        </button>

        {textVisible && <p>react state is awesome </p>}
        </>
    )

}

export default TexVisible