import { useState } from "react";
import useInterval from "./useInterval";
import { years } from "../const";
import { FaPlay, FaStop } from 'react-icons/fa';

import style from "./ProgressBar.module.css";

const ProgressController = ({ year, onYearChanged }) => {
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
        onYearChanged(year + 1);
    };

    const decreaseYear = () => {
        const maxYear = Math.min(...years);
        if (year == maxYear) return;
        onYearChanged(year - 1);
    };

    const togglePlay = () => {
        if (isPlaying) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
        }
    }

    return <div className={style.play} onClick={togglePlay}>
        {isPlaying ? <FaStop /> : <FaPlay />}
    </div>;

}

export default ProgressController;