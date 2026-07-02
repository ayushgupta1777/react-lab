import React, { useState } from "react";

function Add_list() {
    const [inputValue, setInputValue] = useState(""); // Stores input text
    const [items, setItems] = useState([]);          // Stores list of items

    const handleAdd = () => {
        if (inputValue.trim() === "") return;
        setItems([...items, inputValue]); // Adds item to array
        setInputValue("");                // Clears input
    };

    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <input 
                type="text" 
                placeholder="Enter item..." 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} // Fixed spelling of onChange
            />
            <button onClick={handleAdd}>Add Item</button>

            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default Add_list;