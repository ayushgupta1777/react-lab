import React,{useState} from "react";

function CharacterCount() {

    const [test, setText] = useState("")

    return (
        <>

            <input type="text" value={test}
                onChange={(e) => setText(e.target.value)} />


            <h1> Number{test.length}</h1>
            </>
            )


}

            export default CharacterCount