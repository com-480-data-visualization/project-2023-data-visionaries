import style from "./ProgressBar.module.css";
import { useAtom } from "jotai";
import { yearAtom } from "../state";
import { years } from "../const";

const ProgressBar = () => {
    const [year, setYear] = useAtom(yearAtom);

    return (
        <div className={style.bar}>
            <p>{Math.min(...years)}</p>
            <input
                type="range"
                onChange={(e) => setYear(+e.target.value)}
                min={Math.min(...years)}
                max={Math.max(...years)}
                step={1}
                value={year}
                className={style.range}
            />
            <p>{Math.max(...years)}</p>
        </div>
    )
}

export default ProgressBar