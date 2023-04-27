import { useRef, useEffect, useState } from "react";
import style from "./Leaderboard.module.css";
import { useTransition, animated } from "react-spring";

import * as d3 from "d3";
import { useAtom } from "jotai";
import { yearAtom } from "../state";

const Leaderboard = (props) => {
    const { width, height } = props;
    const [year, setYear] = useAtom(yearAtom);
    const ref = useRef();
    const [countries, setCountries] = useState([]);
    const [data, setData] = useState(null);

    const div_height = height / 10;

    const transitions = useTransition(
        countries.map((item, i) => ({ item: item, index: i + 1, y: i * div_height })),
        {
            config: { duration: 300 },
            from: { position: "absolute", opacity: 0, y: height },
            leave: { opacity: 0 },
            enter: ({ y }) => ({ y, opacity: 1 }),
            update: ({ y }) => ({ y }),
            key: (item) => item.item
        }
    );

    const preprocessData = (csv) => {
        const ret = {};
        for (let score of csv) {
            if (!ret[score.year]) ret[score.year] = {};
            ret[score.year][score.country] = { score: +score.happiness_score };
        }
        return ret;
    };

    useEffect(() => {
        d3.csv("/data_scores.csv")
            .then((csv) => preprocessData(csv))
            .then((json) => setData(json))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (data == null) return
        if (data[year] === undefined) return
        const newCountries = Object.keys(data[year]).sort((a, b) => data[year][b] - data[year][a])
        setCountries(newCountries.slice(0, 10))
    }, [year, data]);



    const scoreToWidth = d3.scaleLinear().domain([7.1, 7.8]).nice().range([width / 3, width - 80])

    const color = d3.scaleSequential().domain([7, 7.9]).nice().interpolator(d3.interpolateInferno);
    const pos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    return (
        <div className={style.container} style={{ width: width + "px", height: height + "px" }}>
            <div className={style.pos}>
                {pos.map(pos => <p key={pos} className={style.leaderboardPosition} style={{ position: "absolute", top: `${pos * div_height}px`}}>{pos + 1}.</p>)}
            </div>
            <div className={style.leaderboard}>
                {data && transitions(({ y, ...rest }, item, { key }) => (
                    <animated.div
                        key={key}
                        className={style.countryContainer}
                        style={{
                            transform: y.to((y) => `translate3d(0,${y}px,0)`),
                            ...rest
                        }}
                    >
                        <div className={style.leaderboardItem} style={{
                            width: scoreToWidth(data[year][item.item].score),
                            backgroundColor: color(data[year][item.item].score)
                        }}>
                            <p className={style.countryName}>{item.item}</p>
                        </div>
                        <p className={style.leaderboardScore}>{data[year][item.item].score.toFixed(2)}</p>
                    </animated.div>
                ))}
            </div >
        </div>
    );
}

export default Leaderboard;