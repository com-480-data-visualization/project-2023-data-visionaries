import { useEffect, useState } from "react";
import style from "./ProgressBar.module.css";
import useInterval from "./useInterval";
import { useAtom } from "jotai";
import {  yearAtom } from "../state";
import { years } from "../const";

const ProgressBar = () => {
    const [year, setYear] = useAtom(yearAtom);

    function changeYear(e) {
        setYear(parseInt(e.target.value))
    }

    const progress = (years.indexOf(year) + 1) / years.length * 100;

    return (<>
        <div className={style.progressBarContainer}>
            <div className={style.progress} style={{ width: progress + "%" }}></div>

            {
                years.map(y => <button className={style.yearButton} key={y} value={y} onClick={changeYear}>{y}</button>)
            }
        </div>
    </>)
}

export default ProgressBar