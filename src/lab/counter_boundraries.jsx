import React, { useState } from "react";

function CounterBoundaries(){

    const [counter, setCounter] = useState(0)

    return(
    <>
    <div>
        <button onClick={ () => setCounter( counter + 1)} disabled={counter >= 20}>+</button>
        <button onClick={ ()  => setCounter(counter - 1 )} disabled={counter <= 0}>-</button>

<h1>counter{counter}</h1>
    </div>
    </>
    )
}

export default CounterBoundaries