import style from "./ProgressBar.module.css";
import { years } from "../const";
import ProgressController from "./ProgressController";

const ProgressBar = ({ year, onYearChanged }) => {
    return (
        <div className={style.bar}>
            <ProgressController year={year} onYearChanged={onYearChanged} />
            <input
                type="range"
                onChange={(e) => onYearChanged(+e.target.value)}
                min={Math.min(...years)}
                max={Math.max(...years)}
                step={1}
                value={year}
                className={style.scroller}
            />
            <p className={style.year}>{year}</p>
        </div>
    )
}

export default ProgressBar;