import { useAtom } from "jotai";
import { useState } from "react";
import { yearAtom } from "../state";
import useInterval from "./useInterval";
import { years } from "../const";
import { FaPlay, FaStop } from 'react-icons/fa';

import style from "./ProgressBar.module.css";



const ProgressController = () => {
    const [year, setYear] = useAtom(yearAtom);
    const [isPlaying, setIsPlaying] = useState(false);

    useInterval(() => {
        const maxYear = Math.max(...years);
        if (year == maxYear) {
            setIsPlaying(false);
        } else {
            increaseYear();
        }
    }, isPlaying ? 1000 : null)

    const increaseYear = () => {
        const maxYear = Math.max(...years);
        if (year == maxYear) return;
        setYear(year + 1);
    };

    const togglePlay = () => {
        if (isPlaying) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
        }
    }

    function nextYear() {
        const newYear = Math.min(+year + 1, 2022)
        setYear(newYear)
    }

    function previousYear() {
        const newYear = Math.max(+year - 1, 2015)
        setYear(newYear)
    }

    return (<>
    <div className={style.controllContainer}>
    <button className={style.button} onClick={previousYear}>&lt;</button>
        <div className={`${style.playButton} ${style.button}`} onClick={togglePlay}>{isPlaying ? <FaStop /> : <FaPlay />}</div>
        <button className={style.button} onClick={nextYear}>&gt;</button>
    </div>
        
        
    </>)
}

export default ProgressController;