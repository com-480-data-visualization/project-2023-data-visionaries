import React, { useState } from "react"
import style from "./DropdownSelect.module.css";

const DropdownSelect = () => {
    const [selected, setSelected] = useState("");
    const data = [
        ("Happiness", "happiness"),
        ("GDP", "gdp"),
        ("Social Support", "social_support"),
        ("Life Expectancy", "life_expectancy"),
        ("Freedom", "freedom"),
        ("Generosity", "generosity"),
        ("Corruption", "corruption"),
        ];

    return (
        <div className="dropdownSelect">
            <input list="data"/>
            <datalist id="data">
                {data.map((d, i) => <option key={i} value={d.country}></option>)}
            </datalist>
            <h1>{selected}</h1>
        </div>

    );
}

export default DropdownSelect;