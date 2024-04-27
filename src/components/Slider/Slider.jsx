import React, {useEffect, useState} from 'react';

const Slider = ({min, max, label, unit = ""}) => {
    const [value, setValue] = useState(min);
    const [range, setRange] = useState(calculateRange())

    useEffect(() => {
        setRange(calculateRange());
    }, [value]);

    // Обрахування довжини .highlight (берюзової полоски)
    function calculateRange() {
        return ((value - min) / (max - min)) * 100
    }

    // Встановлення value для слайдера
    const handleSlider = (event) => {
        setValue(event.target.value);
    }

    return (
        <div className="slider-container">
            <label htmlFor="slider">{label}</label>

            <div className="slider-container__captions">
                <span>{min + unit}</span>
                <span>{max + unit}</span>
            </div>
            <div className="slider-container__highlight" style={{"width": range + "%"}}></div>
            <div className="slider-container__value" style={{"left": range + "%"}}>
                <div className="slider-container__value__container">
                    <span>{value + unit}</span>
                </div>
            </div>

            <input
                id="slider"
                className="slider-container__slider"
                type="range"
                min={min}
                max={max}
                value={value}
                onInput={handleSlider}
            />
        </div>
    );
};


export default Slider;