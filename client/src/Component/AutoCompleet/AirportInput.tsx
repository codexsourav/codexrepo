
import { Airport, findAirportsName } from "@/data/airportsList";
import React, { useState } from "react";

function AirportInput({ setText, text, placeholder, label, className }: { className?: string, label: string, placeholder?: string, text: string, setText: (e: string) => void }) {
    const [suggest, setSuggest] = useState<Airport[]>([]);

    const findCitys = (latter: string) => {
        const data = findAirportsName(latter);
        setSuggest(data);
    }

    const setHint = (data: Airport) => {
        setText(`${data.name},${data.city}`);
        setSuggest([]);
    };

    const viewSuggest = () => {
        return <div className={` hintBox absolute top-0 mt-[77px] md:mt-[79px] z-50 bg-white border-2 border-orange-200 border-t-0 w-full overflow-y-auto max-h-56 `}>
            <ul className="flex flex-col">
                {
                    suggest.map((e, i) => {
                        return <li className="py-2 px-5 hover:bg-orange-100 cursor-pointer" key={"airport-" + i} onClick={() => setHint(e)} >{e.name},{e.city}</li>;
                    })
                }
            </ul>
        </div>
    };
    return (

        <div className={`relative ${className}`}>
            <label >{label}</label>
            <input className="tabinput" value={text} placeholder={placeholder} onChange={(e) => {
                setText(e.target.value);
                if (e.target.value.length == 0) {
                    setSuggest([]);
                } else {
                    findCitys(e.target.value);
                }
            }} />
            {suggest.length == 0 ? null : viewSuggest()}
        </div>

    )
}
export default React.memo(AirportInput);

